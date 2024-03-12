"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPag = void 0;
function getPag(pag) {
    const listDetPag = [];
    pag.detPag.forEach(element => {
        listDetPag.push({
            indPag: element.indPag,
            indPagSpecified: element.indPagSpecified,
            tPag: element.tPag,
            vPag: element.vPag,
            card: element.card === undefined
                ? undefined
                : {
                    tpIntegra: element.card.tpIntegra,
                    CNPJ: element.card.CNPJ,
                    tBand: element.card.tBand,
                    tBandSpecified: element.card.tBandSpecified,
                    cAut: element.card.cAut
                },
            xPag: element.xPag
        });
    });
    return {
        detPag: listDetPag,
        vTroco: pag.vTroco
    };
}
exports.getPag = getPag;
//# sourceMappingURL=getPag.js.map