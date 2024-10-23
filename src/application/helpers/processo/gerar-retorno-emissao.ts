import { type ProtNFe } from '../../../domain/contracts/repos';
import { type RetornoNF } from '../../../domain/contracts/repos/retorno';
import { removeSelfClosedFields } from '../utils';
import { deserializeXml, serializeXml } from '../xml';

type GerarRetornoEmissaoInput = {
    success: boolean;
    xml_enviado: string;
    xml_recebido: string;
    xMotivo: string;
    protNFe: ProtNFe;
};

export async function gerarRetornoEmissao({
    success,
    protNFe,
    xml_enviado,
    xml_recebido,
    xMotivo,
}: GerarRetornoEmissaoInput): Promise<RetornoNF> {
    const xmlObj = await deserializeXml(xml_enviado, { explicitArray: false });
    const nfeProc = {
        $: { versao: '4.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        NFe: (xmlObj as any).enviNFe.NFe,
        protNFe,
    };

    removeSelfClosedFields(nfeProc);
    const xml_completo = serializeXml(nfeProc, 'nfeProc');

    return {
        xml_enviado,
        xml_recebido,
        nfeProc,
        success,
        xml_completo,
        mensagem: xMotivo,
    };
}
