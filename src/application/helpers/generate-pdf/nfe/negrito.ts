import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

export function negrito({
  ajusteX,
  ajusteY,
  doc,
  largura,
  margemEsquerda,
  margemTopo,
  value,
  x,
  y,
  alinhamento,
  tamanho
}: GeneratePdf.InputNegrito): void {
  doc
    .font('negrito')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(tamanho ?? 6)
    .text(value, margemEsquerda + ajusteX + x, margemTopo + ajusteY + y, {
      width: largura,
      align: alinhamento ?? 'center',
      lineGap: -1.5
    });
}
