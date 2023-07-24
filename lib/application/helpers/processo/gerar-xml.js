"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarXml = void 0;
const utils_1 = require("../utils");
const xml_1 = require("../xml");
const gerar_nfe_1 = require("./gerar-nfe");
function gerarXml(documento, geral) {
    const NFe = {
        $: {
            xmlns: 'http://www.portalfiscal.inf.br/nfe'
        },
        infNFe: (0, gerar_nfe_1.gerarNFe)({ documento, geral })
    };
    (0, utils_1.removeSelfClosedFields)(NFe);
    return {
        nfe: NFe,
        xml: (0, xml_1.serializeXml)(NFe, 'NFe')
    };
}
exports.gerarXml = gerarXml;
//# sourceMappingURL=gerar-xml.js.map