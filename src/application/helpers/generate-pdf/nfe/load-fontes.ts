import path from 'path';

export function loadFonts(doc: PDFKit.PDFDocument): void {
  const diretorioDeFontes = path.join(__dirname, './../fontes');
  const timesNewRoman = path.join(diretorioDeFontes, 'Times New Roman.ttf');
  const timesNewRomanNegrito = path.join(diretorioDeFontes, 'Times New Roman Bold.ttf');
  const timesNewRomanItalico = path.join(diretorioDeFontes, 'Times New Roman Italic.ttf');
  const timesNewRomanNegritoItalico = path.join(diretorioDeFontes, 'Times New Roman Bold Italic.ttf');

  doc.registerFont('normal', timesNewRoman);
  doc.registerFont('negrito', timesNewRomanNegrito);
  doc.registerFont('italico', timesNewRomanItalico);
  doc.registerFont('negrito-italico', timesNewRomanNegritoItalico);
}

export function loadFontsNFCe(doc: PDFKit.PDFDocument): void {
  const diretorioDeFontes = path.join(__dirname, './../fontes/roboto-condensed');
  const normal = path.join(diretorioDeFontes, 'RobotoCondensed-Regular.ttf');
  const negrito = path.join(diretorioDeFontes, 'RobotoCondensed-Bold.ttf');
  const italico = path.join(diretorioDeFontes, 'RobotoCondensed-Italic.ttf');
  const negritoItalico = path.join(diretorioDeFontes, 'RobotoCondensed-BoldItalic.ttf');

  doc.registerFont('normal', normal);
  doc.registerFont('negrito', negrito);
  doc.registerFont('italico', italico);
  doc.registerFont('negrito-italico', negritoItalico);
}
