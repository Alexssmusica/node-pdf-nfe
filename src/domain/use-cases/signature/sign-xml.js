"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signXml = void 0;
const xml_crypto_1 = require("xml-crypto");
function signXml(xml, tag, certificado) {
    const sig = new xml_crypto_1.SignedXml();
    sig.addReference("//*[local-name(.)='" + tag + "']", [], '', '', '', '', true);
    sig.signingKey = certificado.key;
    sig.computeSignature(xml);
    return sig.getSignedXml();
}
exports.signXml = signXml;
//# sourceMappingURL=sign-xml.js.map