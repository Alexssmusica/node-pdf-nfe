import { formatDateTime, formatNumber } from '../../../shared/formatacao';
import type { GeneratePdf } from './tipos-layout';
import { DEFAULT_NFE } from './default';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';

const LARGURA_COLUNA_RECEBIMENTO = 28.3;
const LARGURA_SUBCOLUNA_ASSINATURA = 22.8;
const ALTURA_CAIXA_NFE = 110.5;
const ALTURA_DATA = 99.2;

function textoVerticalCanhoto(
  doc: GeneratePdf.InputRecibo['doc'],
  texto: string,
  xFaixa: number,
  larguraSubfaixa: number,
  offsetXSubfaixa: number,
  yInicio: number,
  yFim: number,
  margemEsquerda: number,
  margemTopo: number,
  ajusteX: number,
  ajusteY: number,
  fontSize: number,
  alinhamento: 'left' | 'center' | 'justify' = 'center',
  ancoragem: 'centro' | 'inicio' = 'centro',
  lineGap = 0
): void {
  const alturaRegiao = yFim - yInicio;
  if (alturaRegiao <= 2) return;
  const larguraUtil = Math.max(larguraSubfaixa - 4, 4);
  let tamanho = fontSize;
  doc.font('normal').fontSize(tamanho);
  let alturaTexto = doc.heightOfString(texto, { width: alturaRegiao, lineGap });
  while (alturaTexto > larguraUtil && tamanho > 4) {
    tamanho -= 0.25;
    doc.fontSize(tamanho);
    alturaTexto = doc.heightOfString(texto, { width: alturaRegiao, lineGap });
  }
  const padding = 2;
  const deslocamento = ancoragem === 'inicio' ? larguraSubfaixa / 2 - padding - alturaTexto / 2 : 0;
  const centroX = margemEsquerda + ajusteX + xFaixa + offsetXSubfaixa + larguraSubfaixa / 2;
  const centroY = margemTopo + ajusteY + yInicio + alturaRegiao / 2;
  doc.save();
  doc.rotate(-90, { origin: [centroX, centroY] });
  doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(tamanho)
    .text(texto, centroX - alturaRegiao / 2, centroY - alturaTexto / 2 - deslocamento, {
      width: alturaRegiao,
      height: larguraUtil,
      align: alinhamento,
      lineGap,
      ellipsis: true
    });
  doc.restore();
}

