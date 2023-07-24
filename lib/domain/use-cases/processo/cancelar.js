"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelar = void 0;
require("../../../main/config/module-alias");
const gerar_evento_1 = require("./gerar-evento");
const utils_1 = require("../utils");
async function cancelar({ chNFe, configuracoes, nProt, xJust }) {
    const cOrgao = chNFe.substring(0, 2);
    const CNPJ = chNFe.substring(6, 20);
    const evento = {
        cOrgao,
        tpAmbiente: configuracoes.geral.ambiente,
        CNPJ,
        chNFe,
        dhEvento: (0, utils_1.getDataAtual)(),
        tpEvento: '110111',
        nSeqEvento: '1',
        versaoEvento: '1.00',
        detEvento: {
            descEvento: 'CANCELAMENTO',
            nProt,
            xJust
        }
    };
    return await (0, gerar_evento_1.gerarEvento)(cOrgao, CNPJ, evento, configuracoes);
}
exports.cancelar = cancelar;
//# sourceMappingURL=cancelar.js.map