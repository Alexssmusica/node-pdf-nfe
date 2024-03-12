"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarQRCodeNFCeOffline = void 0;
const sha1_1 = __importDefault(require("sha1"));
function gerarQRCodeNFCeOffline(urlQRCode, chave, versaoQRCode, ambiente, diaEmissao, valorTotal, digestValue, idCSC, CSC) {
    const s = '|';
    const hexDigestValue = Buffer.from(digestValue).toString('hex');
    const concat = [chave, versaoQRCode, ambiente, diaEmissao, valorTotal, hexDigestValue, Number(idCSC)].join(s);
    const hash = (0, sha1_1.default)(concat + CSC).toUpperCase();
    return `${urlQRCode}?p=${concat}${s}${hash}`;
}
exports.gerarQRCodeNFCeOffline = gerarQRCodeNFCeOffline;
//# sourceMappingURL=gerar-qr-code-nfce-offline.js.map