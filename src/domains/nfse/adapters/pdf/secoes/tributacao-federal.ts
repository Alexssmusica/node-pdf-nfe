import { NfseCoreData } from '../../../model/nfse';
import { retencaoPisCofins } from '../../../model/descricoes-codigos';
import { drawBlockHeaderBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { mm, pxToMm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

const TITULO = 'TRIBUTACAO FEDERAL (EXCETO CBS)';

/**
 * Conforme NT 008 Nota 6: este bloco deve ser impresso apenas para
 * NFS-e com data de competencia ate o final do ano-calendario de 2026.
 */
export function devePrintarTributacaoFederal(data: NfseCoreData): boolean {
  const competencia = data.competenciaDps || data.dps?.competencia || '';
  const match = competencia.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return true;
  const ano = Number(match[3]);
  return Number.isFinite(ano) && ano <= 2026;
}

export function renderTributacaoFederal(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  if (!devePrintarTributacaoFederal(data)) return;

  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } = LAYOUT_CONSTANTS.columns;
  const { blockLabel, fieldLabel, content } = LAYOUT_CONSTANTS.fontSizes;

  const val = data.valores;
  const trib = data.tributacao;
  const y0 = pxToMm(pdf.y - 8);

  drawBlockHeaderBackground(pdf, y0);

  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.text(TITULO, mm(col1X), mm(y0), { width: mm(col1W) });

  pdf.fontSize(fieldLabel);
  pdf.text('IRRF', mm(col2X), mm(y0), { width: mm(col2W) });
  pdf.text('Contribuicao Previdenciaria - Retida', mm(col3X), mm(y0), { width: mm(col3W) });
  pdf.text('Contribuicoes Sociais - Retidas', mm(col4X), mm(y0), { width: mm(col4W) });

  const y1 = y0 + 3.5;
  pdf.font(font).fontSize(content);
  pdf.text('', mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text(val.IRRF || '-', mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text(val.CP || '-', mm(col3X), mm(y1), { width: mm(col3W) });
  pdf.text(val.CSLL || '-', mm(col4X), mm(y1), { width: mm(col4W) });

  const y2 = y1 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('PIS - Debito Apuracao Propria', mm(col1X), mm(y2), { width: mm(col1W) });
  pdf.text('COFINS - Debito Apuracao Propria', mm(col2X), mm(y2), { width: mm(col2W) });
  pdf.text('Descricao Contrib. Sociais - Retidas', mm(col3X), mm(y2), { width: mm(col3W + col4W) });

  const y3 = y2 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(val.PIS || '-', mm(col1X), mm(y3), { width: mm(col1W) });
  pdf.text(val.COFINS || '-', mm(col2X), mm(y3), { width: mm(col2W) });
  pdf.text(retencaoPisCofins(trib.tipoRetencaoPisCofins), mm(col3X), mm(y3), { width: mm(col3W + col4W) });

  pdf.y = mm(y3 + 7);
}
