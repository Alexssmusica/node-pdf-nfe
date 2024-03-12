"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../main/config/module-alias");
const dados_1 = require("./dados");
const util_1 = require("util");
const __1 = require("../..");
async function solicitaCancelemnto(configuracoes) {
    const result = await (0, __1.cancelar)({
        chNFe: '35230534337001000148550010000000341287677488',
        nProt: '135230001956378',
        xJust: 'TESTE DE CANCELAMENTO',
        configuracoes
    });
    const response = (0, util_1.inspect)(result, false, null);
    console.log('Resultado Cancelamento NFC-e: \n\n' + response);
}
void solicitaCancelemnto(dados_1.configuracoes);
//# sourceMappingURL=cancelamento.js.map