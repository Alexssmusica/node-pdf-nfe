"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signXmlX509 = void 0;
const xml_crypto_1 = require("xml-crypto");
function signXmlX509(xml, tag, empresa) {
    const transforms = [
        'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
        'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
    ];
    const infoProvider = (pem) => {
        return {
            getKeyInfo() {
                const cert = this.getCert();
                return `<X509Data><X509Certificate>${cert}</X509Certificate></X509Data>`;
            },
            getCert() {
                const certLines = pem.toString().split('\n');
                return certLines.filter((e, i) => i && e && e.indexOf('-----') !== 0).join('');
            }
        };
    };
    const sig = new xml_crypto_1.SignedXml();
    sig.addReference("//*[local-name(.)='" + tag + "']", transforms, '', '', '', '', false);
    sig.signingKey = empresa.key;
    sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';
    sig.keyInfoProvider = infoProvider(empresa.pem);
    sig.computeSignature(xml);
    return sig.getSignedXml();
}
exports.signXmlX509 = signXmlX509;
//# sourceMappingURL=sign-xml-x509.js.map