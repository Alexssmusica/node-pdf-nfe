"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataAtual = void 0;
const date_fns_1 = require("date-fns");
const pt_BR_1 = __importDefault(require("date-fns/locale/pt-BR"));
function getDataAtual() {
    return (0, date_fns_1.format)(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx", { locale: pt_BR_1.default });
}
exports.getDataAtual = getDataAtual;
//# sourceMappingURL=data-atual.js.map