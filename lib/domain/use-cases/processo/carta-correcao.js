"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartaCorrecao = void 0;
require("../../../main/config/module-alias");
const gerar_evento_1 = require("./gerar-evento");
const utils_1 = require("../utils");
async function cartaCorrecao({ chNFe, configuracoes, nProt, xCorrecao, nSeqEvento }) {
    if (configuracoes.geral.modelo === '65') {
        throw new Error('NFCE não pode emitir carta de correção');
    }
    const cOrgao = chNFe.substring(0, 2);
    const CNPJ = chNFe.substring(6, 20);
    const evento = {
        cOrgao,
        tpAmbiente: configuracoes.geral.ambiente,
        CNPJ,
        chNFe,
        dhEvento: (0, utils_1.getDataAtual)(),
        tpEvento: '110110',
        nSeqEvento,
        versaoEvento: '1.00',
        detEvento: {
            descEvento: 'CARTA DE CORRECAO',
            nProt,
            xCorrecao
        }
    };
    return await (0, gerar_evento_1.gerarEvento)(cOrgao, CNPJ, evento, configuracoes);
}
exports.cartaCorrecao = cartaCorrecao;
//# sourceMappingURL=carta-correcao.js.map