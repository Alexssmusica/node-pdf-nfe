import type { SolicitaEvento, TCodUfIbge,  Configuracoes } from '../../../domain/contracts/repos';
import type {  RetornoEvento } from '../../../domain/contracts/repos/retorno';
import { gerarEvento } from './gerar-evento';
import { getDataAtual } from '../utils';

type CartaCorrecaoInput = {
    nProt: string;
    chNFe: string;
    nSeqEvento: string;
    xCorrecao: string;
    configuracoes: Configuracoes;
};

export async function cartaCorrecao({
    chNFe,
    configuracoes,
    nProt,
    xCorrecao,
    nSeqEvento
}: CartaCorrecaoInput): Promise<RetornoEvento> {
    if (configuracoes.geral.modelo === '65') {
        throw new Error('NFCE não pode emitir carta de correção');
    }

    const cOrgao = chNFe.substring(0, 2) as TCodUfIbge;
    const CNPJ = chNFe.substring(6, 20);
    const evento = {
        cOrgao,
        tpAmbiente: configuracoes.geral.ambiente,
        CNPJ,
        chNFe,
        dhEvento: getDataAtual(),
        tpEvento: '110110',
        nSeqEvento,
        versaoEvento: '1.00',
        detEvento: {
            descEvento: 'CARTA DE CORRECAO',
            nProt,
            xCorrecao
        }
    } as SolicitaEvento;

    return await gerarEvento(cOrgao, CNPJ, evento, configuracoes);
}
