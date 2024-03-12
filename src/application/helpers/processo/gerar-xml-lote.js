"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarXmlLote = void 0;
const utils_1 = require("../utils");
const xml_1 = require("../xml");
function gerarXmlLote(xml, isAsync) {
    const loteId = (0, utils_1.randomInt)(1, 281474976710654).toString();
    const enviNFe = {
        $: { versao: '4.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        idLote: loteId,
        indSinc: isAsync ? '0' : '1',
        _: '[XMLS]'
    };
    const xmlLote = (0, xml_1.serializeXml)(enviNFe, 'enviNFe');
    return xmlLote.replace('[XMLS]', xml);
}
exports.gerarXmlLote = gerarXmlLote;
//# sourceMappingURL=gerar-xml-lote.js.map