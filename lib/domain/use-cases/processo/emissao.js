"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitir = void 0;
require("../../../main/config/module-alias");
const append_qrcode_xml_1 = require("../../../application/helpers/processo/append-qrcode-xml");
const gerar_xml_1 = require("../../../application/helpers/processo/gerar-xml");
const gerar_xml_lote_1 = require("../../../application/helpers/processo/gerar-xml-lote");
const utils_1 = require("../../../application/helpers/utils");
const web_service_1 = require("../../../application/helpers/web-service");
const xsd_1 = require("../../../application/helpers/xsd");
const repos_1 = require("../../../domain/contracts/repos");
const signature_1 = require("../signature");
const consulta_recibo_1 = require("./consulta-recibo");
const gerar_retorno_emissao_1 = require("../../../application/helpers/processo/gerar-retorno-emissao");
async function emitir({ documento, configuracoes }) {
    const response = await request({ documento, configuracoes });
    return await builderResponse(configuracoes, documento.emit.enderEmit.UF, response);
}
exports.emitir = emitir;
async function request({ documento, configuracoes }) {
    const soap = (0, utils_1.configuraUrlsSefaz)(documento.ide.cUF, configuracoes, repos_1.ServicosSefaz.autorizacao);
    const doc = (0, gerar_xml_1.gerarXml)(documento, configuracoes.geral);
    let xmlAssinado = (0, signature_1.signXmlX509)(doc.xml, 'infNFe', configuracoes.empresa);
    if (configuracoes.geral.modelo === '65') {
        const appendQRCode = await (0, append_qrcode_xml_1.appendQRCodeXML)(documento, xmlAssinado, configuracoes.empresa, soap, configuracoes.geral);
        xmlAssinado = appendQRCode.xml;
    }
    const xml = (0, gerar_xml_lote_1.gerarXmlLote)(xmlAssinado, false);
    await (0, xsd_1.validateEnvNfe)(xml);
    const { webProxy, empresa } = configuracoes;
    return await (0, web_service_1.makeSoapRequest)({
        xml,
        empresa,
        soap,
        webProxy
    });
}
async function builderResponse(configuracoes, uf, response) {
    let result;
    if (response.data.retEnviNFe !== undefined) {
        if (response.data.retEnviNFe.cStat === '103' && response.data.retEnviNFe.infRec.nRec !== undefined) {
            return await (0, consulta_recibo_1.consultaRecibo)(response, uf, configuracoes);
        }
        else if (response.data.retEnviNFe.cStat === '104' && response.data.retEnviNFe.protNFe.infProt.nProt !== undefined) {
            result = await (0, gerar_retorno_emissao_1.gerarRetornoEmissao)({
                protNFe: Object(response.data.retEnviNFe.protNFe),
                success: response.data.retEnviNFe.cStat === '104' && response.data.retEnviNFe.protNFe.infProt.cStat === '100',
                xml_enviado: response.xml_enviado,
                xml_recebido: response.xml_recebido,
                xMotivo: response.data.retEnviNFe.protNFe.infProt.xMotivo
            });
        }
    }
    if (result !== undefined) {
        return result;
    }
    throw new Error(`Solicitação de Envio Falhou. Segue XML Retorno: ${response.xml_recebido}`);
}
//# sourceMappingURL=emissao.js.map