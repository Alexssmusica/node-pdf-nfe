import { type TNFeInfNFe, type NFeNFCe } from '../../../domain/contracts/repos';
import { getDet } from './det';
import { gerarChaveNF } from './gerar-chave-nfe';
import { getDest } from './getDest';
import { getIde } from './getIde';
import { getEmit } from './getEmit';
import { getTotal } from './getTotal';
import { getTransp } from './getTransp';
import { getCobr } from './getCobr';
import { getPag } from './getPag';
import { getInfAdic } from './getInfAdic';
import { getDataAtual } from '../../../domain/use-cases/utils';
import { getResponsavelTecnico } from './getResponsavelTecnico';


export function gerarNFe({ documento, geral }: NFeNFCe.Input): TNFeInfNFe {
    const dadosChave = gerarChaveNF(documento.emit.CNPJ, {
        cUF: documento.ide.cUF,
        dhEmi: getDataAtual(),
        mod: geral.modelo,
        serie: documento.ide.serie,
        nNF: documento.ide.nNF,
        tpEmis: documento.ide.tpEmis
    });

    const nfe: TNFeInfNFe = {
        $: { versao: '4.00', Id: `NFe${dadosChave.chave}` },
        ide: getIde(geral, documento.ide, dadosChave),
        emit: getEmit(documento.emit),
        dest: getDest(documento.dest, geral.ambiente),
        det: getDet(documento.det_list, geral.ambiente, geral.modelo),
        total: getTotal(documento.total),
        transp: getTransp(documento.transp),
        cobr: getCobr(documento.cobr),
        pag: getPag(documento.pag),
        infAdic: getInfAdic(documento.infAdic),
        infRespTec: getResponsavelTecnico(documento.infRespTec)
    };

    return nfe;
}
