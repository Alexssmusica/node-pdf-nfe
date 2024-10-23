"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.negrito = void 0;
const default_1 = require("./default");
function negrito({ ajusteX, ajusteY, doc, largura, margemEsquerda, margemTopo, value, x, y, alinhamento, tamanho }) {
    doc.font('negrito')
        .fillColor(default_1.DEFAULT_NFE.corDoTitulo)
        .fontSize(tamanho ?? 6)
        .text(value, margemEsquerda + ajusteX + x, margemTopo + ajusteY + y, {
        width: largura,
        align: alinhamento ?? 'center',
        lineGap: -1.5
    });
}
exports.negrito = negrito;
//# sourceMappingURL=negrito.js.map