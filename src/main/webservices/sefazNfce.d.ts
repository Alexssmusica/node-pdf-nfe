import { type InfoQRCodeByUF } from '../../domain/contracts/repos';
import { SoapAbsctract } from '../../application/abstract/soap-info';
export declare class SefazNFCe extends SoapAbsctract {
    static getAutorizadorByUF(uf: string): any;
    static getInfoQRCodeByUF({ uf, amb }: InfoQRCodeByUF.Input): InfoQRCodeByUF.Output;
}
