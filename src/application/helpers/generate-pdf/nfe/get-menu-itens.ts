import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';
import { titulo } from './titulo';

export function getMenuItens({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemEsquerda,
  margemTopo,
  margemDireita,
  finalEspacoDet,
  larguraDoFormulario
}: GeneratePdf.InputMenuItens): number {
  linhaHorizontal({ x1: -0.5, x2: 0.5, y: y + 17, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: -0.5, x2: 0.5, y: y + 32, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: -0.5, x2: 0.5, y: finalEspacoDet, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });

  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 53, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 236.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 267, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 293.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 315, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 333, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 373, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 407.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 441.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 475, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 508, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 533.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: 557, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 17, y2: finalEspacoDet, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

  secao({ doc, value: 'DADOS DOS PRODUTOS / SERVIÇOS', x: 1.5, y: y + 8, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });

  titulo({
    value: 'CÓDIGO',
    x: 1.5,
    y: y + 21,
    largura: 50.5,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'DESCRIÇÃO DO PRODUTO / SERVIÇO',
    x: 55,
    y: y + 21,
    largura: 179,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'NCM/SH',
    x: 236.5,
    y: y + 21,
    largura: 31.5,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'O/CST',
    x: 270,
    y: y + 21,
    largura: 20,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'CFOP',
    x: 294.5,
    y: y + 21,
    largura: 19.5,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'UN.',
    x: 317,
    y: y + 21,
    largura: 14.5,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'QUANT.',
    x: 335,
    y: y + 21,
    largura: 37,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'VALOR UNIT.',
    x: 375,
    y: y + 21 - 3,
    largura: 31.5,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'VALOR TOTAL.',
    x: 409.5,
    y: y + 21 - 3,
    largura: 31.5,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'B. CÁLC. ICMS',
    x: 443,
    y: y + 21 - 3,
    largura: 31.5,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'VALOR ICMS',
    x: 476,
    y: y + 21 - 3,
    largura: 31.5,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'VALOR IPI',
    x: 507.5,
    y: y + 21 - 3,
    largura: 28,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'ALÍQ. ICMS',
    x: 532,
    y: y + 21 - 3,
    largura: 28,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'ALÍQ. IPI',
    x: 557.75,
    y: y + 21,
    largura: 28,
    alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  return doc.y;
}
