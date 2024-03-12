"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfAdic = void 0;
function getInfAdic(inf) {
    const listObsCont = [];
    inf.obsCont.forEach(element => {
        listObsCont.push({
            xTexto: element.xTexto,
            xCampo: element.xCampo
        });
    });
    const listObsFisco = [];
    inf.obsFisco.forEach(element => {
        listObsFisco.push({
            xTexto: element.xTexto,
            xCampo: element.xCampo
        });
    });
    const listProcRef = [];
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
exports.getInfAdic = getInfAdic;
//# sourceMappingURL=getInfAdic.js.map