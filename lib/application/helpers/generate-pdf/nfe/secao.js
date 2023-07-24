"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secao = void 0;
const default_1 = require("./default");
function secao({ ajusteX, ajusteY, doc, largura, margemEsquerda, margemTopo, value, x, y, tamanho }) {
    x = margemEsquerda + ajusteX + x;
    y = margemTopo + ajusteY + y;
    doc.font('negrito')
        .fillColor(default_1.DEFAULT_NFE.corDaSecao)
        .fontSize(tamanho ?? default_1.DEFAULT_NFE.tamanhoDaFonteDaSecao)
        .text(value.toUpperCase(), x, y, {
        width: largura,
        align: 'left'
    });
}
exports.secao = secao;
//# sourceMappingURL=secao.js.map