import '../../../main/config/module-alias';
import { type Configuracoes, type SolicitaEvento, type TCodUfIbge } from '../../../domain/contracts/repos';
import { type RetornoEvento } from '../../../domain/contracts/repos/retorno';
export declare function gerarEvento(cuf: TCodUfIbge, cnpj: string, evento: SolicitaEvento, configuracoes: Configuracoes): Promise<RetornoEvento>;
