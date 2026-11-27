import { NfseCoreData, PessoaData } from '../../../model/nfse';
import { renderPessoaBlock, renderPessoaSuppressed } from './pessoa-renderer';

const TITULO = 'DESTINATARIO DA OPERACAO';
const TEXTO_NAO_IDENTIFICADO = 'DESTINATARIO DA OPERACAO NAO IDENTIFICADO NA NFS-e';
const TEXTO_PROPRIO_TOMADOR = 'O DESTINATARIO E O PROPRIO TOMADOR/ADQUIRENTE DA OPERACAO';

function ehMesmaPessoa(a: PessoaData, b: PessoaData): boolean {
  if (!a.presente || !b.presente) return false;
  const docA = (a.doc || '').replace(/\D/g, '');
  const docB = (b.doc || '').replace(/\D/g, '');
  if (docA && docB) return docA === docB;
  return false;
}

export function renderDestinatario(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const dest = data.destinatario;

  if (!dest.presente) {
    renderPessoaSuppressed(pdf, TITULO, TEXTO_NAO_IDENTIFICADO);
    return;
  }

  if (ehMesmaPessoa(dest, data.tomador)) {
    renderPessoaSuppressed(pdf, TITULO, TEXTO_PROPRIO_TOMADOR);
    return;
  }

  renderPessoaBlock(pdf, dest, { blockTitle: TITULO, showInscricaoMunicipal: false }, font);
}
