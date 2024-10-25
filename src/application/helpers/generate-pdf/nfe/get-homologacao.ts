import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

export function getHomologacao({
  doc,
  ajusteX,
  ajusteY,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  protNFe
}: GeneratePdf.InputHomologacao): void {
  doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(38)
    .fillOpacity(DEFAULT_NFE.opacidadeDaHomologacao)
    .text('EMITIDA EM HOMOLOGAÇÃO', margemEsquerda + ajusteX + 0, margemTopo + ajusteY + 200 + DEFAULT_NFE.ajusteYDaHomologacao, {
      width: larguraDoFormulario,
      align: 'center'
    });

  doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(25)
    .fillOpacity(DEFAULT_NFE.opacidadeDaHomologacao)
    .text(
      protNFe !== undefined ? 'SEM VALOR FISCAL' : 'NÃO ENVIADA PARA SEFAZ',
      margemEsquerda + ajusteX + 0,
      margemTopo + ajusteY + 250 + DEFAULT_NFE.ajusteYDaHomologacao,
      {
        width: larguraDoFormulario,
        align: 'center'
      }
    );

  doc.fillOpacity(100);
}
