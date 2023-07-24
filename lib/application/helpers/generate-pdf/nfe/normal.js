"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normal = void 0;
const default_1 = require("./default");
function normal({ ajusteX, ajusteY, doc, largura, margemEsquerda, margemTopo, value, x, y, alinhamento, tamanho }) {
    doc.font('normal')
        .fillColor(default_1.DEFAULT_NFE.corDoTitulo)
        .fontSize(tamanho ?? 8)
        .text(value ?? '', margemEsquerda + ajusteX + x, margemTopo + ajusteY + y, {
        width: largura,
        align: alinhamento ?? 'center',
        lineGap: -1.5
    });
}
exports.normal = normal;
//# sourceMappingURL=normal.js.map