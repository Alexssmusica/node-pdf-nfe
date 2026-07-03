import path from 'path';

export function loadFonts(doc: PDFKit.PDFDocument): void {
  const diretorioDeFontes = path.join(__dirname, './../fontes/times-new-roman');
  const timesNewRoman = path.join(diretorioDeFontes, 'times-new-roman.ttf');
  const timesNewRomanNegrito = path.join(diretorioDeFontes, 'times-new-roman-bold.ttf');
  const timesNewRomanItalico = path.join(diretorioDeFontes, 'times-new-roman-italic.ttf');
  const timesNewRomanNegritoItalico = path.join(diretorioDeFontes, 'times-new-roman-bold-italic.ttf');

  doc.registerFont('normal', timesNewRoman);
  doc.registerFont('negrito', timesNewRomanNegrito);
  doc.registerFont('italico', timesNewRomanItalico);
  doc.registerFont('negrito-italico', timesNewRomanNegritoItalico);
}

export function loadFontsNFCe(doc: PDFKit.PDFDocument): void {
  const diretorioDeFontes = path.join(__dirname, './../fontes/roboto-condensed');
  const normal = path.join(diretorioDeFontes, 'roboto-condensed-regular.ttf');
  const negrito = path.join(diretorioDeFontes, 'roboto-condensed-bold.ttf');
  const italico = path.join(diretorioDeFontes, 'roboto-condensed-italic.ttf');
  const negritoItalico = path.join(diretorioDeFontes, 'roboto-condensed-bold-italic.ttf');

  doc.registerFont('normal', normal);
  doc.registerFont('negrito', negrito);
  doc.registerFont('italico', italico);
  doc.registerFont('negrito-italico', negritoItalico);
}
