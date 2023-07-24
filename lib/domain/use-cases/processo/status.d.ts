import '../../../main/config/module-alias';
import { type Configuracoes, type TCodUfIbge } from '../../../domain/contracts/repos';
import { type RetornoStatusServico } from '../../../domain/contracts/repos/retorno';
export declare function statusServico(configuracoes: Configuracoes, cUf: TCodUfIbge): Promise<RetornoStatusServico>;
