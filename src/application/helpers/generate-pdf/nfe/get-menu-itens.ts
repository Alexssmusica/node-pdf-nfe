import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';
import { ALTURA_CABECALHO_ITENS, TITULOS_COLUNA_ITEM, colunasItem } from './grade-colunas';
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
  const topo = y + 9;
  const base = topo + ALTURA_CABECALHO_ITENS;
  const { colunas, divisorias } = colunasItem(larguraDoFormulario);

  linhaHorizontal({ x1: -0.5, x2: 0.5, y: topo, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: -0.5, x2: 0.5, y: base, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: -0.5, x2: 0.5, y: finalEspacoDet, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });

  linhaVertical({ y1: topo, y2: finalEspacoDet, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  divisorias.forEach((x) => {
    linhaVertical({ y1: topo, y2: finalEspacoDet, x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  });
  linhaVertical({ y1: topo, y2: finalEspacoDet, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

  secao({ doc, value: 'DADOS DOS PRODUTOS / SERVIÇOS', x: 1.5, y: y + 0.9, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });

  (Object.keys(TITULOS_COLUNA_ITEM) as Array<keyof typeof TITULOS_COLUNA_ITEM>).forEach((nome) => {
    const coluna = colunas[nome];
    titulo({
      value: TITULOS_COLUNA_ITEM[nome],
      x: coluna.x,
      y: topo + 1.5,
      largura: coluna.largura,
      alinhamento: DEFAULT_NFE.alinhamentoDoTituloDaTabela,
      tamanho: 5.5,
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo
    });
  });

  doc.y = base;
  return doc.y;
}
