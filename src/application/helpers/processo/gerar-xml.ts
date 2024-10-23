import type { NFeBase, Geral } from '../../../domain/contracts/repos';
import { removeSelfClosedFields } from "../utils"; 
import { serializeXml } from "../xml"; 
import { gerarNFe } from "./gerar-nfe";

export function gerarXml(documento: NFeBase, geral: Geral): { nfe: any; xml: string } {
    const NFe = {
        $: {
            xmlns: 'http://www.portalfiscal.inf.br/nfe'
        },
        infNFe: gerarNFe({ documento, geral })
    };
    removeSelfClosedFields(NFe);
    return {
        nfe: NFe,
        xml: serializeXml(NFe, 'NFe')
    };
}
