"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarPDF = void 0;
const xml_1 = require("../../../application/helpers/xml");
const pdf_NFCe_1 = require("./pdf-NFCe");
const pdf_NFe_1 = require("./pdf-NFe");
async function gerarPDF(xmlNFe, pathLogo) {
    const nf = await (0, xml_1.deserializeXml)(xmlNFe);
    const nfeProc = nf.nfeProc;
    if (!(nfeProc.NFe.infNFe.det instanceof Array)) {
        nfeProc.NFe.infNFe.det = [nfeProc.NFe.infNFe.det];
    }
    if (!(nfeProc.NFe.infNFe.pag.detPag instanceof Array)) {
        nfeProc.NFe.infNFe.pag.detPag = [nfeProc.NFe.infNFe.pag.detPag];
    }
    if (nfeProc.NFe.infNFe.cobr?.dup !== undefined && !(nfeProc.NFe.infNFe.cobr?.dup instanceof Array)) {
        nfeProc.NFe.infNFe.cobr.dup = [nfeProc.NFe.infNFe.cobr?.dup];
    }
    if (nfeProc.NFe.infNFe.ide.mod === '55') {
        return await (0, pdf_NFe_1.pdfNFe)(nfeProc, pathLogo);
    }
    else {
        return await (0, pdf_NFCe_1.pdfNFCe)(nfeProc, pathLogo);
    }
}
exports.gerarPDF = gerarPDF;
//# sourceMappingURL=index.js.map