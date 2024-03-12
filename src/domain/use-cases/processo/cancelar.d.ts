import '../../../main/config/module-alias';
import { type Configuracoes } from '../../../domain/contracts/repos';
import { type RetornoEvento } from '../../../domain/contracts/repos/retorno';
type CancelamentoInput = {
    nProt: string;
    chNFe: string;
    xJust: string;
    configuracoes: Configuracoes;
};
export declare function cancelar({ chNFe, configuracoes, nProt, xJust }: CancelamentoInput): Promise<RetornoEvento>;
export {};
