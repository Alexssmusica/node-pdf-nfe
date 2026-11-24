import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

export function getNotaCancelada({
  doc,
  ajusteX,
  ajusteY,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  geometria,
  folha = 0
}: GeneratePdf.InputNotaCancelada): void {
  const offsetY = folha === 0 ? geometria.offsetNotaCanceladaPrimeiraPagina : geometria.offsetNotaCanceladaDemaisPaginas;
  doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(60)
    .fillOpacity(DEFAULT_NFE.opacidadeDaHomologacao)
    .text('CANCELADA', margemEsquerda + ajusteX + 0, margemTopo + ajusteY + offsetY + geometria.ajusteYDaHomologacao, {
      width: larguraDoFormulario,
      align: 'center'
    });

  doc.fillOpacity(100);
}
