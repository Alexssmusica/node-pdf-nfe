"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCobr = void 0;
function getCobr(cobr) {
    if (cobr === undefined) {
        return undefined;
    }
    const listDup = [];
    cobr.dup.forEach(element => {
        listDup.push({
            nDup: element.nDup,
            dVenc: element.dVenc,
            vDup: element.vDup
        });
    });
    return {
        fat: {
            nFat: cobr.fat.nFat,
            vOrig: cobr.fat.vOrig,
            vDesc: cobr.fat.vDesc,
            vLiq: cobr.fat.vLiq
        },
        dup: listDup
    };
}
exports.getCobr = getCobr;
//# sourceMappingURL=getCobr.js.map