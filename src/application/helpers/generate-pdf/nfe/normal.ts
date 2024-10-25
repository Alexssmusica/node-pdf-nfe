import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

export function normal({
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
}: GeneratePdf.InputNormal): void {
  doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(tamanho ?? 8)
    .text(value ?? '', margemEsquerda + ajusteX + x, margemTopo + ajusteY + y, {
      width: largura,
      align: alinhamento ?? 'center',
      lineGap: -1.5
    });
}
