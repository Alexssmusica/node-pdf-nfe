import { celulasComPeso } from './celulas-layout';
import type { NomeColunaItem } from './grade-colunas';

export type OrientacaoDanfe = 'RETRATO' | 'PAISAGEM';

export type FracoesColunaItem = Record<NomeColunaItem, number>;

export type GeometriaDanfe = {
  orientacao: OrientacaoDanfe;
  larguraDaPagina: number;
  alturaDaPagina: number;
  margemEsquerda: number;
  margemTopo: number;
  larguraDoCanhoto: number;
  larguraDoFormulario: number;
  margemDireitaConteudo: number;
  fundoDaPagina: number;
  finalTamanhoDet1: number;
  finalTamanhoDetDemais: number;
  reservaDadosAdicionais: number;
  ajusteYDaHomologacao: number;
  offsetHomologacaoPrimeiraPagina: number;
  offsetHomologacaoDemaisPaginas: number;
  offsetNotaCanceladaPrimeiraPagina: number;
  offsetNotaCanceladaDemaisPaginas: number;
  alturaCabecalhoItens: number;
  alturaLinhaTotalProdutos: number;
  alturaLinhaTotalIcmsIpi: number;
  alturaLinhaTotalIbsCbsIs: number;
  alturaLinhaIssqn: number;
  alturaLinhaDestinatario: number;
  alturaLinhaTransporte: number;
  alturaBlocoEmitente: number;
  tamanhoDaFonteDoCampo: number;
  tamanhoTituloColunaItem: number;
  fracoesColunaItem: FracoesColunaItem;
  folhaIndicadorX: number;
  folhaIndicadorYPrimeiraPagina: number;
  folhaIndicadorYDemaisPaginas: number;
  folhaIndicadorLargura: number;
  folhaIndicadorTamanho: number;
  desenharCanhotoLateral: boolean;
  alturaCanhotoTopo: number;
  marcaDaguaAposConteudo: boolean;
  tamanhoDaFonteDaDescricaoItem: number;
  tamanhoDaFonteQtdValoresItem: number;
  espacoCanhotoLateral: number;
  tamanhoDaFonteDoTitulo: number;
  topoFormulario: number;
};

const MARGEM_ESQUERDA = 3;
const MARGEM_TOPO = 2.8;
const MARGEM_DIREITA_RETRATO = 589.65;

const FRACOES_RETRATO: FracoesColunaItem = {
  descricao: 0.22,
  cstCfop: 0.068,
  qtdUn: 0.082,
  vlrUnit: 0.078,
  vlrTotal: 0.078,
  bases: 0.13,
  aliquotas: 0.145,
  tributos: 0.199
};

const FRACOES_PAISAGEM: FracoesColunaItem = {
  descricao: 0.33,
  cstCfop: 0.052,
  qtdUn: 0.064,
  vlrUnit: 0.075,
  vlrTotal: 0.076,
  bases: 0.116,
  aliquotas: 0.131,
  tributos: 0.155
};

const LARGURA_CANHOTO_PAISAGEM = 51.1;
const ESPACO_CANHOTO_LATERAL_PAISAGEM = 10;
const MARGEM_DIREITA_PAGINA_PAISAGEM = 3;

function larguraFormularioRetrato(): number {
  return MARGEM_DIREITA_RETRATO - MARGEM_ESQUERDA;
}

function larguraFormularioPaisagem(): number {
  return 841.68 - MARGEM_ESQUERDA - LARGURA_CANHOTO_PAISAGEM - ESPACO_CANHOTO_LATERAL_PAISAGEM - MARGEM_DIREITA_PAGINA_PAISAGEM;
}

