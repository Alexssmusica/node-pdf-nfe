import '../../../main/config/module-alias';
import { type Configuracoes, type SoapRequest } from '../../../domain/contracts/repos';
import { type RetornoNF } from '../../../domain/contracts/repos/retorno';
export declare function consultaRecibo(response: SoapRequest.Output, uf: string, configuracoes: Configuracoes): Promise<RetornoNF>;
