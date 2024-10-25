import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

export function campo({
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
}: GeneratePdf.InputCampo): void {
  doc
    .font('negrito')
    .fillColor(DEFAULT_NFE.corDoCampo)
    .fontSize(tamanho ?? DEFAULT_NFE.tamanhoDaFonteDoCampo)
    .text(value, margemEsquerda + ajusteX + x, margemTopo + ajusteY + y, {
      width: largura,
      align: alinhamento ?? DEFAULT_NFE.alinhamentoDoCampo
    });
}
