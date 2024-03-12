"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linhaVertical = void 0;
function linhaVertical({ ajusteX, ajusteY, doc, margemEsquerda, margemTopo, x, y1, y2 }) {
    x = margemEsquerda + ajusteX + x;
    y1 = margemTopo + ajusteY + y1;
    y2 = margemTopo + ajusteY + y2;
    doc.moveTo(x, y1).lineTo(x, y2).stroke();
}
exports.linhaVertical = linhaVertical;
//# sourceMappingURL=linha-vertical.js.map