import QRCode from 'qrcode';
import { FONT_NAMES } from './fontes';
import { mm } from './unidades';
import { LAYOUT_CONSTANTS } from './layout';

export async function drawQrCode(pdf: PDFKit.PDFDocument, url: string, xMm: number, yMm: number, sizeMm: number): Promise<void> {
  const png = await QRCode.toBuffer(url, {
    type: 'png',
    errorCorrectionLevel: 'M',
    margin: 0,
    scale: 8
  });

  pdf.image(png, mm(xMm), mm(yMm), {
    width: mm(sizeMm),
    height: mm(sizeMm)
  });
}

export function drawDocumentBorder(pdf: PDFKit.PDFDocument, pageWidthMm: number, pageHeightMm: number, margin: number): void {
  const x1 = margin - 1.0;
  const y1 = margin - 1.0;
  const width = pageWidthMm - (2 * margin - 2.0);
  const height = pageHeightMm - (2 * margin - 2.0);

  pdf.save();
  pdf.lineWidth(mm(LAYOUT_CONSTANTS.lineWidthsMm.border));
  pdf.strokeColor(LAYOUT_CONSTANTS.colors.line);
  pdf.rect(mm(x1), mm(y1), mm(width), mm(height)).stroke();
  pdf.restore();
}

export function addHorizontalLine(pdf: PDFKit.PDFDocument, pageWidthMm: number, margin: number): void {
  const y = pdf.y - 6;
  const x1 = mm(margin - 0.5);
  const x2 = mm(pageWidthMm - margin);
  pdf.save();
  pdf.lineWidth(mm(LAYOUT_CONSTANTS.lineWidthsMm.divider));
  pdf.strokeColor(LAYOUT_CONSTANTS.colors.line);
  pdf.moveTo(x1, y).lineTo(x2, y).stroke();
  pdf.restore();
  pdf.moveDown(0.5);
}

/**
 * Desenha um retangulo de fundo cinza claro (5% densidade) para
 * destacar cabecalho, titulos de bloco e campos especiais.
 */
export function drawShadedBackground(pdf: PDFKit.PDFDocument, xMm: number, yMm: number, widthMm: number, heightMm: number): void {
  pdf.save();
  pdf.fillColor(LAYOUT_CONSTANTS.colors.shaded);
  pdf.rect(mm(xMm), mm(yMm), mm(widthMm), mm(heightMm)).fill();
  pdf.restore();
}

/**
 * Desenha o fundo cinza padrao para o cabecalho (primeira linha) de
 * qualquer bloco DANFSe (titulo + labels das colunas), conforme
 * NT 008 secao 2.2.3.
 */
export function drawBlockHeaderBackground(pdf: PDFKit.PDFDocument, yMm: number, heightMm: number = 3.5): void {
  drawShadedBackground(pdf, LAYOUT_CONSTANTS.margin, yMm - 0.5, LAYOUT_CONSTANTS.contentWidthMm, heightMm);
}

/**
 * Desenha marca dagua diagonal (CANCELADA / SUBSTITUIDA) em cinza,
 * 50pt Arial, conforme NT 008 secao 2.5.1 e 2.5.2.
 */
export function drawWatermark(pdf: PDFKit.PDFDocument, text: string): void {
  const cx = mm(LAYOUT_CONSTANTS.pageWidthMm) / 2;
  const cy = mm(LAYOUT_CONSTANTS.pageHeightMm) / 2;

  pdf.save();
  pdf.fillColor(LAYOUT_CONSTANTS.colors.watermark);
  pdf.opacity(LAYOUT_CONSTANTS.watermarkOpacity);
  pdf.font(FONT_NAMES.labelBold).fontSize(LAYOUT_CONSTANTS.fontSizes.watermark);

  const textWidth = pdf.widthOfString(text);
  const textHeight = pdf.currentLineHeight();

  pdf.rotate(-45, { origin: [cx, cy] });
  pdf.text(text, cx - textWidth / 2, cy - textHeight / 2, { lineBreak: false });
  pdf.restore();
}
