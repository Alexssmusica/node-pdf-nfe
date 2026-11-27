import PDFDocument from 'pdfkit';
import type { OpcoesPDFNFSe } from '../../contracts/opcoes';
import type { NfseCoreData } from '../../model/nfse';
import { isCancelada, isSubstituida } from '../../model/situacao';
import { addHorizontalLine, drawDocumentBorder, drawWatermark } from './desenho';
import { FONT_NAMES, registerFonts } from './fontes';
import { LAYOUT_CONSTANTS } from './layout';
import { renderCanhoto } from './secoes/canhoto';
import { renderDadosNfse } from './secoes/dados-nfse';
import { renderDestinatario } from './secoes/destinatario';
import { renderEmitente } from './secoes/emitente';
import { renderHeader } from './secoes/header';
import { renderInformacoesComplementares } from './secoes/informacoes-complementares';
import { renderIntermediario } from './secoes/intermediario';
import { renderServico } from './secoes/servico';
import { renderTomador } from './secoes/tomador';
import { devePrintarTributacaoFederal, renderTributacaoFederal } from './secoes/tributacao-federal';
import { renderTributacaoIbsCbs } from './secoes/tributacao-ibs-cbs';
import { renderTributacaoMunicipal } from './secoes/tributacao-municipal';
import { renderValores } from './secoes/valores';
import { mm } from './unidades';

/** Desenha a DANFSe v2.0 (NT 008) em uma página A4. */
export async function pdfNFSe(data: NfseCoreData, opcoes: OpcoesPDFNFSe = {}): Promise<PDFKit.PDFDocument> {
  const { margin, pageWidthMm: pageWidth, pageHeightMm: pageHeight } = LAYOUT_CONSTANTS;
  const font = FONT_NAMES.content;
  const pdf = new PDFDocument({
    size: [mm(pageWidth), mm(pageHeight)],
    margins: { top: mm(margin), right: mm(margin), bottom: mm(margin), left: mm(margin) }
  });
  pdf.info.Subject = 'Documento Auxiliar da NFS-e';
  registerFonts(pdf);
  pdf.font(font).fontSize(LAYOUT_CONSTANTS.fontSizes.content);

  const separador = (): void => addHorizontalLine(pdf, pageWidth, margin);

  renderHeader(pdf, opcoes.municipio ?? {}, data, margin);
  separador();
  await renderDadosNfse(pdf, data, font);
  separador();
  renderEmitente(pdf, data, font);
  separador();
  renderTomador(pdf, data, font);
  separador();
  renderDestinatario(pdf, data, font);
  separador();
  renderIntermediario(pdf, data, font);
  separador();
  renderServico(pdf, data, font);
  separador();
  renderTributacaoMunicipal(pdf, data, font);
  separador();
  if (devePrintarTributacaoFederal(data)) {
    renderTributacaoFederal(pdf, data, font);
    separador();
  }
  renderTributacaoIbsCbs(pdf, data, font);
  separador();
  renderValores(pdf, data, font);
  separador();
  renderInformacoesComplementares(pdf, data, font);
  if (opcoes.incluirCanhoto ?? true) {
    renderCanhoto(pdf, data, font);
  }
  drawDocumentBorder(pdf, pageWidth, pageHeight, margin);

  if (isCancelada(data.cStat)) {
    drawWatermark(pdf, 'CANCELADA');
  } else if (isSubstituida(data.cStat, data.extras.chSubstda)) {
    drawWatermark(pdf, 'SUBSTITUIDA');
  }

  if (!opcoes.notEndDocument) pdf.end();
  return pdf;
}
