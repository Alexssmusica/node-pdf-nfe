import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';

const OFFSET_BASE_PRIMEIRA_PAGINA = 310;
const OFFSET_BASE_DEMAIS_PAGINAS = 145;
const ESPACAMENTO_MARCAS = 50;

export function getHomologacao({
  doc,
  ajusteX,
  ajusteY,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  protNFe,
  cancelada,
  folha = 0
}: GeneratePdf.InputHomologacao): void {
  const baseOffset = folha === 0 ? OFFSET_BASE_PRIMEIRA_PAGINA : OFFSET_BASE_DEMAIS_PAGINAS;
  const y1 = baseOffset - ESPACAMENTO_MARCAS + DEFAULT_NFE.ajusteYDaHomologacao;
  const y2 = baseOffset + DEFAULT_NFE.ajusteYDaHomologacao;
  const y3 = baseOffset + ESPACAMENTO_MARCAS + DEFAULT_NFE.ajusteYDaHomologacao;

  doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(38)
    .fillOpacity(DEFAULT_NFE.opacidadeDaHomologacao)
    .text('EMITIDA EM HOMOLOGAÇÃO', margemEsquerda + ajusteX + 0, margemTopo + ajusteY + y1, {
      width: larguraDoFormulario,
      align: 'center'
    });

  doc
    .font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(25)
    .fillOpacity(DEFAULT_NFE.opacidadeDaHomologacao)
    .text(protNFe !== undefined ? 'SEM VALOR FISCAL' : 'NÃO ENVIADA PARA SEFAZ', margemEsquerda + ajusteX + 0, margemTopo + ajusteY + y2, {
      width: larguraDoFormulario,
      align: 'center'
    });

  if (cancelada) {
    doc
      .font('normal')
      .fillColor(DEFAULT_NFE.corDoTitulo)
      .fontSize(38)
      .fillOpacity(DEFAULT_NFE.opacidadeDaHomologacao)
      .text('CANCELADA', margemEsquerda + ajusteX + 0, margemTopo + ajusteY + y3, {
        width: larguraDoFormulario,
        align: 'center'
      });
  }

  doc.fillOpacity(100);
}
