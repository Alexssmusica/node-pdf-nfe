import { NfseCoreData } from '../../../model/nfse';
import { indicadorOperacaoIBS } from '../../../model/descricoes-codigos';
import { drawBlockHeaderBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { mm, pxToMm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

const TITULO = 'TRIBUTACAO IBS / CBS';

function montarLocalIncidencia(data: NfseCoreData): string {
  const ibs = data.ibsCbs;
  const partes: string[] = [];
  if (ibs.cIndOp && ibs.cIndOp !== '-') partes.push(indicadorOperacaoIBS(ibs.cIndOp));
  if (ibs.cLocalidadeIncid && ibs.cLocalidadeIncid !== '-') partes.push(ibs.cLocalidadeIncid);
  if (ibs.xLocalidadeIncid) partes.push(ibs.xLocalidadeIncid);
  if (ibs.ufLoc) partes.push(ibs.ufLoc);
  return partes.length > 0 ? partes.join(' / ') : '-';
}

function montarRedAliq(data: NfseCoreData): string {
  const ibs = data.ibsCbs;
  const partes = [ibs.pRedAliqUF, ibs.pRedAliqMun, ibs.pRedAliqCBS];
  if (partes.every((p) => p === '-')) return '-';
  return partes.join(' / ');
}

function montarAliqIbs(data: NfseCoreData): string {
  const ibs = data.ibsCbs;
  if (ibs.pIBSUF === '-' && ibs.pIBSMun === '-') return '-';
  return `${ibs.pIBSUF} / ${ibs.pIBSMun}`;
}

function montarCstCClass(data: NfseCoreData): string {
  const ibs = data.ibsCbs;
  if (ibs.cst === '-' && ibs.cClassTrib === '-') return '-';
  return `${ibs.cst} / ${ibs.cClassTrib}`;
}

export function renderTributacaoIbsCbs(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } = LAYOUT_CONSTANTS.columns;
  const { blockLabel, fieldLabel, content } = LAYOUT_CONSTANTS.fontSizes;

  const ibs = data.ibsCbs;
  const y0 = pxToMm(pdf.y - 8);

  drawBlockHeaderBackground(pdf, y0);

  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.text(TITULO, mm(col1X), mm(y0), { width: mm(col1W) });

  pdf.fontSize(fieldLabel);
  pdf.text('CST / cClassTrib', mm(col2X), mm(y0), { width: mm(col2W) });
  pdf.text('Ind. Operacao / Cod. IBGE / Municipio / UF', mm(col3X), mm(y0), { width: mm(col3W + col4W) });

  const y1 = y0 + 3.5;
  pdf.font(font).fontSize(content);
  pdf.text('', mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text(montarCstCClass(data), mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text(montarLocalIncidencia(data), mm(col3X), mm(y1), { width: mm(col3W + col4W) });

  const y2 = y1 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Exclusoes e Reducoes da BC', mm(col1X), mm(y2), { width: mm(col1W) });
  pdf.text('BC Apos Exclusoes/Reducoes', mm(col2X), mm(y2), { width: mm(col2W) });
  pdf.text('Red. Aliq. IBS UF / IBS Mun / CBS', mm(col3X), mm(y2), { width: mm(col3W) });
  pdf.text('Aliquota IBS UF / IBS Mun', mm(col4X), mm(y2), { width: mm(col4W) });

  const y3 = y2 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(ibs.vExclRed, mm(col1X), mm(y3), { width: mm(col1W) });
  pdf.text(ibs.vBC, mm(col2X), mm(y3), { width: mm(col2W) });
  pdf.text(montarRedAliq(data), mm(col3X), mm(y3), { width: mm(col3W) });
  pdf.text(montarAliqIbs(data), mm(col4X), mm(y3), { width: mm(col4W) });

  const y4 = y3 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Aliq. Efetiva Mun. - IBS', mm(col1X), mm(y4), { width: mm(col1W) });
  pdf.text('Valor Apurado Mun. - IBS', mm(col2X), mm(y4), { width: mm(col2W) });
  pdf.text('Aliq. Efetiva Est. - IBS', mm(col3X), mm(y4), { width: mm(col3W) });
  pdf.text('Valor Apurado Est. - IBS', mm(col4X), mm(y4), { width: mm(col4W) });

  const y5 = y4 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(ibs.pAliqEfetMun, mm(col1X), mm(y5), { width: mm(col1W) });
  pdf.text(ibs.vIBSMun, mm(col2X), mm(y5), { width: mm(col2W) });
  pdf.text(ibs.pAliqEfetUF, mm(col3X), mm(y5), { width: mm(col3W) });
  pdf.text(ibs.vIBSUF, mm(col4X), mm(y5), { width: mm(col4W) });

  const y6 = y5 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Valor Total Apurado - IBS', mm(col1X), mm(y6), { width: mm(col1W) });
  pdf.text('Aliquota - CBS', mm(col2X), mm(y6), { width: mm(col2W) });
  pdf.text('Aliquota Efetiva - CBS', mm(col3X), mm(y6), { width: mm(col3W) });
  pdf.text('Valor Total Apurado - CBS', mm(col4X), mm(y6), { width: mm(col4W) });

  const y7 = y6 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(ibs.vIBSTot, mm(col1X), mm(y7), { width: mm(col1W) });
  pdf.text(ibs.pCBS, mm(col2X), mm(y7), { width: mm(col2W) });
  pdf.text(ibs.pAliqEfetCBS, mm(col3X), mm(y7), { width: mm(col3W) });
  pdf.text(ibs.vCBS, mm(col4X), mm(y7), { width: mm(col4W) });

  pdf.y = mm(y7 + 7);
}
