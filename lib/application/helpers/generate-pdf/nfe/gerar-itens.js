"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarItens = void 0;
const linha_horizontal_tracejada_1 = require("./linha-horizontal-tracejada");
const normal_1 = require("./normal");
const default_1 = require("./default");
const options_doc_1 = require("./options-doc");
const cria_layout_1 = require("./cria-layout");
async function gerarItens({ nf, ajusteX, ajusteY, doc, margemEsquerda, margemTopo, margemDireita, larguraDoFormulario, pathLogo }) {
    let folha = 0;
    await (0, cria_layout_1.criaLayout)({ ajusteX, ajusteY, nf, doc, larguraDoFormulario, margemDireita, margemEsquerda, margemTopo, pathLogo, folha });
    let maiorY = doc.y;
    for (let i = 0; i < nf.NFe.infNFe.det.length; i++) {
        const item = nf.NFe.infNFe.det[i];
        function renderizarLinha(pdf) {
            const y = maiorY + 2;
            (0, normal_1.normal)({ doc, value: item.prod.cProd, x: 1.5, y, largura: 51, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            (0, normal_1.normal)({ doc, value: item.prod.xProd, x: 55.5, y, largura: 178, alinhamento: 'justify', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.prod.NCM, x: 235.5, y, largura: 32.5, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.prod.CFOP, x: 293.5, y, largura: 21, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.prod.uCom, x: 315.5, y, largura: 16.5, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.prod.qCom, x: 335, y, largura: 37, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(item.prod.vUnCom)), x: 375, y, largura: 32.5, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(item.prod.vProd)), x: 409.5, y, largura: 31, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            const keys = Object.keys(item.imposto);
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].includes('ICMS')) {
                    const newKeys = Object.keys(item.imposto[keys[i]]);
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].CST ? `${item.imposto[keys[i]][newKeys[0]].orig}${item.imposto[keys[i]][newKeys[0]].CST}` : '', x: 270, y, largura: 21, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].CSOSN ? `${item.imposto[keys[i]][newKeys[0]].orig}${item.imposto[keys[i]][newKeys[0]].CSOSN}` : '', x: 270, y, largura: 21, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    maiorY = Math.max(maiorY, pdf.y);
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].vBc ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 443, y, largura: 32.5, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    maiorY = Math.max(maiorY, pdf.y);
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].vICMS ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 476, y, largura: 32, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    maiorY = Math.max(maiorY, pdf.y);
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].pICMS ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 532, y: y + 0.65, largura: 28, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    maiorY = Math.max(maiorY, pdf.y);
                }
            }
            (0, normal_1.normal)({ doc, value: item.imposto.IPI?.IPITrib?.vIPI.toString() ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 507.5, y, largura: 26, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.imposto.IPI?.IPITrib?.pIPI?.toString() ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 557.75, y, largura: 29, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            return Number(maiorY) + (default_1.DEFAULT_NFE.separadorDeItens !== undefined ? 2 : 0);
        }
        maiorY = renderizarLinha(doc);
        if (doc.y > ((folha === 0 ? default_1.DEFAULT_NFE.finalTamanhoDet1 - 26 : 800))) {
            doc.addPage(options_doc_1.optionsDocNFe);
            doc.y = 0;
            folha++;
            await (0, cria_layout_1.criaLayout)({ ajusteX, ajusteY, nf, doc, larguraDoFormulario, margemDireita, margemEsquerda, margemTopo, pathLogo, folha });
            maiorY = doc.y;
        }
        else {
            if (default_1.DEFAULT_NFE.separadorDeItens !== undefined) {
                (0, linha_horizontal_tracejada_1.linhaHorizontalTracejada)({ x1: 0, x2: 0, y: maiorY - 1, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
            }
        }
    }
}
exports.gerarItens = gerarItens;
//# sourceMappingURL=gerar-itens.js.map