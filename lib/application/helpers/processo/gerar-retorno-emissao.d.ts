import { type ProtNFe } from '../../../domain/contracts/repos';
import { type RetornoNF } from '../../../domain/contracts/repos/retorno';
type GerarRetornoEmissaoInput = {
    success: boolean;
    xml_enviado: string;
    xml_recebido: string;
    xMotivo: string;
    protNFe: ProtNFe;
};
export declare function gerarRetornoEmissao({ success, protNFe, xml_enviado, xml_recebido, xMotivo }: GerarRetornoEmissaoInput): Promise<RetornoNF>;
export {};
