import { caminhoFonte } from '../../../../shared/assets/caminhos';

export const FONTS = {
  arial: {
    normal: caminhoFonte('arial', 'arial.ttf'),
    semibold: caminhoFonte('arial', 'arial_medium.ttf'),
    bold: caminhoFonte('arial', 'arial_bold.ttf'),
    italic: caminhoFonte('arial', 'arial_italic.ttf'),
    semiboldItalic: caminhoFonte('arial', 'arial_medium_italic.ttf'),
    boldItalic: caminhoFonte('arial', 'arial_bold_italic.ttf')
  }
} as const;

/**
 * Nomes das familias de fontes registradas no PDF. A NT 008 v1.0 secao 2.4
 * exige Arial para labels e Microsoft Sans Serif para conteudo, mas como o
 * projeto so distribui Arial, MsSansSerif eh registrada apontando para o
 * mesmo TTF (Arial substitui Microsoft Sans Serif).
 */
export const FONT_NAMES = {
  labelRegular: 'Arial',
  labelBold: 'Arial-Bold',
  labelSemibold: 'Arial-Semibold',
  labelItalic: 'Arial-Italic',
  labelSemiboldItalic: 'Arial-SemiboldItalic',
  labelBoldItalic: 'Arial-BoldItalic',
  content: 'MsSansSerif',
  contentBold: 'MsSansSerif-Bold'
} as const;

export function registerFonts(pdf: PDFKit.PDFDocument): void {
  pdf.registerFont(FONT_NAMES.labelRegular, FONTS.arial.normal);
  pdf.registerFont(FONT_NAMES.labelSemibold, FONTS.arial.semibold);
  pdf.registerFont(FONT_NAMES.labelBold, FONTS.arial.bold);
  pdf.registerFont(FONT_NAMES.labelItalic, FONTS.arial.italic);
  pdf.registerFont(FONT_NAMES.labelSemiboldItalic, FONTS.arial.semiboldItalic);
  pdf.registerFont(FONT_NAMES.labelBoldItalic, FONTS.arial.boldItalic);
  pdf.registerFont(FONT_NAMES.content, FONTS.arial.normal);
  pdf.registerFont(FONT_NAMES.contentBold, FONTS.arial.bold);
}
