"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuraUrlsSefaz = void 0;
const sefazNfce_1 = require("../../../main/webservices/sefazNfce");
const sefazNfe_1 = require("../../../main/webservices/sefazNfe");
const ibge_code_to_uf_1 = require("../../../domain/use-cases/utils/ibge-code-to-uf");
function configuraUrlsSefaz(cUf, configuracoes, servicoSefaz) {
    const { geral: { modelo, ambiente } } = configuracoes;
    const uf = (0, ibge_code_to_uf_1.getUf)(cUf);
    const input = {
        uf,
        amb: ambiente,
        modelo,
        isContingencia: false,
        servicoSefaz
    };
    if (modelo === '65') {
        return sefazNfce_1.SefazNFCe.getSoapInfo(input);
    }
    else {
        return sefazNfe_1.SefazNFe.getSoapInfo(input);
    }
}
exports.configuraUrlsSefaz = configuraUrlsSefaz;
//# sourceMappingURL=configura-urls-sefaz.js.map