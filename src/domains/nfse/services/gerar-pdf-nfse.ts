import { pdfNFSe } from '../adapters/pdf/pdf-nfse';
import { lerNFSe } from '../adapters/xml/ler-nfse';
import type { OpcoesPDFNFSe } from '../contracts/opcoes';

/** Gera a DANFSe (Documento Auxiliar da NFS-e, padrão nacional) a partir do XML autorizado. */
export async function gerarPDFNFSe(xmlNFSe: string, opcoes?: OpcoesPDFNFSe): Promise<PDFKit.PDFDocument> {
  return await pdfNFSe(lerNFSe(xmlNFSe), opcoes);
}
