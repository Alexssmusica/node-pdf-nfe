"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarRetornoEmissao = void 0;
const utils_1 = require("../utils");
const xml_1 = require("../xml");
async function gerarRetornoEmissao({ success, protNFe, xml_enviado, xml_recebido, xMotivo }) {
    const xmlObj = await (0, xml_1.deserializeXml)(xml_enviado, { explicitArray: false });
    const nfeProc = {
        $: { versao: '4.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        NFe: Object(xmlObj).enviNFe.NFe,
        protNFe
    };
    (0, utils_1.removeSelfClosedFields)(nfeProc);
    const xml_completo = (0, xml_1.serializeXml)(nfeProc, 'nfeProc');
    return {
        xml_enviado,
        xml_recebido,
        nfeProc,
        success,
        xml_completo,
        mensagem: xMotivo
    };
}
exports.gerarRetornoEmissao = gerarRetornoEmissao;
//# sourceMappingURL=gerar-retorno-emissao.js.map