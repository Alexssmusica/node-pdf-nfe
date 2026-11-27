import { NfseCoreData } from '../../../model/nfse';
import { drawBlockHeaderBackground, drawShadedBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { mm, pxToMm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

const TITULO = 'VALOR TOTAL DA NFS-E';

export function renderValores(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } = LAYOUT_CONSTANTS.columns;
  const { blockLabel, fieldLabel, content } = LAYOUT_CONSTANTS.fontSizes;

  const val = data.valores;
  const ibs = data.ibsCbs;
  const y0 = pxToMm(pdf.y - 8);

  drawBlockHeaderBackground(pdf, y0);

  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.text(TITULO, mm(col1X), mm(y0), { width: mm(col1W) });

  pdf.fontSize(fieldLabel);
  pdf.text('Valor da Operacao / Servico', mm(col2X), mm(y0), { width: mm(col2W) });
  pdf.text('Desconto Incondicionado', mm(col3X), mm(y0), { width: mm(col3W) });
  pdf.text('Desconto Condicionado', mm(col4X), mm(y0), { width: mm(col4W) });

  const y1 = y0 + 3.5;
  pdf.font(font).fontSize(content);
  pdf.text('', mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text(val.servico, mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text(val.descontoIncondicionado, mm(col3X), mm(y1), { width: mm(col3W) });
  pdf.text(val.descontoCondicionado, mm(col4X), mm(y1), { width: mm(col4W) });

  const y2 = y1 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Total das Retencoes (ISSQN / Federais)', mm(col1X), mm(y2), { width: mm(col1W) });
  pdf.text('Valor Liquido da NFS-e', mm(col2X), mm(y2), { width: mm(col2W) });
  pdf.text('Total do IBS/CBS', mm(col3X), mm(y2), { width: mm(col3W) });

  const y2Shade = y2 - 0.5;
  drawShadedBackground(pdf, col4X - 0.5, y2Shade, col4W + 0.5, 6.5);
  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Valor Liquido da NFS-e + IBS/CBS', mm(col4X), mm(y2), { width: mm(col4W) });

  const y3 = y2 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(val.totalRetencoes, mm(col1X), mm(y3), { width: mm(col1W) });
  pdf.text(val.liquido, mm(col2X), mm(y3), { width: mm(col2W) });
  pdf.text(ibs.vTotIBSCBS, mm(col3X), mm(y3), { width: mm(col3W) });
  pdf.font(FONT_NAMES.labelBold).fontSize(content);
  pdf.text(ibs.vTotNF, mm(col4X), mm(y3), { width: mm(col4W) });

  pdf.y = mm(y3 + 7);
}
