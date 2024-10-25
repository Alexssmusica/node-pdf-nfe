"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfNFe = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const gerar_itens_1 = require("../../../application/helpers/generate-pdf/nfe/gerar-itens");
const italico_1 = require("../../../application/helpers/generate-pdf/nfe/italico");
const load_fontes_1 = require("../../../application/helpers/generate-pdf/nfe/load-fontes");
const options_doc_1 = require("../../../application/helpers/generate-pdf/nfe/options-doc");
const margemTopo = 2.8;
const margemEsquerda = 3;
const margemDireita = 589.65;
const larguraDoFormulario = margemDireita - margemEsquerda;
async function pdfNFe(nf, pathLogo) {
    const ajusteY = 0;
    const ajusteX = 0;
    const doc = new pdfkit_1.default(options_doc_1.optionsDocNFe);
    (0, load_fontes_1.loadFonts)(doc);
    await (0, gerar_itens_1.gerarItens)({ ajusteX, ajusteY, nf, doc, larguraDoFormulario, margemDireita, margemEsquerda, margemTopo, pathLogo });
    const paginas = doc.bufferedPageRange();
    for (let i = paginas.start; i < paginas.start + paginas.count; i++) {
        doc.switchToPage(i);
        (0, italico_1.italico)({
            doc,
            value: `FOLHA ${i + 1}/${paginas.start + paginas.count}`,
            x: 241.2,
            y: i === 0 ? 141.2 : 97.4,
            largura: 98.5,
            alinhamento: 'center',
            tamanho: 8,
            ajusteX,
            ajusteY,
            margemEsquerda,
            margemTopo
        });
    }
    doc.flushPages();
    doc.end();
    return doc;
}
exports.pdfNFe = pdfNFe;
//# sourceMappingURL=pdf-NFe.js.map