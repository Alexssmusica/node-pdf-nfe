import { pdfNFCe } from '../adapters/pdf/danfe-nfce/pdf-nfce';
import { pdfNFe } from '../adapters/pdf/danfe-nfe/pdf-nfe';
import { lerNFeProc } from '../adapters/xml/ler-nfe-proc';
import type { OpcoesPDF } from '../contracts';

/** Gera a DANFE da NF-e (modelo 55) ou o DANFE NFC-e (modelo 65) a partir do XML autorizado. */
export async function gerarPDF(xmlNFe: string, opcoes?: OpcoesPDF): Promise<PDFKit.PDFDocument> {
  const nfeProc = lerNFeProc(xmlNFe);
  if (nfeProc.NFe.infNFe.ide.mod === '55') {
    return await pdfNFe(nfeProc, opcoes);
  }
  return await pdfNFCe(nfeProc, opcoes);
}