export function getGeometria(orientacao: OrientacaoDanfe = 'RETRATO'): GeometriaDanfe {
  if (orientacao === 'PAISAGEM') {
    const larguraDoFormulario = larguraFormularioPaisagem();
    const colDanfe = celulasComPeso(larguraDoFormulario, [241, 99, 247])[1];
    return {
      orientacao: 'PAISAGEM',
      larguraDaPagina: 841.68,
      alturaDaPagina: 595.44,
      margemEsquerda: MARGEM_ESQUERDA,
      margemTopo: MARGEM_TOPO,
      larguraDoCanhoto: LARGURA_CANHOTO_PAISAGEM,
      larguraDoFormulario,
      margemDireitaConteudo: MARGEM_ESQUERDA + larguraDoFormulario,
      fundoDaPagina: 575,
      finalTamanhoDet1: 500,
      finalTamanhoDetDemais: 575,
      reservaDadosAdicionais: 75,
      ajusteYDaHomologacao: 70,
      offsetHomologacaoPrimeiraPagina: 395,
      offsetHomologacaoDemaisPaginas: 360,
      offsetNotaCanceladaPrimeiraPagina: 395,
      offsetNotaCanceladaDemaisPaginas: 360,
      alturaCabecalhoItens: 12,
      alturaLinhaTotalProdutos: 15,
      alturaLinhaTotalIcmsIpi: 18,
      alturaLinhaTotalIbsCbsIs: 16,
      alturaLinhaIssqn: 15,
      alturaLinhaDestinatario: 16,
      alturaLinhaTransporte: 16,
      alturaBlocoEmitente: 108,
      tamanhoDaFonteDoCampo: 7,
      tamanhoTituloColunaItem: 5.25,
      fracoesColunaItem: FRACOES_PAISAGEM,
      folhaIndicadorX: colDanfe.x + 0.5,
      folhaIndicadorYPrimeiraPagina: 80,
      folhaIndicadorYDemaisPaginas: 80,
      folhaIndicadorLargura: colDanfe.largura - 1,
      folhaIndicadorTamanho: 6.5,
      desenharCanhotoLateral: true,
      alturaCanhotoTopo: 0,
      marcaDaguaAposConteudo: true,
      tamanhoDaFonteDaDescricaoItem: 6.5,
      tamanhoDaFonteQtdValoresItem: 8,
      espacoCanhotoLateral: ESPACO_CANHOTO_LATERAL_PAISAGEM,
      tamanhoDaFonteDoTitulo: 5,
      topoFormulario: 15.25 * (108 / 130.45)
    };
  }

  const larguraDoFormulario = larguraFormularioRetrato();
  return {
    orientacao: 'RETRATO',
    larguraDaPagina: 595.44,
    alturaDaPagina: 841.68,
    margemEsquerda: MARGEM_ESQUERDA,
    margemTopo: MARGEM_TOPO,
    larguraDoCanhoto: 0,
    larguraDoFormulario,
    margemDireitaConteudo: MARGEM_DIREITA_RETRATO,
    fundoDaPagina: 821.8,
    finalTamanhoDet1: 746,
    finalTamanhoDetDemais: 822,
    reservaDadosAdicionais: 70,
    ajusteYDaHomologacao: 275,
    offsetHomologacaoPrimeiraPagina: 310,
    offsetHomologacaoDemaisPaginas: 145,
    offsetNotaCanceladaPrimeiraPagina: 310,
    offsetNotaCanceladaDemaisPaginas: 145,
    alturaCabecalhoItens: 16,
    alturaLinhaTotalProdutos: 20,
    alturaLinhaTotalIcmsIpi: 24,
    alturaLinhaTotalIbsCbsIs: 22,
    alturaLinhaIssqn: 20,
    alturaLinhaDestinatario: 20,
    alturaLinhaTransporte: 20,
    alturaBlocoEmitente: 130.45,
    tamanhoDaFonteDoCampo: 9.5,
    tamanhoTituloColunaItem: 5.5,
    fracoesColunaItem: FRACOES_RETRATO,
    folhaIndicadorX: 241.2,
    folhaIndicadorYPrimeiraPagina: 141.2,
    folhaIndicadorYDemaisPaginas: 97.4,
    folhaIndicadorLargura: 98.5,
    folhaIndicadorTamanho: 8,
    desenharCanhotoLateral: false,
    alturaCanhotoTopo: 55.32,
    marcaDaguaAposConteudo: false,
    tamanhoDaFonteDaDescricaoItem: 5.5,
    tamanhoDaFonteQtdValoresItem: 5.5,
    espacoCanhotoLateral: 0,
    tamanhoDaFonteDoTitulo: 6,
    topoFormulario: 0
  };
}

export function normalizarOrientacaoDanfe(valor: string | undefined | null): OrientacaoDanfe {
  if (typeof valor !== 'string' || valor.trim() === '') return 'RETRATO';
  const normalizado = valor.trim().toUpperCase();
  if (normalizado === 'PAISAGEM' || normalizado === 'LANDSCAPE') return 'PAISAGEM';
  return 'RETRATO';
}

export function optionsDocFromGeometria(geometria: GeometriaDanfe): {
  bufferPages: boolean;
  margin: number;
  size: [number, number];
  layout: 'portrait' | 'landscape';
} {
  if (geometria.orientacao === 'PAISAGEM') {
    return {
      bufferPages: true,
      margin: 0,
      size: [geometria.alturaDaPagina, geometria.larguraDaPagina],
      layout: 'landscape'
    };
  }
  return {
    bufferPages: true,
    margin: 0,
    size: [geometria.larguraDaPagina, geometria.alturaDaPagina],
    layout: 'portrait'
  };
}
