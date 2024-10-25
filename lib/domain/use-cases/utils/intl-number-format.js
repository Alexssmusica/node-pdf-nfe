"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = void 0;
function formatMoney(valor, decimalDigits) {
    return Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimalDigits }).format(Number(valor));
}
exports.formatMoney = formatMoney;
//# sourceMappingURL=intl-number-format.js.map