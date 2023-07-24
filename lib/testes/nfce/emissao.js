"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../main/config/module-alias");
const dados_1 = require("./dados");
const __1 = require("../../");
const util_1 = require("util");
async function emissaoNFCe() {
    const ini = new Date();
    const result = await (0, __1.emitir)({ documento: dados_1.nfce, configuracoes: dados_1.configuracoes });
    const fin = new Date();
    console.log(`${(fin.getTime() - ini.getTime()) / 1000}s`);
    const response = (0, util_1.inspect)(result, false, null);
    console.log('Resultado Emissão NFC-e: \n\n' + response);
}
void emissaoNFCe();
//# sourceMappingURL=emissao.js.map