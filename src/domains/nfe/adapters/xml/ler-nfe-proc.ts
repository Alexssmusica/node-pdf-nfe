import { lerXml } from '../../../../shared/xml/ler-xml';
import type { NFeProc } from '../../contracts';

function comoLista<T>(valor: T | T[]): T[] {
  return Array.isArray(valor) ? valor : [valor];
}

/** Lê o XML autorizado (nfeProc) da NF-e/NFC-e e normaliza os grupos que podem repetir. */
export function lerNFeProc(xml: string): NFeProc {
  const nfeProc = lerXml(xml)?.nfeProc as NFeProc | undefined;
  if (!nfeProc?.NFe?.infNFe) throw new Error('XML inválido: nfeProc/NFe/infNFe não encontrado');

  const infNFe = nfeProc.NFe.infNFe;
  infNFe.det = comoLista(infNFe.det);
  infNFe.pag.detPag = comoLista(infNFe.pag.detPag);
  if (infNFe.cobr?.dup !== undefined) {
    infNFe.cobr.dup = comoLista(infNFe.cobr.dup);
  }
  return nfeProc;
}
