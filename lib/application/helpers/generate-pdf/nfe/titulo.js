"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titulo = void 0;
const default_1 = require("./default");
function titulo({ doc, largura, value, x, y, margemEsquerda, margemTopo, ajusteX, ajusteY, alinhamento, tamanho }) {
    x = margemEsquerda + ajusteX + x;
    y = margemTopo + ajusteY + y;
    doc.font('normal')
        .fillColor(default_1.DEFAULT_NFE.corDoTitulo)
        .fontSize(tamanho ?? default_1.DEFAULT_NFE.tamanhoDaFonteDoTitulo)
        .text(value.toUpperCase(), x, y, {
        width: largura,
        align: alinhamento ?? default_1.DEFAULT_NFE.alinhamentoDoTitulo
    });
}
exports.titulo = titulo;
//# sourceMappingURL=titulo.js.map