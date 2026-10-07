import { formatNumber } from '../../../../domain/use-cases/utils';
import type { GeneratePdf, TNFeInfNFeDet } from '../../../../types';
import { moeda } from './bloco-totais';
import { DEFAULT_NFE } from './default';
import { colunasItem } from './grade-colunas';
import { normal } from './normal';

const LINE_GAP = -1.5;
const PADDING_CELULA = 1.5;
const LARGURA_SEPARADOR = 4;
const TAMANHO_MINIMO = 3.5;

type CtxItem = Pick<GeneratePdf.InputCriaMargem, 'doc' | 'ajusteX' | 'ajusteY' | 'margemEsquerda' | 'margemTopo' | 'larguraDoFormulario'>;

type VisaoIcms = {
  orig?: string;
  CST?: string;
  CSOSN?: string;
  vBC?: string | number;
  pICMS?: string | number;
  vICMS?: string | number;
};

type GrupoReducao = {
  pAliqEfet?: string;
};

type GrupoIbsUf = {
  pIBSUF?: string;
  gRed?: GrupoReducao;
  vIBSUF?: string;
};

type GrupoIbsMun = {
  pIBSMun?: string;
  gRed?: GrupoReducao;
  vIBSMun?: string;
};

type GrupoCbs = {
  pCBS?: string;
  gRed?: GrupoReducao;
  vCBS?: string;
};

type GrupoIbsCbs = {
  vBC?: string;
  gIBSUF?: GrupoIbsUf;
  GIBSUF?: GrupoIbsUf;
  gIBSMun?: GrupoIbsMun;
  GIBSMun?: GrupoIbsMun;
  gCBS?: GrupoCbs;
  GCBS?: GrupoCbs;
};

function lerIcms(item: TNFeInfNFeDet): VisaoIcms {
  const icms = item.imposto.ICMS;
  if (!icms) return {};
  const grupos: Array<VisaoIcms | undefined> = [
    icms.ICMS00,
    icms.ICMS10,
    icms.ICMS20,
    icms.ICMS30,
    icms.ICMS40,
    icms.ICMS41,
    icms.ICMS51,
    icms.ICMS60,
    icms.ICMS70,
    icms.ICMS90,
    icms.ICMSPart,
    icms.ICMSSN101,
    icms.ICMSSN102,
    icms.ICMSSN201,
    icms.ICMSSN202,
    icms.ICMSSN500,
    icms.ICMSSN900,
    icms.ICMSST
  ];
  return grupos.find((grupo) => grupo !== undefined) ?? {};
}

function grupoIbsCbs(item: TNFeInfNFeDet): GrupoIbsCbs | undefined {
  const ibs = item.imposto.IBSCBS;
  if (!ibs) return undefined;
  return ibs.gIBSCBS ?? ibs.GIBSCBS;
}

function textoDescricao(item: TNFeInfNFeDet): string {
  const cClassTrib = item.imposto.IBSCBS?.cClassTrib;
  const linhas = [`${item.prod.cProd} - ${item.prod.xProd}`];
  if (item.infAdProd) linhas.push(item.infAdProd);
  linhas.push(cClassTrib ? `[NCM ${item.prod.NCM}] [cClassTrib ${cClassTrib}]` : `[NCM ${item.prod.NCM}]`);
  return linhas.join('\n');
}

function percentual(valor: string | number | undefined): string {
  return `${moeda(valor)}%`;
}

function aliquotaEfetiva(vigente: string | number | undefined, gRed: GrupoReducao | undefined): string {
  if (gRed?.pAliqEfet !== undefined && gRed.pAliqEfet !== '') return percentual(gRed.pAliqEfet);
  return percentual(vigente);
}

function alturaLinha(doc: PDFKit.PDFDocument): number {
  doc.font('normal').fontSize(DEFAULT_NFE.tamanhoDaFonteDosItens);
  return doc.heightOfString('Ag', { width: 80, lineGap: LINE_GAP });
}

function tamanhoQueCabe(doc: PDFKit.PDFDocument, texto: string, largura: number): number {
  let tamanho = DEFAULT_NFE.tamanhoDaFonteDosItens;
  doc.font('normal').fontSize(tamanho);
  while (texto && tamanho > TAMANHO_MINIMO && doc.widthOfString(texto) > largura) {
    tamanho -= 0.25;
    doc.fontSize(tamanho);
  }
  return tamanho;
}

