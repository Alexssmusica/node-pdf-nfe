import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

export function secao({ ajusteX, ajusteY, doc, largura, margemEsquerda, margemTopo, value, x, y, tamanho }: GeneratePdf.InputSecao): void {
  x = margemEsquerda + ajusteX + x;
  y = margemTopo + ajusteY + y;
  doc
    .font('negrito')
    .fillColor(DEFAULT_NFE.corDaSecao)
    .fontSize(tamanho ?? DEFAULT_NFE.tamanhoDaFonteDaSecao)
    .text(value.toUpperCase(), x, y, {
      width: largura,
      align: 'left'
    });
}
