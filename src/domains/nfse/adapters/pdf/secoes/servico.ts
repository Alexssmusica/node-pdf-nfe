import { NfseCoreData } from '../../../model/nfse';
import { drawBlockHeaderBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { formatCodNbs, formatCodTribNac, truncateText } from '../../../shared/formatacao';
import { mm, pxToMm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

const MAX_DESC_TRIBUTACAO = 170;
const MAX_DESC_SERVICO = 1300;

export function renderServico(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } = LAYOUT_CONSTANTS.columns;
  const { blockLabel, fieldLabel, content } = LAYOUT_CONSTANTS.fontSizes;

  const serv = data.servico;
  const y0 = pxToMm(pdf.y - 8);

  drawBlockHeaderBackground(pdf, y0);

  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.text('SERVICO PRESTADO', mm(col1X), mm(y0), { width: mm(col1W) });

  pdf.fontSize(fieldLabel);
  pdf.text('Cod. Tributacao Nacional / Municipal', mm(col2X), mm(y0), { width: mm(col2W) });
  pdf.text('Codigo da NBS', mm(col3X), mm(y0), { width: mm(col3W) });
  pdf.text('Local da Prestacao / Sigla UF / Pais', mm(col4X), mm(y0), { width: mm(col4W) });

  const codTribNac = formatCodTribNac(serv.codTribNac);
  const codTribMun = serv.codTribMun || '-';
  const codTribTexto = `${codTribNac || '-'} / ${codTribMun}`;
  const localPrest = [data.localPrestacao, serv.pais].filter(Boolean).join(' / ') || '-';

  const y1 = y0 + 3.5;
  pdf.font(font).fontSize(content);
  pdf.text('', mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text(codTribTexto, mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text(formatCodNbs(serv.nbs), mm(col3X), mm(y1), { width: mm(col3W) });
  pdf.text(localPrest, mm(col4X), mm(y1), { width: mm(col4W) });

  const y2 = y1 + 4;
  const descTributacao = serv.xTribMun && serv.xTribMun.trim() ? serv.xTribMun : serv.xTribNac;
  const descTribTexto = truncateText(descTributacao || '-', MAX_DESC_TRIBUTACAO);
  pdf.font(font).fontSize(content);
  const descTribHeightMm = pxToMm(pdf.heightOfString(descTribTexto, { width: mm(LAYOUT_CONSTANTS.contentWidthMm) }));
  pdf.text(descTribTexto, mm(col1X), mm(y2), {
    width: mm(LAYOUT_CONSTANTS.contentWidthMm)
  });

  const y3 = y2 + Math.max(descTribHeightMm, 3.2) + 0.8;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Descricao do Servico', mm(col1X), mm(y3), { width: mm(col1W) });

  const y4 = y3 + 2.8;
  pdf.font(font).fontSize(content);
  const descricaoServicoTexto = truncateText(serv.descricao || '-', MAX_DESC_SERVICO);
  const descServicoHeightMm = pxToMm(pdf.heightOfString(descricaoServicoTexto, { width: mm(LAYOUT_CONSTANTS.contentWidthMm) }));
  pdf.text(descricaoServicoTexto, mm(col1X), mm(y4), {
    width: mm(LAYOUT_CONSTANTS.contentWidthMm)
  });

  pdf.y = mm(y4 + Math.max(descServicoHeightMm, 2.8) + 3);
}
