import type { GeneratePdf } from '../../../../types';

export function linhaVertical({ ajusteX, ajusteY, doc, margemEsquerda, margemTopo, x, y1, y2 }: GeneratePdf.InputLinhaVertical): void {
  x = margemEsquerda + ajusteX + x;
  y1 = margemTopo + ajusteY + y1;
  y2 = margemTopo + ajusteY + y2;

  doc.moveTo(x, y1).lineTo(x, y2).stroke();
}
