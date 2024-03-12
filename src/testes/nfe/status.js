"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../main/config/module-alias");
const __1 = require("../../");
const dados_1 = require("./dados");
const util_1 = require("util");
async function statusVerifica() {
    const ini = new Date();
    const result = await (0, __1.statusServico)(dados_1.configuracoes, '35');
    const fin = new Date();
    console.log(`${(fin.getTime() - ini.getTime()) / 1000}s`);
    const response = (0, util_1.inspect)(result, false, null);
    console.log('Resultado Status: \n\n' + response);
}
void statusVerifica();
//# sourceMappingURL=status.js.map