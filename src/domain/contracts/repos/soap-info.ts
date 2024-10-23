import { type ServicosSefaz } from './nfe';
import { type Tmod } from './schema';
export declare namespace SoapInfo {
    type Input = {
        uf: string;
        amb: string;
        servicoSefaz: ServicosSefaz;
        isContingencia: boolean;
        modelo: Tmod;
    };
    type Output = {
        url: string;
        urlQRCode?: string;
        urlChave?: string;
        contentType: string;
        method: string;
        action: string;
    };
}


