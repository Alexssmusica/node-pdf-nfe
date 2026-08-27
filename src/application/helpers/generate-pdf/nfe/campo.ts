import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

const TAMANHO_MINIMO_DA_FONTE = 5;
const DECREMENTO_DA_FONTE = 0.25;

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
  const texto = value ?? '';
  let tamanhoDaFonte = tamanho ?? DEFAULT_NFE.tamanhoDaFonteDoCampo;
  doc.font('negrito').fillColor(DEFAULT_NFE.corDoCampo).fontSize(tamanhoDaFonte);
  while (texto && largura > 0 && tamanhoDaFonte > TAMANHO_MINIMO_DA_FONTE && doc.widthOfString(texto) > largura) {
    tamanhoDaFonte -= DECREMENTO_DA_FONTE;
    doc.fontSize(tamanhoDaFonte);
  }
  doc.text(texto, margemEsquerda + ajusteX + x, margemTopo + ajusteY + y, {
    width: largura,
    height: doc.currentLineHeight(true),
    ellipsis: true,
    align: alinhamento ?? DEFAULT_NFE.alinhamentoDoCampo
  });
}
