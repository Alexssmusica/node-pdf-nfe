import { type Signature } from './nfe';
export interface retEvento {
    '$': {
        versao: string;
    };
    infEvento: {
        tpAmb: string;
        verAplic: string;
        cOrgao: string;
        cStat: string;
        xMotivo: string;
        chNFe: string;
        tpEvento: string;
        xEvento: string;
        nSeqEvento: string;
        CPFDest: string;
        emailDest: string;
        dhRegEvento: string;
        nProt: string;
    };
}
export interface Evento {
    '$': {
        versao: string;
        xmlns: string;
    };
    infEvento: {
        '$': {
            Id: string;
        };
        cOrgao: string;
        tpAmb: string;
        CNPJ: string;
        chNFe: string;
        dhEvento: string;
        tpEvento: string;
        nSeqEvento: string;
        verEvento: string;
        detEvento: {
            '$': {
                versao: string;
            };
            descEvento: string;
            nProt: string;
            xJust: string;
        };
    };
    Signature: Signature;
}
export interface procEventoNFe {
    '$': {
        versao: string;
        xmlns: string;
    };
    evento: Evento;
    retEvento: retEvento;
}
