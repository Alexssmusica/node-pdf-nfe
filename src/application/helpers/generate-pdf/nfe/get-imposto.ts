import { formatNumber } from '../../../../domain/use-cases/utils';
import type { GeneratePdf } from '../../../../types';
import { campo } from './campo';
import { DEFAULT_NFE } from './default';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';
import { titulo } from './titulo';

export function getImposto({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  total
}: GeneratePdf.InputImposto): number {
  linhaHorizontal({ x1: 0, x2: 0, y: y + 9, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 29, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 49, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9, y2: y + 49, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9, y2: y + 49, x: 87.7, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9, y2: y + 49, x: 87.7 * 2 + 0.3, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9, y2: y + 49, x: 87.7 * 3 + 0.4, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9, y2: y + 49, x: 87.7 * 4 + 0.4, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9, y2: y + 49, x: 87.7 * 5 + 0.6, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9, y2: y + 49, x: 87.7 * 5 + 51.8, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9, y2: y + 49, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

  secao({ doc, value: 'CÁLCULO DO IMPOSTO', x: 1.5, y: y + 0.9, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });

  titulo({ value: 'BASE DE CÁLCULO DO ICMS', x: 1.5, y: y + 10.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vBC, 2),
    x: 1.5,
    y: y + 19.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'VALOR DO ICMS', x: 89, y: y + 10.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vICMS, 2),
    x: 89,
    y: y + 19.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'BASE DE CÁLC. ICMS S.T.', x: 177, y: y + 10.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vBCST, 2),
    x: 177,
    y: y + 19.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'VALOR DO ICMS SUBST.', x: 265, y: y + 10.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vST, 2),
    x: 265,
    y: y + 19.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'VALOR IMP. IMPORTAÇÃO', x: 353, y: y + 10.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vII, 2),
    x: 353,
    y: y + 19.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'VALOR DO PIS', x: 441, y: y + 10.2, largura: 47, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vPIS, 2),
    x: 441,
    y: y + 19.2,
    largura: 47,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'VALOR TOTAL DOS PRODUTOS', x: 492, y: y + 10.2, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vProd, 2),
    x: 492,
    y: y + 19.2,
    largura: 93,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'VALOR DO FRETE', x: 1.5, y: y + 30.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vFrete, 2),
    x: 1.5,
    y: y + 39.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'VALOR DO SEGURO', x: 89, y: y + 30.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vSeg, 2),
    x: 89,
    y: y + 39.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'DESCONTO', x: 177, y: y + 30.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vDesc, 2),
    x: 177,
    y: y + 39.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'OUTRAS DESPESAS', x: 265, y: y + 30.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vOutro, 2),
    x: 265,
    y: y + 39.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'VALOR TOTAL DO IPI', x: 353, y: y + 30.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vIPI, 2),
    x: 353,
    y: y + 39.2,
    largura: 84,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'VALOR DA COFINS',
    x: 440.5,
    y: y + 30.2,
    largura: 47,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo,
    tamanho: DEFAULT_NFE.tamanhoDaFonteDoTitulo - 1
  });
  campo({
    value: formatNumber(total.ICMSTot.vCOFINS, 2),
    x: 440.5,
    y: y + 39.2,
    largura: 47,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'VALOR TOTAL DA NOTA', x: 492, y: y + 30.2, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatNumber(total.ICMSTot.vNF, 2),
    x: 492,
    y: y + 39.2,
    largura: 93,
    alinhamento: 'right',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  return doc.y;
}
