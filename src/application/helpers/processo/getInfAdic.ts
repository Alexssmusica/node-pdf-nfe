import type { TNFeInfNFeInfAdicObs,  TNFeInfNFeInfAdic, TNFeInfNFeInfAdicProcRef } from '../../../domain/contracts/repos';

export function getInfAdic(inf: TNFeInfNFeInfAdic): TNFeInfNFeInfAdic {
    const listObsCont: TNFeInfNFeInfAdicObs[] = [];
    inf.obsCont.forEach(element => {
        listObsCont.push({
            xTexto: element.xTexto,
            xCampo: element.xCampo
        });
    });

    const listObsFisco: TNFeInfNFeInfAdicObs[] = [];
    inf.obsFisco.forEach(element => {
        listObsFisco.push({
            xTexto: element.xTexto,
            xCampo: element.xCampo
        });
    });

    const listProcRef: TNFeInfNFeInfAdicProcRef[] = [];
    inf.procRef.forEach(element => {
        listProcRef.push({
            nProc: element.nProc,
            indProc: element.indProc
        });
    });

    return {
        infAdFisco: inf.infAdFisco,
        infCpl: inf.infCpl,
        obsCont: listObsCont,
        obsFisco: listObsFisco,
        procRef: listProcRef
    };
}
