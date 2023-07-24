import { type Empresa } from '.';
import { type SoapInfo } from './soap-info';
import { type WebProxy } from './web-proxy';
export declare namespace SoapRequest {
    type Input = {
        xml: string;
        empresa: Empresa;
        soap: SoapInfo.Output;
        webProxy?: WebProxy;
    };
    type Output = {
        xml_enviado: string;
        xml_recebido: string;
        data: any;
    };
}
