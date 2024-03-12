"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.italico = void 0;
const default_1 = require("./default");
function italico({ ajusteX, ajusteY, doc, largura, margemEsquerda, margemTopo, value, x, y, alinhamento, tamanho }) {
    doc.font('italico')
        .fillColor(default_1.DEFAULT_NFE.corDoTitulo)
        .fontSize(tamanho ?? 6)
        .text(value ?? '', margemEsquerda + ajusteX + x, margemTopo + ajusteY + y, {
        width: largura,
        align: alinhamento ?? 'center',
        lineGap: -1.5
    });
}
exports.italico = italico;
//# sourceMappingURL=italico.js.map