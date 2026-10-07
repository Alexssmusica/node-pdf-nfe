import { formatNumber } from '../../../../domain/use-cases/utils';
import type { GeneratePdf } from '../../../../types';
import { campo } from './campo';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';
import { titulo } from './titulo';

export type CampoBlocoTotal = {
  titulo: string;
  valor: string;
};

type BlocoTotais = GeneratePdf.InputImposto & {
  tituloSecao: string;
  linhas: CampoBlocoTotal[][];
  tamanhoTitulo: number;
  alturaLinha: number;
};

export function moeda(valor: string | number | undefined): string {
  if (valor === undefined || valor === '') return formatNumber(0, 2);
  return formatNumber(valor, 2);
}

export function desenharBlocoTotais({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  tituloSecao,
  linhas,
  tamanhoTitulo,
  alturaLinha
}: BlocoTotais): number {
  const topo = y + 9;
  const base = topo + linhas.length * alturaLinha;

  secao({ doc, value: tituloSecao, x: 1.5, y: y + 0.9, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: topo, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });

  linhas.forEach((campos, indice) => {
    const yLinha = topo + indice * alturaLinha;
    const yBase = yLinha + alturaLinha;
    const larguraColuna = larguraDoFormulario / campos.length;
    linhaHorizontal({ x1: 0, x2: 0, y: yBase, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    campos.forEach((campoTotal, coluna) => {
      const x = coluna * larguraColuna;
      if (coluna > 0) {
        linhaVertical({ y1: yLinha, y2: yBase, x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
      }
      titulo({
        value: campoTotal.titulo,
        x: x + 1.5,
        y: yLinha + 1.2,
        largura: larguraColuna - 3,
        tamanho: tamanhoTitulo,
        ajusteX,
        ajusteY,
        doc,
        margemEsquerda,
        margemTopo
      });
      campo({
        value: campoTotal.valor,
        x: x + 1.5,
        y: yLinha + alturaLinha - 11,
        largura: larguraColuna - 3,
        alinhamento: 'right',
        tamanho: 8,
        ajusteX,
        ajusteY,
        doc,
        margemEsquerda,
        margemTopo
      });
    });
  });

  linhaVertical({ y1: topo, y2: base, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: topo, y2: base, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

  doc.y = margemTopo + ajusteY + base;
  return doc.y;
}
