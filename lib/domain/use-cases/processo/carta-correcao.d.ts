import '../../../main/config/module-alias';
import { type Configuracoes } from '../../../domain/contracts/repos';
import { type RetornoEvento } from '../../../domain/contracts/repos/retorno';
type CartaCorrecaoInput = {
    nProt: string;
    chNFe: string;
    nSeqEvento: string;
    xCorrecao: string;
    configuracoes: Configuracoes;
};
export declare function cartaCorrecao({ chNFe, configuracoes, nProt, xCorrecao, nSeqEvento }: CartaCorrecaoInput): Promise<RetornoEvento>;
export {};
