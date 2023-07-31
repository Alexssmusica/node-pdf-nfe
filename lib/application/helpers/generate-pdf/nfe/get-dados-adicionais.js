"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDadosAdicionais = void 0;
const linha_horizontal_1 = require("./linha-horizontal");
const linha_vertical_1 = require("./linha-vertical");
const normal_1 = require("./normal");
const secao_1 = require("./secao");
const titulo_1 = require("./titulo");
function getDadosAdicionais({ doc, ajusteX, ajusteY, margemEsquerda, margemTopo, margemDireita, larguraDoFormulario, infAdic, finalEspacoDet }) {
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: finalEspacoDet + 8, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 821.8, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: finalEspacoDet + 8, y2: 821.8, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: finalEspacoDet + 8, y2: 821.8, x: 388.25, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: finalEspacoDet + 8, y2: 821.8, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, secao_1.secao)({ doc, value: 'DADOS ADICIONAIS', x: 1.5, y: finalEspacoDet, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'INFORMAÇÕES COMPLEMENTARES', x: 1.5, y: finalEspacoDet + 10, largura: 385.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'RESERVADO AO FISCO', x: 390, y: finalEspacoDet + 10, largura: 195, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    const informacoesComplementares = [
        infAdic.infCpl
    ];
    (0, normal_1.normal)({ doc, value: informacoesComplementares.join(' - '), x: 1, y: finalEspacoDet + 17.5, largura: 386, alinhamento: 'justify', tamanho: 6, ajusteX, ajusteY, margemEsquerda, margemTopo });
}
exports.getDadosAdicionais = getDadosAdicionais;
//# sourceMappingURL=get-dados-adicionais.js.map