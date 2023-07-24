"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarPDF = exports.cancelar = exports.cartaCorrecao = exports.inutilizar = exports.statusServico = exports.emitir = exports.carregaCertificado = void 0;
require("./main/config/module-alias");
const load_certificate_1 = require("./domain/use-cases/load-certificate");
const carregaCertificado = (0, load_certificate_1.setupLoadCertificate)();
exports.carregaCertificado = carregaCertificado;
var emissao_1 = require("./domain/use-cases/processo/emissao");
Object.defineProperty(exports, "emitir", { enumerable: true, get: function () { return emissao_1.emitir; } });
var status_1 = require("./domain/use-cases/processo/status");
Object.defineProperty(exports, "statusServico", { enumerable: true, get: function () { return status_1.statusServico; } });
var inutiliza_1 = require("./domain/use-cases/processo/inutiliza");
Object.defineProperty(exports, "inutilizar", { enumerable: true, get: function () { return inutiliza_1.inutilizar; } });
var carta_correcao_1 = require("./domain/use-cases/processo/carta-correcao");
Object.defineProperty(exports, "cartaCorrecao", { enumerable: true, get: function () { return carta_correcao_1.cartaCorrecao; } });
var cancelar_1 = require("./domain/use-cases/processo/cancelar");
Object.defineProperty(exports, "cancelar", { enumerable: true, get: function () { return cancelar_1.cancelar; } });
var pdf_1 = require("./domain/use-cases/pdf");
Object.defineProperty(exports, "gerarPDF", { enumerable: true, get: function () { return pdf_1.gerarPDF; } });
__exportStar(require("./domain/use-cases/utils"), exports);
//# sourceMappingURL=index.js.map