import '../../../main/config/module-alias';
import { type Configuracoes, type NFeBase } from '../../../domain/contracts/repos';
import { type RetornoNF } from '../../../domain/contracts/repos/retorno';
type Emissao = {
    documento: NFeBase;
    configuracoes: Configuracoes;
};
export declare function emitir({ documento, configuracoes }: Emissao): Promise<RetornoNF>;
export {};
