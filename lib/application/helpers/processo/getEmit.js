"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmit = void 0;
function getEmit(emit) {
    return {
        CNPJ: emit.CNPJ,
        xNome: emit.xNome,
        xFant: emit.xFant,
        enderEmit: {
            xLgr: emit.enderEmit.xLgr,
            nro: emit.enderEmit.nro,
            xCpl: emit.enderEmit.xCpl,
            xBairro: emit.enderEmit.xBairro,
            cMun: emit.enderEmit.cMun,
            xMun: emit.enderEmit.xMun,
            UF: emit.enderEmit.UF,
            CEP: emit.enderEmit.CEP,
            cPais: emit.enderEmit.cPais ?? '1058',
            cPaisSpecified: emit.enderEmit.cPaisSpecified,
            xPais: emit.enderEmit.xPais ?? 'BRASIL',
            xPaisSpecified: emit.enderEmit.cPaisSpecified,
            fone: emit.enderEmit.fone
        },
        fone: emit.fone,
        IE: emit.IE,
        iEST: emit.iEST,
        IM: emit.IM,
        CNAE: emit.CNAE,
        CRT: emit.CRT
    };
}
exports.getEmit = getEmit;
//# sourceMappingURL=getEmit.js.map