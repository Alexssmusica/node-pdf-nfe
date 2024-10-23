import { randomInt } from "../utils"; 
import { serializeXml } from "../xml"; 

export function gerarXmlLote(xml: string, isAsync: boolean): string {
    const loteId: string = randomInt(1, 281474976710654).toString();
    const enviNFe = {
        $: { versao: '4.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        idLote: loteId,
        indSinc: isAsync ? '0' : '1',
        _: '[XMLS]'
    };
    const xmlLote: string = serializeXml(enviNFe, 'enviNFe');
    return xmlLote.replace('[XMLS]', xml);
}