function desenharTrecho(
  ctx: CtxItem,
  value: string,
  x: number,
  y: number,
  largura: number,
  alinhamento: 'left' | 'center' | 'right',
  tamanho: number
): void {
  ctx.doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(tamanho)
    .text(value, ctx.margemEsquerda + ctx.ajusteX + x, ctx.margemTopo + ctx.ajusteY + y, {
      width: Math.max(largura, 0.1),
      align: alinhamento,
      lineGap: LINE_GAP,
      lineBreak: false
    });
}

function desenharUmaLinha(
  ctx: CtxItem,
  value: string,
  x: number,
  y: number,
  largura: number,
  alinhamento: 'left' | 'center' | 'right'
): void {
  desenharTrecho(ctx, value, x, y, largura, alinhamento, tamanhoQueCabe(ctx.doc, value, largura));
}

function desenharRotuloValor(ctx: CtxItem, y: number, x: number, largura: number, rotulo: string, valor: string): void {
  let tamanho = tamanhoQueCabe(ctx.doc, `${rotulo}..${valor}`, largura);
  ctx.doc.font('normal').fontSize(tamanho);
  let larguraRotulo = ctx.doc.widthOfString(rotulo);
  let larguraValor = ctx.doc.widthOfString(valor);
  let larguraPonto = ctx.doc.widthOfString('.') || 1;
  let vao = largura - larguraRotulo - larguraValor;

  while (vao < 0 && tamanho > 2) {
    tamanho -= 0.25;
    ctx.doc.fontSize(tamanho);
    larguraRotulo = ctx.doc.widthOfString(rotulo);
    larguraValor = ctx.doc.widthOfString(valor);
    larguraPonto = ctx.doc.widthOfString('.') || 1;
    vao = largura - larguraRotulo - larguraValor;
  }

  let pontos = Math.max(Math.floor(vao / larguraPonto), 0);
  while (pontos > 0 && ctx.doc.widthOfString('.'.repeat(pontos)) > vao + 0.01) pontos -= 1;

  desenharTrecho(ctx, rotulo, x, y, larguraRotulo, 'left', tamanho);
  if (pontos > 0) {
    const textoPontos = '.'.repeat(pontos);
    desenharTrecho(ctx, textoPontos, x + larguraRotulo, y, ctx.doc.widthOfString(textoPontos), 'left', tamanho);
  }
  const xValor = vao >= 0 ? x + largura - larguraValor : x + larguraRotulo;
  desenharTrecho(ctx, valor, xValor, y, larguraValor, 'right', tamanho);
}

function desenharPar(ctx: CtxItem, y: number, x: number, largura: number, esquerda: [string, string], direita: [string, string]): void {
  const metade = (largura - LARGURA_SEPARADOR) / 2;
  desenharRotuloValor(ctx, y, x, metade, esquerda[0], esquerda[1]);
  desenharUmaLinha(ctx, '/', x + metade, y, LARGURA_SEPARADOR, 'center');
  desenharRotuloValor(ctx, y, x + metade + LARGURA_SEPARADOR, metade, direita[0], direita[1]);
}

function areaCelula(coluna: { x: number; largura: number }): { x: number; largura: number } {
  return {
    x: coluna.x + PADDING_CELULA,
    largura: Math.max(coluna.largura - PADDING_CELULA * 2, 4)
  };
}

export function medirItem(doc: PDFKit.PDFDocument, item: TNFeInfNFeDet, larguraFormulario: number): number {
  const { colunas } = colunasItem(larguraFormulario);
  const linha = alturaLinha(doc);
  const alturaDescricao = doc.heightOfString(textoDescricao(item), { width: colunas.descricao.largura, lineGap: LINE_GAP });
  return Math.max(alturaDescricao, linha * 4) - LINE_GAP;
}

