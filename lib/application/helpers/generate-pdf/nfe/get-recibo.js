"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecibo = void 0;
const date_fns_1 = require("date-fns");
const utils_1 = require("../../../../domain/use-cases/utils");
const linha_horizontal_1 = require("./linha-horizontal");
const linha_horizontal_tracejada_1 = require("./linha-horizontal-tracejada");
const linha_vertical_1 = require("./linha-vertical");
const normal_1 = require("./normal");
const titulo_1 = require("./titulo");
function getRecibo({ y, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo, larguraDoFormulario, dest, emit, total, ide }) {
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: -110.5, y: y + 28.3, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: y + 51.1, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y, y2: y + 51.1, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y + 28.3, y2: y + 51.1, x: 99.2, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y, y2: y + 51.1, x: 476, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y, y2: y + 51.1, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y, y2: y + 51.1, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({
        doc,
        value: [
            'Recebemos de',
            emit.xNome,
            'os produtos e/ou serviços constantes da nota',
            'fiscal eletrônica indicada abaixo.',
            'Emissão:',
            (0, date_fns_1.format)((0, date_fns_1.parseISO)(ide.dhEmi), 'dd/MM/yyyy HH:mm:ss'),
            '- Valor Total:',
            (0, utils_1.formatMoney)(total.ICMSTot.vNF, 2),
            '- Destinatário:',
            dest.xNome,
            '- Endereço:',
            dest.enderDest?.xLgr
        ]
            .join(' ')
            .toUpperCase(),
        x: 1.5,
        y: y + 3,
        largura: 472.5,
        alinhamento: 'justify',
        tamanho: 6.9,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
    });
    (0, titulo_1.titulo)({ value: 'DATA DE RECEBIMENTO', x: 1.5, y: y + 30, largura: 97, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({
        value: 'IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR',
        x: 100.5,
        y: y + 30,
        largura: 374,
        ajusteX,
        ajusteY,
        doc,
        margemEsquerda,
        margemTopo
    });
    (0, normal_1.normal)({
        doc,
        value: 'NF-e',
        x: 476.6,
        y: y + 1.8,
        largura: 110,
        alinhamento: 'center',
        tamanho: 14,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
    });
    (0, normal_1.normal)({
        doc,
        value: 'Nº. ' + ide.nNF.padStart(9, '0').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'),
        x: 476.6,
        y: y + 22,
        largura: 110,
        alinhamento: 'center',
        tamanho: 10,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
    });
    (0, normal_1.normal)({
        doc,
        value: 'Série ' + ide.serie,
        x: 476.6,
        y: y + 31.5,
        largura: 110,
        alinhamento: 'center',
        tamanho: 10,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
    });
    (0, linha_horizontal_tracejada_1.linhaHorizontalTracejada)({ x1: 0, x2: 0, y: y + 55.32, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    return doc.y;
}
exports.getRecibo = getRecibo;
//# sourceMappingURL=get-recibo.js.map