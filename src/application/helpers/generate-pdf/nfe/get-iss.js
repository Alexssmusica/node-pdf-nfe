"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIss = void 0;
const linha_horizontal_1 = require("./linha-horizontal");
const linha_vertical_1 = require("./linha-vertical");
const titulo_1 = require("./titulo");
const campo_1 = require("./campo");
const secao_1 = require("./secao");
function getIss({ y, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo, larguraDoFormulario, emit, total }) {
    if (total.ISSQNtot?.vServ !== undefined ||
        total.ISSQNtot?.vBC !== undefined ||
        total.ISSQNtot?.vISS !== undefined) {
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 762.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 782.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: 136.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: (136.1 * 2) - 0.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: (136.1 * 3) - 0.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, secao_1.secao)({ doc, value: 'CÁLCULO DO ISSQN', x: 1.5, y: 754.5, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'INSCRIÇÃO MUNICIPAL', x: 1.5, y: 763, largura: 132.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: emit.IE, x: 1.5, y: 771, largura: 132.5, alinhamento: 'left', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR TOTAL DOS SERVIÇOS', x: 137.5, y: 763, largura: 132.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: total.ISSQNtot?.vServ ?? '', x: 137.5, y: 771, largura: 132.5, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'BASE DE CÁLCULO DO ISSQN', x: 273.5, y: 763, largura: 132.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: total.ISSQNtot?.vBC ?? '', x: 273.5, y: 771, largura: 132.5, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR TOTAL DO ISSQN', x: 409.5, y: 763, largura: 175.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: total.ISSQNtot?.vServ ?? '', x: 409.5, y: 771, largura: 175.5, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    }
    return doc.y;
}
exports.getIss = getIss;
//# sourceMappingURL=get-iss.js.map