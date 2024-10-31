import type { GeneratePdf } from '../../../../types';
import { campo } from './campo';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';
import { titulo } from './titulo';

export function getIss({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  emit,
  total
}: GeneratePdf.InputISS): number {
  if (total.ISSQNtot?.vServ !== undefined || total.ISSQNtot?.vBC !== undefined || total.ISSQNtot?.vISS !== undefined) {
    linhaHorizontal({ x1: 0, x2: 0, y: 762.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    linhaHorizontal({ x1: 0, x2: 0, y: 782.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    linhaVertical({ y1: 762.2, y2: 782.2, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    linhaVertical({ y1: 762.2, y2: 782.2, x: 136.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    linhaVertical({ y1: 762.2, y2: 782.2, x: 136.1 * 2 - 0.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    linhaVertical({ y1: 762.2, y2: 782.2, x: 136.1 * 3 - 0.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    linhaVertical({ y1: 762.2, y2: 782.2, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

    secao({ doc, value: 'CÁLCULO DO ISSQN', x: 1.5, y: 754.5, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });

    titulo({ value: 'INSCRIÇÃO MUNICIPAL', x: 1.5, y: 763, largura: 132.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    campo({
      value: emit?.IM ?? '',
      x: 1.5,
      y: 771,
      largura: 132.5,
      alinhamento: 'left',
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo
    });

    titulo({ value: 'VALOR TOTAL DOS SERVIÇOS', x: 137.5, y: 763, largura: 132.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    campo({
      value: total.ISSQNtot?.vServ ?? '',
      x: 137.5,
      y: 771,
      largura: 132.5,
      alinhamento: 'right',
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo
    });

    titulo({ value: 'BASE DE CÁLCULO DO ISSQN', x: 273.5, y: 763, largura: 132.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    campo({
      value: total.ISSQNtot?.vBC ?? '',
      x: 273.5,
      y: 771,
      largura: 132.5,
      alinhamento: 'right',
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo
    });

    titulo({ value: 'VALOR TOTAL DO ISSQN', x: 409.5, y: 763, largura: 175.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    campo({
      value: total.ISSQNtot?.vISS ?? '',
      x: 409.5,
      y: 771,
      largura: 175.5,
      alinhamento: 'right',
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo
    });
  }

  return doc.y;
}
