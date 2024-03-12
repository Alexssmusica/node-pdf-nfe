"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendQRCodeXML = void 0;
const xml_1 = require("../xml");
const gerar_qr_code_nfce_offline_1 = require("./gerar-qr-code-nfce-offline");
const gerar_qr_code_nfce_online_1 = require("./gerar-qr-code-nfce-online");
async function appendQRCodeXML(documento, xmlAssinado, empresa, soapAutorizacao, geral) {
    let qrCode = null;
    const xmlAssinadoObj = await (0, xml_1.deserializeXml)(xmlAssinado, { explicitArray: false });
    const chave = Object(xmlAssinadoObj).NFe.infNFe.$.Id.replace('NFe', '');
    if (documento.ide.tpEmis === '9') {
        const diaEmissao = documento.ide.dhEmi.substring(8, 10);
        const valorTotal = documento.total.ICMSTot.vNF;
        const digestValue = Object(xmlAssinadoObj).NFe.Signature.SignedInfo.Reference.DigestValue;
        qrCode = (0, gerar_qr_code_nfce_offline_1.gerarQRCodeNFCeOffline)(String(soapAutorizacao.urlQRCode), chave, '2', geral.ambiente, diaEmissao, valorTotal, digestValue, empresa.idCSC, empresa.CSC);
    }
    else {
        qrCode = (0, gerar_qr_code_nfce_online_1.gerarQRCodeNFCeOnline)(String(soapAutorizacao.urlQRCode), chave, '2', geral.ambiente, empresa.idCSC, empresa.CSC);
    }
    const qrCodeObj = {
        qrCode: '<' + qrCode + '>',
        urlChave: soapAutorizacao.urlChave
    };
    const qrCodeXml = (0, xml_1.serializeXml)(qrCodeObj, 'infNFeSupl').replace('>]]>', ']]>').replace('<![CDATA[<', '<![CDATA[');
    return {
        qrCode: qrCodeObj,
        xml: xmlAssinado.replace('</infNFe><Signature', '</infNFe>' + qrCodeXml + '<Signature')
    };
}
exports.appendQRCodeXML = appendQRCodeXML;
//# sourceMappingURL=append-qrcode-xml.js.map