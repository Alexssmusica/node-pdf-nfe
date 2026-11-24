import type { GeneratePdf } from '../../../../types';

export function linhaVertical({
  ajusteX,
  ajusteY,
  doc,
  margemEsquerda,
  margemTopo,
  x,
  y1,
  y2,
  tracejada = false
}: GeneratePdf.InputLinhaVertical): void {
  x = margemEsquerda + ajusteX + x;
  y1 = margemTopo + ajusteY + y1;
  y2 = margemTopo + ajusteY + y2;

  if (tracejada) {
    doc.save();
    doc.lineWidth(0.2).moveTo(x, y1).lineTo(x, y2).dash(5, { space: 2 }).stroke();
    doc.restore();
  } else {
    doc.moveTo(x, y1).lineTo(x, y2).stroke();
  }
}
