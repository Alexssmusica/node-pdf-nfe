"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfNFCe = void 0;
const load_fontes_1 = require("../../../application/helpers/generate-pdf/nfe/load-fontes");
const normal_1 = require("../../../application/helpers/generate-pdf/nfe/normal");
const negrito_1 = require("../../../application/helpers/generate-pdf/nfe/negrito");
const pdfkit_1 = __importDefault(require("pdfkit"));
const date_fns_1 = require("date-fns");
const qrcode_1 = __importDefault(require("qrcode"));
async function pdfNFCe(nf, pathLogo) {
    const { NFe, protNFe } = nf;
    const { infProt } = protNFe;
    const { ide, emit, det, total, pag, dest, infAdic } = NFe.infNFe;
    const larguraPagina = 201;
    const margemPadrao = 2.5;
    const doc = new pdfkit_1.default({
        size: [larguraPagina, 1000],
        margins: {
            top: margemPadrao,
            bottom: 0,
            left: margemPadrao,
            right: margemPadrao
        }
    });
    (0, load_fontes_1.loadFontsNFCe)(doc);
    (0, negrito_1.negrito)({ doc, value: emit.xNome, x: 0, y: doc.y, largura: larguraPagina, tamanho: 10, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0 });
    (0, negrito_1.negrito)({ doc, value: (emit.CNPJ).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'), x: 0, y: doc.y, largura: larguraPagina, tamanho: 10, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0 });
    (0, normal_1.normal)({ doc, value: `${emit.enderEmit.xLgr}, ${emit.enderEmit.nro}${emit.enderEmit.xCpl !== undefined ? ' ' + emit.enderEmit.xCpl : ''}. ${emit.enderEmit.xBairro}, ${emit.enderEmit.xMun}-${emit.enderEmit.UF}. ${emit.enderEmit.CEP}`, x: 0, y: doc.y, largura: larguraPagina, tamanho: 8, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0 });
    doc.y += 5;
    (0, negrito_1.negrito)({ doc, value: 'Documento Auxiliar da Nota Fiscal de Consumidor Eletronica', x: 0, y: doc.y, largura: larguraPagina, tamanho: 8, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0 });
    doc.y += 5;
    let posicao = doc.y;
    (0, negrito_1.negrito)({ doc, value: 'CODIGO', x: 0, y: posicao, largura: 26.5, tamanho: 8, ajusteX: 0, ajusteY: 0, margemEsquerda: margemPadrao, margemTopo: 0, alinhamento: 'left' });
    (0, negrito_1.negrito)({ doc, value: 'DESCRICAO', x: 31, y: posicao, largura: 74.5, tamanho: 8, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    (0, negrito_1.negrito)({ doc, value: 'UN', x: 105, y: posicao, largura: 15, tamanho: 8, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    (0, negrito_1.negrito)({ doc, value: 'QTD', x: 120, y: posicao, largura: 20, tamanho: 8, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    (0, negrito_1.negrito)({ doc, value: 'VL UN', x: 140, y: posicao, largura: 27, tamanho: 8, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    (0, negrito_1.negrito)({ doc, value: 'VL TOTAL', x: 167, y: posicao, largura: larguraPagina - 167, tamanho: 8, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    det.forEach(element => {
        posicao = doc.y;
        (0, normal_1.normal)({ doc, value: element.prod.cProd.padStart(9, '0'), x: 0 + margemPadrao, y: posicao, largura: 28, tamanho: 6, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
        (0, normal_1.normal)({ doc, value: ajusteTamanhoTexto(doc, 'NOTA FISCAL EMITIDA EM AMB', 73.5), x: 31, y: posicao, largura: 73.5, tamanho: 6, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
        (0, normal_1.normal)({ doc, value: element.prod.uCom, x: 105, y: posicao, largura: 15, tamanho: 6, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
        (0, normal_1.normal)({ doc, value: element.prod.qCom, x: 120, y: posicao, largura: 20, tamanho: 6, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
        (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(element.prod.vUnCom)), x: 140, y: posicao, largura: 27, tamanho: 6, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
        (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(element.prod.vProd)), x: 167, y: posicao, largura: larguraPagina - 167, tamanho: 6, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
        posicao += 7;
    });
    doc.y += 2;
    (0, normal_1.normal)({ doc, value: 'Quantidade Total de Itens', x: margemPadrao, y: doc.y, largura: larguraPagina, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    doc.y -= 7;
    (0, normal_1.normal)({ doc, value: String(det.length), x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'right' });
    (0, normal_1.normal)({ doc, value: 'Valor Total', x: margemPadrao, y: doc.y, largura: larguraPagina, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    doc.y -= 7;
    (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vProd)), x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'right' });
    (0, normal_1.normal)({ doc, value: 'Desconto', x: margemPadrao, y: doc.y, largura: larguraPagina, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    doc.y -= 7;
    (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vDesc)), x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'right' });
    (0, normal_1.normal)({ doc, value: 'Adicional/Frete/Seguro', x: margemPadrao, y: doc.y, largura: larguraPagina, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    doc.y -= 7;
    (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vFrete)), x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'right' });
    (0, normal_1.normal)({ doc, value: 'Valor a Pagar', x: margemPadrao, y: doc.y, largura: larguraPagina, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    doc.y -= 7;
    (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vNF)), x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'right' });
    doc.y += 5;
    (0, normal_1.normal)({ doc, value: 'FORMA DE PAGAMENTO', x: margemPadrao, y: doc.y, largura: larguraPagina, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    doc.y -= 7;
    (0, normal_1.normal)({ doc, value: 'VALOR PAGO', x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'right' });
    pag.detPag.forEach(element => {
        (0, normal_1.normal)({ doc, value: getPagName(element.tPag), x: margemPadrao, y: doc.y, largura: larguraPagina, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
        doc.y -= 7;
        (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(element.vPag)), x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'right' });
    });
    (0, normal_1.normal)({ doc, value: 'TROCO', x: margemPadrao, y: doc.y, largura: larguraPagina, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    doc.y -= 7;
    (0, normal_1.normal)({ doc, value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(pag.vTroco ?? 0)), x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'right' });
    doc.y += 7;
    (0, negrito_1.negrito)({ doc, value: 'Consulte pela chave de acesso em', x: 0, y: doc.y, largura: larguraPagina - margemPadrao * 2, tamanho: 8, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    (0, normal_1.normal)({ doc, value: NFe.infNFeSupl.urlChave, x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    doc.y += 7;
    (0, normal_1.normal)({ doc, value: nf.protNFe.infProt.chNFe.replace(/(.{4})(?=.)/g, '$1 '), x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    doc.y += 7;
    (0, normal_1.normal)({ doc, value: dest?.xNome !== undefined ? dest.xNome : 'CONSUMIDOR NAO IDENTIFICADO', x: margemPadrao, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'justify' });
    if (dest?.CNPJ !== undefined) {
        (0, normal_1.normal)({ doc, value: 'CNPJ: ' + dest.CNPJ?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') ?? '', x: doc.x, y: doc.y, largura: 112, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    }
    else if (dest?.CPF !== undefined) {
        (0, normal_1.normal)({ doc, value: 'CPF: ' + dest.CPF?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') ?? '', x: doc.x, y: doc.y, largura: 112, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    }
    doc.y += 7;
    (0, normal_1.normal)({ doc, value: `NFC-e Série ${ide.serie} Nº ${ide.nNF} Data Emissão: ${(0, date_fns_1.format)((0, date_fns_1.parseISO)(ide.dhEmi), 'dd/MM/yyyy HH:mm:ss')}`, x: doc.x, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    (0, normal_1.normal)({ doc, value: 'Consulta via Leitor QR Code', x: margemPadrao, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    const qrImage = await qrcode_1.default.toDataURL(NFe.infNFeSupl.qrCode);
    doc.image(qrImage, (larguraPagina / 2) - 45, doc.y, { fit: [90, 90], align: 'center' });
    (0, normal_1.normal)({ doc, value: `Protocolo de Autorização: ${infProt.nProt}`, x: doc.x, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    (0, normal_1.normal)({ doc, value: `Data Autorização: ${(0, date_fns_1.format)((0, date_fns_1.parseISO)(infProt.dhRecbto), 'dd/MM/yyyy HH:mm:ss')}` ?? '', x: doc.x, y: doc.y, largura: 112, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'left' });
    doc.y += 7;
    (0, normal_1.normal)({ doc, value: 'Informacoes de interesse do contribuinte:', x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    (0, normal_1.normal)({ doc, value: infAdic.infCpl ?? '', x: 0, y: doc.y, largura: larguraPagina - margemPadrao, tamanho: 7, ajusteX: 0, ajusteY: 0, margemEsquerda: 0, margemTopo: 0, alinhamento: 'center' });
    doc.end();
    return doc;
}
exports.pdfNFCe = pdfNFCe;
function ajusteTamanhoTexto(doc, value, tamanho) {
    while (doc.widthOfString(value) > tamanho) {
        value = value.substring(0, value.length - 1);
    }
    return value;
}
function getPagName(value) {
    if (value === '01') {
        return 'Dinheiro';
    }
    if (value === '02') {
        return 'Cheque';
    }
    if (value === '03') {
        return 'Cartão de Crédito';
    }
    if (value === '04') {
        return 'Cartão de Débito';
    }
    if (value === '05') {
        return 'Crédito Loja';
    }
    if (value === '10') {
        return 'Vale Alimentação';
    }
    if (value === '11') {
        return 'Vale Refeição';
    }
    if (value === '12') {
        return 'Vale Presente';
    }
    if (value === '13') {
        return 'Vale Combustível';
    }
    if (value === '14') {
        return 'Duplicata Mercantil';
    }
    if (value === '15') {
        return 'Boleto Bancário';
    }
    if (value === '16') {
        return 'Depósito Bancário';
    }
    if (value === '17') {
        return 'Pagamento Instantâneo (PIX)';
    }
    if (value === '18') {
        return 'Transferência bancária, Carteira Digital';
    }
    if (value === '19') {
        return 'Programa de fidelidade, CashBack, Crédito Virtual';
    }
    if (value === '90') {
        return 'Sem pagamento';
    }
    return 'Outros';
}
//# sourceMappingURL=pdf-NFCe.js.map
