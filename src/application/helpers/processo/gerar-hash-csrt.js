"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarHashCSRT = void 0;
const sha1_1 = __importDefault(require("sha1"));
function gerarHashCSRT(chave, CSRT) {
    return Buffer.from((0, sha1_1.default)(CSRT + chave), 'hex').toString('base64');
}
exports.gerarHashCSRT = gerarHashCSRT;
//# sourceMappingURL=gerar-hash-csrt.js.map