"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLoadCertificate = void 0;
const errors_1 = require("../../domain/errors");
const node_forge_1 = __importDefault(require("node-forge"));
const fs_1 = __importDefault(require("fs"));
const setupLoadCertificate = () => input => {
    if (!fs_1.default.existsSync(input.path)) {
        throw new errors_1.CertificateNotFoundError();
    }
    const pfx = fs_1.default.readFileSync(input.path);
    const p12buffer = pfx.toString('base64');
    const asn = node_forge_1.default.asn1.fromDer(node_forge_1.default.util.decode64(p12buffer));
    let p12;
    try {
        p12 = node_forge_1.default.pkcs12.pkcs12FromAsn1(asn, true, input.password);
    }
    catch (err) {
        throw new errors_1.CertificatePasswordError();
    }
    const pem = getPem(p12);
    const data = getData(pem);
    return {
        pem,
        key: getKey(p12),
        data
    };
};
exports.setupLoadCertificate = setupLoadCertificate;
function getKey(p12) {
    const keyData = p12
        .getBags({ bagType: node_forge_1.default.pki.oids.pkcs8ShroudedKeyBag })[node_forge_1.default.pki.oids.pkcs8ShroudedKeyBag].concat(p12.getBags({ bagType: node_forge_1.default.pki.oids.keyBag })[node_forge_1.default.pki.oids.keyBag]);
    const rsaPrivateKey = node_forge_1.default.pki.privateKeyToAsn1(keyData[0].key);
    const privateKeyInfo = node_forge_1.default.pki.wrapRsaPrivateKey(rsaPrivateKey);
    const key = node_forge_1.default.pki.privateKeyInfoToPem(privateKeyInfo);
    return key;
}
function getPem(p12) {
    const certBags = p12.getBags({ bagType: node_forge_1.default.pki.oids.certBag })[node_forge_1.default.pki.oids.certBag];
    const pem = node_forge_1.default.pki.certificateToPem(certBags[0].cert);
    return pem;
}
function getData(pem) {
    const pki = node_forge_1.default.pki;
    const certificate = pki.certificateFromPem(pem);
    const values = certificate.subject.getField({ name: 'commonName' }).value.toString().split(':');
    return {
        validade: certificate.validity.notAfter,
        nome: values[0],
        cnpj: values[1]
    };
}
//# sourceMappingURL=load-certificate.js.map