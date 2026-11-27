import type {
  TNFeInfNFeCobr,
  TNFeInfNFeDest,
  TNFeInfNFeDet,
  TNFeInfNFeEmit,
  TNFeInfNFeIde,
  TNFeInfNFeInfAdic,
  TNFeInfNFePag,
  TNFeInfNFeTotal,
  TNFeInfNFeTransp
} from './schema';
export interface NFe {
  $: {
    versao: string;
    xmlns: string;
  };
  infNFe: {
    ide: TNFeInfNFeIde;
    emit: TNFeInfNFeEmit;
    dest: TNFeInfNFeDest;
    det: TNFeInfNFeDet[];
    total: TNFeInfNFeTotal;
    transp: TNFeInfNFeTransp;
    cobr?: TNFeInfNFeCobr;
    pag: TNFeInfNFePag;
    infAdic: TNFeInfNFeInfAdic;
  };
  infNFeSupl?: {
    qrCode: string;
    urlChave: string;
  };
}
export interface ProtNFe {
  infProt: {
    tpAmb: string;
    verAplic: string;
    chNFe: string;
    dhRecbto: string;
    nProt: string;
    digVal: string;
    cStat: string;
    xMotivo: string;
  };
}
export interface NFeProc {
  $: {
    versao: string;
    xmlns: string;
  };
  NFe: NFe;
  protNFe: ProtNFe;
}
