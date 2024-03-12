"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../main/config/module-alias");
const dados_1 = require("./dados");
const __1 = require("../../");
async function inutilizaNF(configuracao) {
    const dados = {
        ano: 2023,
        modelo: '55',
        numeroInicial: 5,
        numeroFinal: 5,
        serie: 1,
        xJustificativa: 'HOMOLOGACAO TESTE',
        cUf: '35',
        cnpj: '34337001000148'
    };
    const result = await (0, __1.inutilizar)({ configuracao, dados });
    console.log(result);
}
void inutilizaNF(dados_1.configuracoes);
//# sourceMappingURL=inutiliza.js.map