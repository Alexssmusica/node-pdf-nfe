import { type SoapInfo, type InfoQRCodeByUF } from '../../domain/contracts/repos';
export declare abstract class SoapAbsctract {
    static getAutorizadorByUF(uf: string): any | undefined;
    static getAutorizadorContingenciaByUF(uf: string): any | undefined;
    static getInfoQRCodeByUF({ uf, amb }: InfoQRCodeByUF.Input): InfoQRCodeByUF.Output | undefined;
    static getSoapInfo({ uf, amb, modelo, servicoSefaz, isContingencia }: SoapInfo.Input): SoapInfo.Output;
}