function desenharCanhotoLateralPaisagem(
  input: Pick<GeneratePdf.InputRecibo, 'doc' | 'ajusteX' | 'ajusteY' | 'margemEsquerda' | 'margemTopo' | 'geometria'>,
  yBase: number,
  dados: Pick<GeneratePdf.InputRecibo, 'dest' | 'emit' | 'total' | 'ide'>
): void {
  const espaco = input.geometria.espacoCanhotoLateral;
  const xFaixa = input.geometria.larguraDoFormulario + espaco;
  const larguraFaixa = input.geometria.larguraDoCanhoto;
  const larguraConteudo = LARGURA_COLUNA_RECEBIMENTO;
  const xDivAssinatura = xFaixa + larguraConteudo;
  const xCorte = input.geometria.larguraDoFormulario + espaco / 2;
  const xFimCanhoto = xFaixa + larguraFaixa - input.geometria.larguraDoFormulario;
  const yTopo = input.geometria.topoFormulario;
  const yCaixaNfe = yBase - ALTURA_CAIXA_NFE;
  const yDivData = yCaixaNfe - ALTURA_DATA;
  const margemDireita = input.geometria.margemDireitaConteudo;

  linhaVertical({
    y1: yTopo,
    y2: yBase,
    x: xCorte,
    doc: input.doc,
    ajusteX: input.ajusteX,
    ajusteY: input.ajusteY,
    margemEsquerda: input.margemEsquerda,
    margemTopo: input.margemTopo,
    tracejada: true
  });
  linhaHorizontal({
    x1: xFaixa,
    x2: xFimCanhoto,
    y: yTopo,
    doc: input.doc,
    ajusteX: input.ajusteX,
    ajusteY: input.ajusteY,
    margemDireita,
    margemEsquerda: input.margemEsquerda,
    margemTopo: input.margemTopo
  });
  linhaVertical({
    y1: yTopo,
    y2: yBase,
    x: xFaixa,
    doc: input.doc,
    ajusteX: input.ajusteX,
    ajusteY: input.ajusteY,
    margemEsquerda: input.margemEsquerda,
    margemTopo: input.margemTopo
  });
  linhaVertical({
    y1: yTopo,
    y2: yBase,
    x: xFaixa + larguraFaixa,
    doc: input.doc,
    ajusteX: input.ajusteX,
    ajusteY: input.ajusteY,
    margemEsquerda: input.margemEsquerda,
    margemTopo: input.margemTopo
  });
  linhaVertical({
    y1: yTopo,
    y2: yCaixaNfe,
    x: xDivAssinatura,
    doc: input.doc,
    ajusteX: input.ajusteX,
    ajusteY: input.ajusteY,
    margemEsquerda: input.margemEsquerda,
    margemTopo: input.margemTopo
  });
  linhaHorizontal({
    x1: xFaixa,
    x2: xFimCanhoto,
    y: yBase,
    doc: input.doc,
    ajusteX: input.ajusteX,
    ajusteY: input.ajusteY,
    margemDireita,
    margemEsquerda: input.margemEsquerda,
    margemTopo: input.margemTopo
  });
  linhaHorizontal({
    x1: xFaixa,
    x2: xFimCanhoto,
    y: yCaixaNfe,
    doc: input.doc,
    ajusteX: input.ajusteX,
    ajusteY: input.ajusteY,
    margemDireita,
    margemEsquerda: input.margemEsquerda,
    margemTopo: input.margemTopo
  });

  const { dest, emit, total, ide } = dados;

  linhaHorizontal({
    x1: xDivAssinatura,
    x2: xFimCanhoto,
    y: yDivData,
    doc: input.doc,
    ajusteX: input.ajusteX,
    ajusteY: input.ajusteY,
    margemDireita,
    margemEsquerda: input.margemEsquerda,
    margemTopo: input.margemTopo
  });

  const textoRecebimento = [
    'Recebemos de',
    emit.xNome,
    'os produtos e/ou serviços constantes da nota fiscal eletrônica indicada ao lado.',
    'Emissão:',
    formatDateTime(ide.dhEmi),
    '- Valor Total:',
    formatNumber(total.ICMSTot.vNF, 2),
    '- Destinatário:',
    dest.xNome,
    '- Endereço:',
    dest.enderDest?.xLgr
  ]
    .join(' ')
    .toUpperCase();

  textoVerticalCanhoto(
    input.doc,
    textoRecebimento,
    xFaixa,
    larguraConteudo,
    0,
    yTopo + 3,
    yCaixaNfe - 3,
    input.margemEsquerda,
    input.margemTopo,
    input.ajusteX,
    input.ajusteY,
    6.9,
    'justify',
    'centro',
    -1.5
  );
  textoVerticalCanhoto(
    input.doc,
    'DATA DE RECEBIMENTO',
    xFaixa,
    LARGURA_SUBCOLUNA_ASSINATURA,
    larguraConteudo,
    yDivData + 2,
    yCaixaNfe - 2,
    input.margemEsquerda,
    input.margemTopo,
    input.ajusteX,
    input.ajusteY,
    6,
    'left',
    'inicio'
  );
  textoVerticalCanhoto(
    input.doc,
    'IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR',
    xFaixa,
    LARGURA_SUBCOLUNA_ASSINATURA,
    larguraConteudo,
    yTopo + 2,
    yDivData - 2,
    input.margemEsquerda,
    input.margemTopo,
    input.ajusteX,
    input.ajusteY,
    6,
    'left',
    'inicio'
  );

  const numeroFormatado = ide.nNF.padStart(9, '0').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
  const faixasNfe: Array<{ texto: string; offset: number; largura: number; fonte: number }> = [
    { texto: 'NF-e', offset: 0, largura: 20, fonte: 14 },
    { texto: 'Nº. ' + numeroFormatado, offset: 20, largura: 15.5, fonte: 10 },
    { texto: 'Série ' + ide.serie, offset: 35.5, largura: 15.6, fonte: 10 }
  ];
  faixasNfe.forEach((faixa) => {
    textoVerticalCanhoto(
      input.doc,
      faixa.texto,
      xFaixa,
      faixa.largura,
      faixa.offset,
      yCaixaNfe + 4,
      yBase - 4,
      input.margemEsquerda,
      input.margemTopo,
      input.ajusteX,
      input.ajusteY,
      faixa.fonte,
      'center'
    );
  });
}

export function getReciboPaisagem({
  doc,
  ajusteX,
  ajusteY,
  margemEsquerda,
  margemTopo,
  geometria,
  dest,
  emit,
  total,
  ide
}: GeneratePdf.InputRecibo): number {
  desenharCanhotoLateralPaisagem({ doc, ajusteX, ajusteY, margemEsquerda, margemTopo, geometria }, geometria.fundoDaPagina, {
    dest,
    emit,
    total,
    ide
  });
  return 0;
}