export function desenharItem(ctx: CtxItem, item: TNFeInfNFeDet, y: number): number {
  const { colunas } = colunasItem(ctx.larguraDoFormulario);
  const linha = alturaLinha(ctx.doc);
  const icms = lerIcms(item);
  const ibs = grupoIbsCbs(item);
  const ibsUf = ibs?.gIBSUF ?? ibs?.GIBSUF;
  const ibsMun = ibs?.gIBSMun ?? ibs?.GIBSMun;
  const cbs = ibs?.gCBS ?? ibs?.GCBS;
  const impostoSeletivo = item.imposto.IS;
  const ipi = item.imposto.IPI?.IPITrib;
  const codigoCst = icms.CST ?? icms.CSOSN ?? '';
  const origem = icms.orig ?? '';
  const altura = medirItem(ctx.doc, item, ctx.larguraDoFormulario);

  normal({
    doc: ctx.doc,
    value: textoDescricao(item),
    x: colunas.descricao.x,
    y,
    largura: colunas.descricao.largura,
    alinhamento: 'left',
    tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
    ajusteX: ctx.ajusteX,
    ajusteY: ctx.ajusteY,
    margemEsquerda: ctx.margemEsquerda,
    margemTopo: ctx.margemTopo
  });
  desenharRotuloValor(ctx, y, colunas.cstCfop.x, colunas.cstCfop.largura, 'CST', `${origem}${codigoCst ? `/${codigoCst}` : ''}`);
  desenharRotuloValor(ctx, y + linha, colunas.cstCfop.x, colunas.cstCfop.largura, 'CFOP', item.prod.CFOP);
  normal({
    doc: ctx.doc,
    value: `${formatNumber(item.prod.qCom, 4)}\n[${item.prod.uCom}]`,
    x: colunas.qtdUn.x,
    y,
    largura: colunas.qtdUn.largura,
    alinhamento: 'center',
    tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
    ajusteX: ctx.ajusteX,
    ajusteY: ctx.ajusteY,
    margemEsquerda: ctx.margemEsquerda,
    margemTopo: ctx.margemTopo
  });
  desenharUmaLinha(ctx, formatNumber(item.prod.vUnCom, 2), colunas.vlrUnit.x, y, colunas.vlrUnit.largura, 'right');
  desenharUmaLinha(ctx, formatNumber(item.prod.vProd, 2), colunas.vlrTotal.x, y, colunas.vlrTotal.largura, 'right');

  const bases: Array<[string, string]> = [
    ['ICMS', moeda(icms.vBC)],
    ['IBS / CBS', moeda(ibs?.vBC)],
    ['IS', moeda(impostoSeletivo?.vBCIS)],
    ['IPI', moeda(ipi?.vBC)]
  ];
  const areaBases = areaCelula(colunas.bases);
  bases.forEach(([rotulo, valor], indice) => {
    desenharRotuloValor(ctx, y + linha * indice, areaBases.x, areaBases.largura, rotulo, valor);
  });

  const aliquotas: Array<[[string, string], [string, string]]> = [
    [
      ['ICMS', aliquotaEfetiva(icms.pICMS, undefined)],
      ['CBS', aliquotaEfetiva(cbs?.pCBS, cbs?.gRed)]
    ],
    [
      ['IBS UF', aliquotaEfetiva(ibsUf?.pIBSUF, ibsUf?.gRed)],
      ['IPI', percentual(ipi?.pIPI)]
    ],
    [
      ['IBS MUN', aliquotaEfetiva(ibsMun?.pIBSMun, ibsMun?.gRed)],
      ['IS', percentual(impostoSeletivo?.pIS)]
    ]
  ];
  const areaAliquotas = areaCelula(colunas.aliquotas);
  aliquotas.forEach(([esquerda, direita], indice) => {
    desenharPar(ctx, y + linha * indice, areaAliquotas.x, areaAliquotas.largura, esquerda, direita);
  });

  const tributos: Array<[[string, string], [string, string]]> = [
    [
      ['ICMS', moeda(icms.vICMS)],
      ['CBS', moeda(cbs?.vCBS)]
    ],
    [
      ['IBS UF', moeda(ibsUf?.vIBSUF)],
      ['IPI', moeda(ipi?.vIPI)]
    ],
    [
      ['IBS MUN', moeda(ibsMun?.vIBSMun)],
      ['IS', moeda(impostoSeletivo?.vIS)]
    ]
  ];
  const areaTributos = areaCelula(colunas.tributos);
  tributos.forEach(([esquerda, direita], indice) => {
    desenharPar(ctx, y + linha * indice, areaTributos.x, areaTributos.largura, esquerda, direita);
  });

  return y + altura;
}
