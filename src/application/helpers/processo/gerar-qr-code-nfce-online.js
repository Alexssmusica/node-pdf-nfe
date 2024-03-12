"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarQRCodeNFCeOnline = void 0;
const sha1_1 = __importDefault(require("sha1"));
function gerarQRCodeNFCeOnline(urlQRCode, chave, versaoQRCode, ambiente, idCSC, CSC) {
    const s = '|';
    const concat = [chave, versaoQRCode, ambiente, Number(idCSC)].join(s);
    const hash = (0, sha1_1.default)(concat + CSC).toUpperCase();
    return `${urlQRCode}?p=${concat}${s}${hash}`;
}
exports.gerarQRCodeNFCeOnline = gerarQRCodeNFCeOnline;
//# sourceMappingURL=gerar-qr-code-nfce-online.js.map