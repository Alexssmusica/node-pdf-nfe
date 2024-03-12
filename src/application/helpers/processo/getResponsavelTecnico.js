"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponsavelTecnico = void 0;
function getResponsavelTecnico(responsavel) {
    if (responsavel === undefined) {
        return undefined;
    }
    return {
        CNPJ: responsavel.CNPJ,
        xContato: responsavel.xContato,
        email: responsavel.email,
        fone: responsavel.fone,
        idCSRT: responsavel.idCSRT,
        hashCSRT: responsavel.hashCSRT
    };
}
exports.getResponsavelTecnico = getResponsavelTecnico;
//# sourceMappingURL=getResponsavelTecnico.js.map