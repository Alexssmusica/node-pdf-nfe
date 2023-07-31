"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDadosEmitente = void 0;
const bwip_js_1 = __importDefault(require("bwip-js"));
const date_fns_1 = require("date-fns");
const linha_horizontal_1 = require("./linha-horizontal");
const linha_vertical_1 = require("./linha-vertical");
const normal_1 = require("./normal");
const titulo_1 = require("./titulo");
const campo_1 = require("./campo");
const negrito_1 = require("./negrito");
const default_1 = require("./default");
const italico_1 = require("./italico");
async function getDadosEmitente({ y, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo, larguraDoFormulario, emit, protNFe, pathLogo, ide }) {
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 317, x2: -254.7, y: y + 53.1, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 317, x2: -254.7, y: y + 72.9, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y + 53.1, y2: y + 72.9, x: 317.4, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y + 53.1, y2: y + 72.9, x: 331.55, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: y + 15.25, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 340.05, x2: 0, y: y + 60.5, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 340.05, x2: 0, y: y + 83.1, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: y + 105.9, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: y + 125.7, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: y + 145.7, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y + 15.25, y2: y + 145.7, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y + 15.25, y2: y + 105.7, x: 240.75, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y + 15.25, y2: y + 125.7, x: 340.05, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y + 15.25, y2: y + 145.7, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y + 125.7, y2: y + 145.7, x: 195.55, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: y + 125.7, y2: y + 145.7, x: 391, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'DANFE', x: 266.5, y: y + 19.2, largura: 197, alinhamento: 'left', tamanho: 14, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, italico_1.italico)({ doc, value: 'IDENTIFICAÇÃO DO EMITENTE', x: 1, y: y + 15.7, largura: 238, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
    const identificacaoDoEmitenteY = pathLogo !== undefined ? y + 33.7 : y + 39.7;
    const identificacaoDoEmitenteX = pathLogo !== undefined ? 67 : 1.5;
    const identificacaoDoEmitenteLargura = pathLogo !== undefined ? 172 : 237;
    const identificacaoDoEmitenteFonte = pathLogo !== undefined ? 0 : 1.5;
    if (pathLogo !== undefined) {
        doc.image(pathLogo, margemEsquerda + ajusteX + 4.5, margemTopo + ajusteY + default_1.DEFAULT_NFE.ajusteYDoLogotipo + 78, {
            fit: [60, 60]
        });
    }
    (0, negrito_1.negrito)({ doc, value: emit.xNome, x: identificacaoDoEmitenteX, y: identificacaoDoEmitenteY + default_1.DEFAULT_NFE.ajusteYDaIdentificacaoDoEmitente, largura: identificacaoDoEmitenteLargura, alinhamento: 'center', tamanho: 8 + identificacaoDoEmitenteFonte, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: `${emit.enderEmit.xLgr}, ${emit.enderEmit.nro} ${emit.enderEmit.xCpl ?? ''}`, x: identificacaoDoEmitenteX, y: doc.y - margemTopo + 2, largura: identificacaoDoEmitenteLargura, alinhamento: 'center', tamanho: 6 + identificacaoDoEmitenteFonte, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: `${emit.enderEmit.xBairro}. ${emit.enderEmit.xMun}-${emit.enderEmit.UF}`, x: identificacaoDoEmitenteX, y: doc.y - margemTopo, largura: identificacaoDoEmitenteLargura, alinhamento: 'center', tamanho: 6 + identificacaoDoEmitenteFonte, ajusteX, ajusteY, margemEsquerda, margemTopo });
    if (emit.fone !== undefined) {
        (0, normal_1.normal)({ doc, value: 'Telefone: ' + emit.fone, x: identificacaoDoEmitenteX, y: doc.y - margemTopo + 2, largura: identificacaoDoEmitenteLargura, alinhamento: 'center', tamanho: 6 + identificacaoDoEmitenteFonte, ajusteX, ajusteY, margemEsquerda, margemTopo });
    }
    (0, normal_1.normal)({ doc, value: 'Documento Auxiliar da Nota Fiscal Eletrônica', x: 241.5, y: y + 32.7, largura: 99.5, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: '0 - ENTRADA', x: 248, y: y + 55.7, largura: 99.5, alinhamento: 'left', ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: '1 - SAÍDA', x: 248, y: y + 64.2, largura: 99.5, alinhamento: 'left', ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: ide.tpNF, x: 317.5, y: y + 52.5, largura: 14.5, alinhamento: 'center', tamanho: 18, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: 'Consulta de autenticidade no portal nacional da NF-e', x: 340.5, y: y + 85.7, largura: 244, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: 'www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora', x: 340.5, y: y + 93.7, largura: 244, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: 'Nº. ' + ide.nNF.padStart(9, '0').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'), x: 241.2, y: y + 75.2, largura: 98.5, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: 'Série ' + ide.serie, x: 241.2, y: y + 85.2, largura: 98.5, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
    const options = {
        bcid: 'code128',
        text: protNFe.infProt.chNFe,
        height: 15,
        width: 130
    };
    const barcodeCep = await bwip_js_1.default.toBuffer(options);
    doc.image(barcodeCep, 350, y + 22.7, { fit: [230, 50] });
    (0, titulo_1.titulo)({ value: 'CHAVE DE ACESSO', x: 341.5, y: y + 61.2, largura: 244, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: protNFe.infProt.chNFe.replace(/(.{4})(?=.)/g, '$1 '), x: 341.5, y: y + 67.7, largura: 244, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'PROTOCOLO DE AUTORIZAÇÃO DE USO', x: 341.5, y: y + 106.7, largura: 244, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: `${protNFe.infProt.nProt.replace(/(.{3})(?=.)/g, '$1 ')} - ${(0, date_fns_1.format)((0, date_fns_1.parseISO)(protNFe.infProt.dhRecbto), 'dd/MM/yyyy HH:mm:ss')}`, x: 341.5, y: y + 114.1, largura: 244, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'NATUREZA DA OPERAÇÃO', x: 1.5, y: y + 106.7, largura: 338, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: ide.natOp, x: 1.5, y: y + 114.1, largura: 338, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'INSCRIÇÃO ESTADUAL', x: 1.5, y: y + 126.7, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: emit.IE.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4'), x: 1.5, y: y + 134.1, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'INSCRIÇÃO ESTADUAL DO SUBST. TRIBUT.', x: 197, y: y + 126.7, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: emit.iEST ?? '', x: 197, y: y + 134.1, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'CNPJ', x: 392.5, y: y + 126.7, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: emit.CNPJ?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') ?? '', x: 392.5, y: y + 134.1, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
}
exports.getDadosEmitente = getDadosEmitente;
//# sourceMappingURL=get-dados-emitente.js.map