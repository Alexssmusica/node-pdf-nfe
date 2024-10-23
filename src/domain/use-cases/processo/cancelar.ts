import type { SolicitaEvento, TCodUfIbge,  Configuracoes } from '../../../domain/contracts/repos';
import type { RetornoEvento } from '../../../domain/contracts/repos/retorno';
import {getDataAtual} from '../utils'
import { gerarEvento} from './gerar-evento'

type CancelamentoInput = {
    nProt: string;
    chNFe: string;
    xJust: string;
    configuracoes: Configuracoes;
};

export async function cancelar({ chNFe, configuracoes, nProt, xJust }: CancelamentoInput): Promise<RetornoEvento> {
    const cOrgao = chNFe.substring(0, 2) as TCodUfIbge;
    const CNPJ = chNFe.substring(6, 20);
    const evento = {
        cOrgao,
        tpAmbiente: configuracoes.geral.ambiente,
        CNPJ,
        chNFe,
        dhEvento: getDataAtual(),
        tpEvento: '110111',
        nSeqEvento: '1',
        versaoEvento: '1.00',
        detEvento: {
            descEvento: 'CANCELAMENTO',
            nProt,
            xJust
        }
    } as SolicitaEvento;
    return await gerarEvento(cOrgao, CNPJ, evento, configuracoes);
}
