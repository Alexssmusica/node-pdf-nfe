import { caminhoFonte } from '../../../../../shared/assets/caminhos';

export function loadFonts(doc: PDFKit.PDFDocument): void {
  doc.registerFont('normal', caminhoFonte('times-new-roman', 'times_new_roman.ttf'));
  doc.registerFont('negrito', caminhoFonte('times-new-roman', 'times_new_roman_bold.ttf'));
  doc.registerFont('italico', caminhoFonte('times-new-roman', 'times_new_roman_italic.ttf'));
  doc.registerFont('negrito-italico', caminhoFonte('times-new-roman', 'times_new_roman_bold_italic.ttf'));
}

export function loadFontsNFCe(doc: PDFKit.PDFDocument): void {
  doc.registerFont('normal', caminhoFonte('roboto-condensed', 'roboto_condensed_regular.ttf'));
  doc.registerFont('negrito', caminhoFonte('roboto-condensed', 'roboto_condensed_bold.ttf'));
  doc.registerFont('italico', caminhoFonte('roboto-condensed', 'roboto_condensed_italic.ttf'));
  doc.registerFont('negrito-italico', caminhoFonte('roboto-condensed', 'roboto_condensed_bold_italic.ttf'));
}
