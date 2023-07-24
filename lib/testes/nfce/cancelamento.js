"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../main/config/module-alias");
const dados_1 = require("./dados");
const util_1 = require("util");
const __1 = require("../..");
async function solicitaCancelemnto() {
    const result = await (0, __1.cancelar)({
        chNFe: '35230434337001000148550010000000071458222950',
        nProt: '135230001515798',
        xJust: 'TESTE DE CANCELAMENTO',
        configuracoes: dados_1.configuracoes
    });
    const response = (0, util_1.inspect)(result, false, null);
    console.log('Resultado Cancelamento NFC-e: \n\n' + response);
}
void solicitaCancelemnto();
//# sourceMappingURL=cancelamento.js.map