import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

const OFFSET_Y_PRIMEIRA_PAGINA = 310;
const OFFSET_Y_DEMAIS_PAGINAS = 145;

export function getNotaCancelada({
  doc,
  ajusteX,
  ajusteY,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  folha = 0
}: GeneratePdf.InputNotaCancelada): void {
  const offsetY = folha === 0 ? OFFSET_Y_PRIMEIRA_PAGINA : OFFSET_Y_DEMAIS_PAGINAS;
  doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(60)
    .fillOpacity(DEFAULT_NFE.opacidadeDaHomologacao)
    .text('CANCELADA', margemEsquerda + ajusteX + 0, margemTopo + ajusteY + offsetY + DEFAULT_NFE.ajusteYDaHomologacao, {
      width: larguraDoFormulario,
      align: 'center'
    });

  doc.fillOpacity(100);
}
