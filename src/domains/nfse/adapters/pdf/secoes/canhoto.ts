import { NfseCoreData } from '../../../model/nfse';
import { drawBlockHeaderBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { mm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

/**
 * Posicao Y fixa do bloco do canhoto, ancorada ao rodape conforme
 * NT 008 secao 2.4.5 (Y=28.10cm). O bloco usa coordenadas absolutas
 * para nunca ficar logo apos o conteudo, sempre ao pe da pagina.
 */
const CANHOTO_BASE_Y = 281;

export function renderCanhoto(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const { col1X, col2X, col3X, col1W, col2W, col3W, col4W } = LAYOUT_CONSTANTS.columns;
  const { blockLabel, content } = LAYOUT_CONSTANTS.fontSizes;
  const margin = LAYOUT_CONSTANTS.margin;
  const pageWidth = LAYOUT_CONSTANTS.pageWidthMm;
  const ultimaColW = col3W + col4W;

  pdf.save();
  pdf.lineWidth(mm(LAYOUT_CONSTANTS.lineWidthsMm.divider));
  pdf.strokeColor(LAYOUT_CONSTANTS.colors.line);
  pdf
    .moveTo(mm(margin - 0.5), mm(CANHOTO_BASE_Y - 1.5))
    .lineTo(mm(pageWidth - margin), mm(CANHOTO_BASE_Y - 1.5))
    .stroke();
  pdf.restore();

  const y0 = CANHOTO_BASE_Y;

  drawBlockHeaderBackground(pdf, y0);

  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.text('DATA CIENTIFICAÇÃO', mm(col1X), mm(y0), { width: mm(col1W) });
  pdf.text('IDENTIFICAÇÃO E ASSINATURA', mm(col2X), mm(y0), { width: mm(col2W) });
  pdf.text('Nº NFS-e / CHAVE NFS-e', mm(col3X), mm(y0), { width: mm(ultimaColW) });

  const y1 = y0 + 5;
  pdf.font(font).fontSize(content);
  pdf.text('___ / ___ / ______', mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text('________________________', mm(col2X), mm(y1), { width: mm(col2W) });
  const numChave = `${data.numeroNfse || '-'} / ${data.chaveAcesso || '-'}`;
  pdf.text(numChave, mm(col3X), mm(y1), { width: mm(ultimaColW) });

  pdf.y = mm(y1 + 5);
}
