import { deserializeXml } from '../../../application/helpers/xml';
import type { NFeProc, OpcoesPDF } from '../../../types';
import { pdfNFCe } from './pdf-NFCe';
import { pdfNFe } from './pdf-NFe';

export async function gerarPDF(xmlNFe: string, opcoes?: OpcoesPDF): Promise<PDFKit.PDFDocument> {
  const nf = await deserializeXml(xmlNFe);
  const nfeProc = nf.nfeProc as NFeProc;

  if (!(nfeProc.NFe.infNFe.det instanceof Array)) {
    nfeProc.NFe.infNFe.det = [nfeProc.NFe.infNFe.det];
  }

  if (!(nfeProc.NFe.infNFe.pag.detPag instanceof Array)) {
    nfeProc.NFe.infNFe.pag.detPag = [nfeProc.NFe.infNFe.pag.detPag];
  }

  if (nfeProc.NFe.infNFe.cobr?.dup !== undefined && !(nfeProc.NFe.infNFe.cobr?.dup instanceof Array)) {
    nfeProc.NFe.infNFe.cobr.dup = [nfeProc.NFe.infNFe.cobr?.dup];
  }

  if (nfeProc.NFe.infNFe.ide.mod === '55') {
    return await pdfNFe(nfeProc, opcoes);
  } else {
    return await pdfNFCe(nfeProc, opcoes?.pathLogo);
  }
}
