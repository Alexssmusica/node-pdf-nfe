import { NfseCoreData } from '../../../model/nfse';
import { drawBlockHeaderBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { truncateText } from '../../../shared/formatacao';
import { mm, pxToMm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

const TITULO = 'INFORMACOES COMPLEMENTARES';

const MAX_INFO_COMP = 1997;
const PIPE_SEP = ' | ';

function appendIfFilled(parts: string[], label: string, value: string | undefined): void {
  if (!value || !String(value).trim()) return;
  parts.push(`${label}: ${String(value).trim()}`);
}

function montarTotaisAproximados(data: NfseCoreData): string {
  if (data.valores.valorTotalTributos) {
    const fed = data.valores.valorTotalTributos?.totalTributosFederais || 'R$ 0,00';
    const est = data.valores.valorTotalTributos?.totalTributosEstaduais || 'R$ 0,00';
    const mun = data.valores.valorTotalTributos?.totalTributosMunicipais || 'R$ 0,00';
    return `Totais Aproximados dos Tributos cfe. Lei nº 12.741/2012: Federais: ${fed} ; Estaduais: ${est} ; Municipais: ${mun}`;
  }
  if (data.valores.porcentagemTotalTributos) {
    const fed = data.valores.porcentagemTotalTributos?.porcentagemTotalTributosFederais || '0,00%';
    const est = data.valores.porcentagemTotalTributos?.porcentagemTotalTributosEstaduais || '0,00%';
    const mun = data.valores.porcentagemTotalTributos?.porcentagemTotalTributosMunicipais || '0,00%';
    return `Totais Aproximados dos Tributos cfe. Lei nº 12.741/2012: Federais: ${fed} ; Estaduais: ${est} ; Municipais: ${mun}`;
  }
  return '';
}

export function renderInformacoesComplementares(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const { col1X } = LAYOUT_CONSTANTS.columns;
  const { blockLabel, content } = LAYOUT_CONSTANTS.fontSizes;
  const extras = data.extras;
  const serv = data.servico;

  const y0 = pxToMm(pdf.y - 8);

  drawBlockHeaderBackground(pdf, y0);

  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.text(TITULO, mm(col1X), mm(y0), { width: mm(LAYOUT_CONSTANTS.contentWidthMm) });

  const parts: string[] = [];
  appendIfFilled(parts, 'Inf. Cont.', serv.infoComp);
  appendIfFilled(parts, 'NFS-e Subst.', extras.chSubstda);
  appendIfFilled(parts, 'Doc. Ref.', extras.docRef);
  appendIfFilled(parts, 'Cod. Obra', extras.cObra);
  appendIfFilled(parts, 'Insc. Imob.', extras.inscImobFisc);
  appendIfFilled(parts, 'Cod. Evt.', extras.idAtvEvt);
  appendIfFilled(parts, 'Doc. Tec.', extras.idDocTec);
  appendIfFilled(parts, 'Num. Ped.', extras.xPed);
  appendIfFilled(parts, 'Item Ped.', extras.xItemPed);
  appendIfFilled(parts, 'Inf. A. T. Mun.', extras.xOutInf);
  if (serv.nbs) appendIfFilled(parts, 'NBS', serv.nbs);

  const totaisLinha = montarTotaisAproximados(data);
  let textoInfo = parts.join(PIPE_SEP);
  if (textoInfo.length > MAX_INFO_COMP) {
    textoInfo = truncateText(textoInfo, MAX_INFO_COMP);
  }

  const conteudoFinal = textoInfo ? `${textoInfo}\n${totaisLinha}` : totaisLinha;

  const y1 = y0 + 3.5;
  pdf.font(font).fontSize(content);
  pdf.text(conteudoFinal, mm(col1X), mm(y1), {
    width: mm(LAYOUT_CONSTANTS.contentWidthMm),
    align: 'left'
  });

  pdf.moveDown(0.5);
}
