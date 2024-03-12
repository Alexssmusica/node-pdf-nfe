"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linhaHorizontal = void 0;
function linhaHorizontal({ ajusteX, ajusteY, doc, x1, x2, y, margemDireita, margemEsquerda, margemTopo, tracejada = false }) {
    y = margemTopo + ajusteY + y;
    x1 = margemEsquerda + ajusteX + x1;
    x2 = margemDireita + ajusteX + x2;
    if (tracejada) {
        doc.moveTo(x1, y).lineTo(x2, y).dash(3, { space: 5 }).stroke();
        doc.undash();
    }
    else {
        doc.moveTo(x1, y).lineTo(x2, y).stroke();
    }
}
exports.linhaHorizontal = linhaHorizontal;
//# sourceMappingURL=linha-horizontal.js.map