"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarChaveNF = void 0;
const utils_1 = require("../utils");
const obter_digito_verificador_1 = require("./obter-digito-verificador");
function gerarChaveNF(cnpj, docFiscal) {
    let chave = '';
    const ano = docFiscal.dhEmi.substring(2, 4);
    const mes = docFiscal.dhEmi.substring(5, 7);
    chave += (docFiscal.cUF.padStart(2, '0'));
    chave += (ano + mes);
    chave += (cnpj.padStart(14, '0'));
    chave += (docFiscal.mod.padStart(2, '0'));
    chave += (docFiscal.serie.padStart(3, '0'));
    chave += (docFiscal.nNF.toString().padStart(9, '0'));
    chave += (docFiscal.tpEmis);
    const cnf = ((0, utils_1.randomInt)(10000000, 99999999)).toString();
    chave += cnf;
    const digitoVerificador = (0, obter_digito_verificador_1.obterDigitoVerificador)(chave);
    chave += digitoVerificador;
    return {
        chave,
        cnf,
        dv: digitoVerificador
    };
}
exports.gerarChaveNF = gerarChaveNF;
//# sourceMappingURL=gerar-chave-nfe.js.map