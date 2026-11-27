import { NfseCoreData } from '../../../model/nfse';
import { renderPessoaBlock, renderPessoaSuppressed } from './pessoa-renderer';

const TITULO = 'INTERMEDIARIO DA OPERACAO';
const TEXTO_NAO_IDENTIFICADO = 'INTERMEDIARIO DA OPERACAO NAO IDENTIFICADO NA NFS-e';

export function renderIntermediario(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const interm = data.intermediario;

  if (!interm.presente) {
    renderPessoaSuppressed(pdf, TITULO, TEXTO_NAO_IDENTIFICADO);
    return;
  }

  renderPessoaBlock(pdf, interm, { blockTitle: TITULO, showInscricaoMunicipal: true }, font);
}
