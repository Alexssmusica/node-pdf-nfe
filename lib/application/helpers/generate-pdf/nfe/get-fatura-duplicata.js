"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFaturaDuplicata = void 0;
const secao_1 = require("./secao");
const default_1 = require("./default");
const linha_horizontal_1 = require("./linha-horizontal");
const linha_vertical_1 = require("./linha-vertical");
const date_fns_1 = require("date-fns");
function getFaturaDuplicata({ y, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo, larguraDoFormulario, cobr }) {
    if (cobr !== undefined) {
        (0, secao_1.secao)({ doc, value: 'FATURA / DUPLICATA', x: 1.5, y: y + 12, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
        if (cobr.fat !== undefined) {
            doc.font('negrito')
                .fillColor(default_1.DEFAULT_NFE.corDoTitulo)
                .fontSize(8)
                .text('Número da Fatura:', 5, y + 24, {
                width: larguraDoFormulario - 5,
                align: 'justify',
                lineGap: -1.5,
                continued: true
            }).font('normal').text(cobr.fat.nFat, { continued: true })
                .font('negrito').text(' Valor Original:', { continued: true }).font('normal').text(` ${Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(cobr.fat.vOrig))}`, { continued: true })
                .font('negrito').text(' Valor Desconto:', { continued: true }).font('normal').text(` ${Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(cobr.fat.vDesc))}`, { continued: true })
                .font('negrito').text(' Valor Líquido:', { continued: true }).font('normal').text(` ${Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(cobr.fat.vLiq))}.`, { continued: true });
        }
        cobr.dup.forEach((dup, index) => {
            doc.font('negrito').text(' Duplicata:', { continued: true }).font('normal').text(` ${dup.nDup}`, { continued: true });
            doc.font('negrito').text(' Valor:', { continued: true }).font('normal').text(` ${Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(dup.vDup))}`, { continued: true });
            doc.font('negrito').text(' Vencimento:', { continued: true }).font('normal').text(` ${(0, date_fns_1.format)((0, date_fns_1.parseISO)(dup.dVenc), 'dd/MM/yyyy')}`, { continued: true });
            if (index === cobr.dup.length - 1) {
                doc.text('');
            }
        });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: y + 20, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: doc.y + 6, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: y + 20, y2: doc.y + 6, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: y + 20, y2: doc.y + 6, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    }
    return doc.y;
}
exports.getFaturaDuplicata = getFaturaDuplicata;
//# sourceMappingURL=get-fatura-duplicata.js.map