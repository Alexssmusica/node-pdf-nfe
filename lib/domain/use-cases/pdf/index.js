"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarPDF = void 0;
const xml_1 = require("../../../application/helpers/xml");
const pdf_NFCe_1 = require("./pdf-NFCe");
const pdf_NFe_1 = require("./pdf-NFe");
async function gerarPDF(xmlNFe, pathLogo) {
    const nf = await (0, xml_1.deserializeXml)(xmlNFe);
    if (!(nf.nfeProc.NFe.infNFe.det instanceof Array)) {
        nf.nfeProc.NFe.infNFe.det = [nf.nfeProc.NFe.infNFe.det];
    }
    if (!(nf.nfeProc.NFe.infNFe.pag.detPag instanceof Array)) {
        nf.nfeProc.NFe.infNFe.pag.detPag = [nf.nfeProc.NFe.infNFe.pag.detPag];
    }
    if (nf.nfeProc.NFe.infNFe.ide.mod === '55') {
        return await (0, pdf_NFe_1.pdfNFe)(nf.nfeProc, pathLogo);
    }
    else {
        return await (0, pdf_NFCe_1.pdfNFCe)(nf.nfeProc, pathLogo);
    }
}
exports.gerarPDF = gerarPDF;
//# sourceMappingURL=index.js.map