import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

export function italico({
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
}: GeneratePdf.InputItalico): void {
  doc
    .font('italico')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(tamanho ?? 6)
    .text(value ?? '', margemEsquerda + ajusteX + x, margemTopo + ajusteY + y, {
      width: largura,
      align: alinhamento ?? 'center',
      lineGap: -1.5
    });
}
