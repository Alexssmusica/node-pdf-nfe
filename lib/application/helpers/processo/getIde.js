"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIde = void 0;
const utils_1 = require("../../../domain/use-cases/utils");
const utils_2 = require("../utils");
function getIde(geral, ide, dadosChave) {
    if (geral.modelo === '65' && (ide.tpEmis === undefined)) {
        ide.tpEmis = '9';
    }
    return {
        cUF: ide.cUF,
        cNF: dadosChave.cnf,
        natOp: ide.natOp,
        mod: geral.modelo,
        serie: ide.serie,
        nNF: ide.nNF,
        dhEmi: (0, utils_2.hasValue)(ide.dhEmi) ? ide.dhEmi : (0, utils_1.getDataAtual)(),
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
exports.getIde = getIde;
//# sourceMappingURL=getIde.js.map