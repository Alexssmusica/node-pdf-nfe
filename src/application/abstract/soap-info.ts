import { type SoapInfo, type InfoQRCodeByUF, ServicosSefaz } from '../../domain/contracts/repos';
import { validaUrlWsdl } from '../../application/helpers/utils';
import * as servicos from '../../application/helpers/urls/servicos.json';
import { getContentType } from '../../main/webservices/functions';

export abstract class SoapAbsctract {
    static getAutorizadorByUF(uf: string): any | undefined {
        return undefined;
    }

    static getAutorizadorContingenciaByUF(uf: string): any | undefined {
        return undefined;
    }

    static getInfoQRCodeByUF({ uf, amb }: InfoQRCodeByUF.Input): InfoQRCodeByUF.Output | undefined {
        return undefined;
    }

    static getSoapInfo({ uf, amb, modelo, servicoSefaz, isContingencia = false }: SoapInfo.Input): SoapInfo.Output {
        if (isContingencia && modelo === '65') {
            throw new Error('Contingencia não desenvolvida para NFCE');
        }

        const autorizador = isContingencia 
            ? this.getAutorizadorContingenciaByUF(uf) 
            : this.getAutorizadorByUF(uf);

        const url = amb === '1' 
            ? validaUrlWsdl(autorizador.servicos[servicoSefaz].url_producao) 
            : validaUrlWsdl(autorizador.servicos[servicoSefaz].url_homologacao);

        let soap: SoapInfo.Output = {
            url,
            contentType: getContentType(uf),
            method: servicos[servicoSefaz].method,
            action: servicos[servicoSefaz].action
        };

        if (servicoSefaz === ServicosSefaz.autorizacao && modelo === '65') {
            const infoQRCode = this.getInfoQRCodeByUF({ uf, amb });
            soap = {
                ...soap,
                urlQRCode: infoQRCode?.urlQRCode,
                urlChave: infoQRCode?.urlChave
            };
        }

        return soap;
    }
}
