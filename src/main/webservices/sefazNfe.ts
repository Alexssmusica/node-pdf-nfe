import { SoapAbsctract } from '../../application/abstract/soap-info';
import * as autorizadores from '../../application/helpers/urls/autorizadoresNFe.json';

export class SefazNFe extends SoapAbsctract {
    static getAutorizadorByUF(uf: string): any {
        switch (uf) {
            case 'AM':
                return autorizadores.AM;
            case 'BA':
                return autorizadores.BA;
            case 'CE':
                return autorizadores.CE;
            case 'GO':
                return autorizadores.GO;
            case 'MG':
                return autorizadores.MG;
            case 'MS':
                return autorizadores.MS;
            case 'MT':
                return autorizadores.MT;
            case 'PE':
                return autorizadores.PE;
            case 'PR':
                return autorizadores.PR;
            case 'RS':
                return autorizadores.RS;
            case 'SP':
                return autorizadores.SP;
            case 'MA':
            case 'PA':
                return autorizadores.SVAN;
            case 'AC':
            case 'AL':
            case 'AP':
            case 'DF':
            case 'ES':
            case 'PB':
            case 'PI':
            case 'RJ':
            case 'RN':
            case 'RO':
            case 'RR':
            case 'SC':
            case 'SE':
            case 'TO':
                return autorizadores.SVRS;
            default:
                throw new Error('Autorizador não encontrado!');
        }
    }

    static getAutorizadorContingenciaByUF(uf: string): any {
        switch (uf) {
            case 'AC':
            case 'AL':
            case 'AP':
            case 'DF':
            case 'ES':
            case 'MG':
            case 'PB':
            case 'RJ':
            case 'RN':
            case 'RO':
            case 'RR':
            case 'RS':
            case 'SC':
            case 'SE':
            case 'SP':
            case 'TO':
                return autorizadores['SVC-AN'];
            case 'AM':
            case 'BA':
            case 'CE':
            case 'GO':
            case 'MA':
            case 'MS':
            case 'MT':
            case 'PA':
            case 'PE':
            case 'PI':
            case 'PR':
                return autorizadores['SVC-RS'];
            default:
                throw new Error('Autorizador de Contingência não encontrado!');
        }
    }
}
