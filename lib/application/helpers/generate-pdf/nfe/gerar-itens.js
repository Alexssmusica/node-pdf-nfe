"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarItens = void 0;
const linha_horizontal_tracejada_1 = require("./linha-horizontal-tracejada");
const normal_1 = require("./normal");
const default_1 = require("./default");
const options_doc_1 = require("./options-doc");
function gerarItens({ nf, ajusteX, ajusteY, doc, margemEsquerda, margemTopo, margemDireita, folha }) {
    const yInicialDosItens = 406;
    let yDoItemAtual = yInicialDosItens;
    let alturaAtual = 0;
    nf.NFe.infNFe.det.forEach(function (item) {
        function renderizarLinha(pdf) {
            (0, normal_1.normal)({ doc, value: item.prod.cProd, x: 1.5, y: yDoItemAtual, largura: 51, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            let maiorY = pdf.y;
            (0, normal_1.normal)({ doc, value: item.prod.xProd, x: 55.5, y: yDoItemAtual, largura: 178, alinhamento: 'justify', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.prod.NCM, x: 235.5, y: yDoItemAtual, largura: 32.5, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.prod.CFOP, x: 293.5, y: yDoItemAtual, largura: 21, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.prod.uCom, x: 315.5, y: yDoItemAtual, largura: 16.5, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.prod.qCom, x: 335, y: yDoItemAtual, largura: 37, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(item.prod.vUnCom)), x: 375, y: yDoItemAtual, largura: 32.5, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(item.prod.vProd)), x: 409.5, y: yDoItemAtual, largura: 31, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            const keys = Object.keys(item.imposto);
            for (let i = 0; i < keys.length; i++) {
                if (keys[i].includes('ICMS')) {
                    const newKeys = Object.keys(item.imposto[keys[i]]);
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].CST ?? '', x: 270, y: yDoItemAtual, largura: 21, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].CSOSN ?? '', x: 270, y: yDoItemAtual, largura: 21, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    maiorY = Math.max(maiorY, pdf.y);
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].vBc ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 443, y: yDoItemAtual, largura: 32.5, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    maiorY = Math.max(maiorY, pdf.y);
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].vICMS ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 476, y: yDoItemAtual, largura: 32, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    maiorY = Math.max(maiorY, pdf.y);
                    (0, normal_1.normal)({ doc, value: item.imposto[keys[i]][newKeys[0]].pICMS ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 532, y: yDoItemAtual + 0.65, largura: 28, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
                    maiorY = Math.max(maiorY, pdf.y);
                }
            }
            (0, normal_1.normal)({ doc, value: item.imposto.IPI?.IPITRIB?.vIPI.toString() ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 507.5, y: yDoItemAtual, largura: 26, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            (0, normal_1.normal)({ doc, value: item.imposto.IPI?.IPITRIB?.pIPI?.toString() ?? Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(0)), x: 557.75, y: yDoItemAtual, largura: 29, alinhamento: 'center', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDosItens, ajusteX, ajusteY, margemEsquerda, margemTopo });
            maiorY = Math.max(maiorY, pdf.y);
            return Number(maiorY) + (default_1.DEFAULT_NFE.separadorDeItens !== undefined ? 2 : 0);
        }
        const altura = renderizarLinha(doc) - yDoItemAtual;
        alturaAtual += altura;
        yDoItemAtual = yDoItemAtual + altura;
        if (alturaAtual + altura > ((folha === 0 ? 763 : 960) - yInicialDosItens)) {
            doc.addPage(options_doc_1.optionsDocNFe);
            doc.y = 0;
            yDoItemAtual = 292;
            alturaAtual = 0;
            folha++;
        }
        else {
            if (default_1.DEFAULT_NFE.separadorDeItens !== undefined) {
                (0, linha_horizontal_tracejada_1.linhaHorizontalTracejada)({ x1: 0, x2: 0, y: yDoItemAtual - 2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
            }
        }
    });
}
exports.gerarItens = gerarItens;
//# sourceMappingURL=gerar-itens.js.map