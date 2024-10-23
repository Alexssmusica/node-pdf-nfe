import { type GeneratePdf } from '../../../../domain/contracts/repos';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { titulo } from './titulo';
import { campo } from './campo';
import { DEFAULT_NFE } from './default';
import { secao } from './secao';


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
  linhaHorizontal({ x1: 0, x2: 0, y: y + 16.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 36.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 56.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 16.2, y2: y + 56.2, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 16.2, y2: y + 56.2, x: 87.7, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 16.2, y2: y + 56.2, x: (87.7 * 2) + 0.3, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 16.2, y2: y + 56.2, x: (87.7 * 3) + 0.4, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 16.2, y2: y + 56.2, x: (87.7 * 4) + 0.4, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 16.2, y2: y + 56.2, x: (87.7 * 5) + 0.6, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 16.2, y2: y + 56.2, x: (87.7 * 5) + 51.8, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 16.2, y2: y + 56.2, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  
  secao({ doc, value: 'CÁLCULO DO IMPOSTO', x: 1.5, y: y + 8.7, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });

  titulo({ value: 'BASE DE CÁLCULO DO ICMS', x: 1.5, y: y + 17.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vBC)), x: 1.5, y: y + 26.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR DO ICMS', x: 89, y: y + 17.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vICMS)), x: 89, y: y + 26.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'BASE DE CÁLC. ICMS S.T.', x: 177, y: y + 17.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vBCST)), x: 177, y: y + 26.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR DO ICMS SUBST.', x: 265, y: y + 17.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vST)), x: 265, y: y + 26.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR IMP. IMPORTAÇÃO', x: 353, y: y + 17.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vIPI)), x: 353, y: y + 26.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR DO PIS', x: 441, y: y + 17.2, largura: 47, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vPIS)), x: 441, y: y + 26.2, largura: 47, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR TOTAL DOS PRODUTOS', x: 492, y: y + 17.2, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vProd)), x: 492, y: y + 26.2, largura: 93, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR DO FRETE', x: 1.5, y: y + 37.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vFrete)), x: 1.5, y: y + 46.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR DO SEGURO', x: 89, y: y + 37.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vSeg)), x: 89, y: y + 46.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'DESCONTO', x: 177, y: y + 37.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vDesc)), x: 177, y: y + 46.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'OUTRAS DESPESAS', x: 265, y: y + 37.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vOutro)), x: 265, y: y + 46.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR TOTAL DO IPI', x: 353, y: y + 37.2, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vIPI)), x: 353, y: y + 46.2, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR DA COFINS', x: 440.5, y: y + 37.2, largura: 47, ajusteX, ajusteY, doc, margemEsquerda, margemTopo, tamanho: DEFAULT_NFE.tamanhoDaFonteDoTitulo - 1 });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vCOFINS)), x: 440.5, y: y + 46.2, largura: 47, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'VALOR TOTAL DA NOTA', x: 492, y: y + 37.2, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vNF)), x: 492, y: y + 46.2, largura: 93, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  return doc.y;
}
