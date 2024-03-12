import path from 'path';

export function loadFonts(doc: PDFKit.PDFDocument) {
  const fontsDirectory = path.join(__dirname, './../fontes');

  const timesNewRoman = path.join(fontsDirectory, 'Times New Roman.ttf');
  const timesNewRomanBold = path.join(fontsDirectory, 'Times New Roman Bold.ttf');
  const timesNewRomanItalic = path.join(fontsDirectory, 'Times New Roman Italic.ttf');
  const timesNewRomanBoldItalic = path.join(fontsDirectory, 'Times New Roman Bold Italic.ttf');

  doc.registerFont('normal', timesNewRoman);
  doc.registerFont('negrito', timesNewRomanBold);
  doc.registerFont('italico', timesNewRomanItalic);
  doc.registerFont('negrito-italico', timesNewRomanBoldItalic);
}

export function loadFontsNFCe(doc: PDFKit.PDFDocument) {
  const fontsDirectory = path.join(__dirname, './../fontes/roboto-condensed');

  const normal = path.join(fontsDirectory, 'RobotoCondensed-Regular.ttf');
  const bold = path.join(fontsDirectory, 'RobotoCondensed-Bold.ttf');
  const italic = path.join(fontsDirectory, 'RobotoCondensed-Italic.ttf');
  const boldItalic = path.join(fontsDirectory, 'RobotoCondensed-BoldItalic.ttf');

  doc.registerFont('normal', normal);
  doc.registerFont('negrito', bold);
  doc.registerFont('italico', italic);
  doc.registerFont('negrito-italico', boldItalic);
}
