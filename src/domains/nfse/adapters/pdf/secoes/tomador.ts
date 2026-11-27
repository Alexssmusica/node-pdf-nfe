import { NfseCoreData, PessoaData } from '../../../model/nfse';
import { renderPessoaBlock, renderPessoaSuppressed } from './pessoa-renderer';

const TITULO = 'TOMADOR / ADQUIRENTE';
const TEXTO_NAO_IDENTIFICADO = 'TOMADOR/ADQUIRENTE DA OPERACAO NAO IDENTIFICADO NA NFS-e';

function preencherCidadeFallback(toma: PessoaData, data: NfseCoreData): PessoaData {
  if (toma.municipio || !toma.presente) return toma;
  const fallback = data.localPrestacao && data.localPrestacao !== data.localEmissao ? data.localPrestacao : data.localEmissao;
  return { ...toma, municipio: fallback || '' };
}

export function renderTomador(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const toma = preencherCidadeFallback(data.tomador, data);

  if (!toma.presente) {
    renderPessoaSuppressed(pdf, TITULO, TEXTO_NAO_IDENTIFICADO);
    return;
  }

  renderPessoaBlock(pdf, toma, { blockTitle: TITULO, showInscricaoMunicipal: true }, font);
}
