import type { Geral, IdeInput, TNFeInfNFeIde } from '../../../domain/contracts/repos';
import { getDataAtual } from '../../../domain/use-cases/utils';
import { hasValue } from '../utils';

export function getIde(
    geral: Geral,
    ide: IdeInput,
    dadosChave: {
        chave: string;
        dv: string;
        cnf: string;
    }
): TNFeInfNFeIde {
    if (geral.modelo === '65' && ide.tpEmis === undefined) {
        ide.tpEmis = '9';
    }

    return {
        cUF: ide.cUF,
        cNF: dadosChave.cnf,
        natOp: ide.natOp,
        mod: geral.modelo,
        serie: ide.serie,
        nNF: ide.nNF,
        dhEmi: hasValue(ide.dhEmi) ? ide.dhEmi : getDataAtual(),
        dhSaiEnt: ide.dhSaiEnt,
        tpNF: ide.tpNF,
        idDest: ide.idDest,
        cMunFG: ide.cMunFG,
        tpImp: ide.tpImp,
        tpEmis: ide.tpEmis,
        cDV: dadosChave.dv,
        tpAmb: geral.ambiente,
        finNFe: ide.finNFe,
        indFinal: ide.indFinal,
        indPres: ide.indPres,
        procEmi: ide.procEmi,
        verProc: ide.verProc,
        dhCont: ide.dhCont,
        xJust: ide.xJust,
        nFref: ide.nFref,
        indIntermed: ide.indIntermed
    };
}
