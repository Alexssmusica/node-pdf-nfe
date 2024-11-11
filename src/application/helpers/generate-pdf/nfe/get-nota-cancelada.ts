import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

export function getNotaCancelada({
  doc,
  ajusteX,
  ajusteY,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario
}: GeneratePdf.InputNotaCancelada): void {
  doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(60)
    .fillOpacity(DEFAULT_NFE.opacidadeDaHomologacao)
    .text('CANCELADA', margemEsquerda + ajusteX + 0, margemTopo + ajusteY + 200 + DEFAULT_NFE.ajusteYDaHomologacao, {
      width: larguraDoFormulario,
      align: 'center'
    });

  doc.fillOpacity(100);
}
