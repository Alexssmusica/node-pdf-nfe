import { type NFeProc } from './nfe-proc';
import { type procEventoNFe } from './proc-evento';
import { type procInutNFe } from './proc-inut';
export interface RetornoStatusServico {
    xml_enviado: string;
    xml_recebido: string;
    status: string;
    mensagem: string;
}
interface Retorno {
    xml_enviado: string;
    xml_recebido: string;
    success: boolean;
    xml_completo: string;
    mensagem: string;
}
export type RetornoNF = Retorno & {
    nfeProc: NFeProc;
};
export type RetornoEvento = Retorno & {
    procEventoNFe: procEventoNFe;
};
export type RetornoInutNFe = Retorno & {
    procInutNFe: procInutNFe;
};

