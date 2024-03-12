import '../../../main/config/module-alias';
import { type Configuracoes, type Inutilizar } from '../../../domain/contracts/repos';
import { type RetornoInutNFe } from '../../../domain/contracts/repos/retorno';
type Inutiliza = {
    configuracao: Configuracoes;
    dados: Inutilizar;
};
export declare function inutilizar(input: Inutiliza): Promise<RetornoInutNFe>;
export {};
