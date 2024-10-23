import { type Signature } from './nfe';
export interface InutNFe {
    '$': {
        versao: string;
        xmlns: string;
    };
    infInut: {
        '$': {
            Id: string;
        };
        tpAmb: string;
        xServ: string;
        cUF: string;
        ano: string;
        CNPJ: string;
        mod: string;
        serie: string;
        nNFIni: string;
        nNFFin: string;
        xJust: string;
    };
    Signature: Signature;
}
export interface RetInutNFe {
    '$': {
        versao: string;
        xmlns: string;
    };
    infInut: {
        tpAmb: string;
        verAplic: string;
        cStat: string;
        xMotivo: string;
        cUF: string;
        ano: string;
        CNPJ: string;
        mod: string;
        serie: string;
        nNFIni: string;
        nNFFin: string;
        dhRecbto: string;
        nProt: string;
    };
}
export interface procInutNFe {
    '$': {
        versao: string;
        xmlns: string;
    };
    inutNFe: InutNFe;
    retInutNFe: RetInutNFe;
}
