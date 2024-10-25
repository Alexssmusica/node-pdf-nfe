"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criaLayout = void 0;
const default_1 = require("./default");
const get_dados_adicionais_1 = require("./get-dados-adicionais");
const get_dados_emitente_1 = require("./get-dados-emitente");
const get_destinatario_remetente_1 = require("./get-destinatario-remetente");
const get_fatura_duplicata_1 = require("./get-fatura-duplicata");
const get_homologacao_1 = require("./get-homologacao");
const get_imposto_1 = require("./get-imposto");
const get_iss_1 = require("./get-iss");
const get_menu_itens_1 = require("./get-menu-itens");
const get_recibo_1 = require("./get-recibo");
const get_transporte_1 = require("./get-transporte");
async function criaLayout({ pathLogo, nf, ajusteX, ajusteY, doc, margemEsquerda, margemTopo, larguraDoFormulario, margemDireita, folha }) {
    const { dest, emit, ide, infAdic, total, transp, cobr } = nf.NFe.infNFe;
    let y = 0;
    const finalEspacoDet = folha === 0 ? default_1.DEFAULT_NFE.finalTamanhoDet1 : default_1.DEFAULT_NFE.finalTamanhoDetDemais;
    if (ide.tpAmb === '2') {
        (0, get_homologacao_1.getHomologacao)({
            ajusteX,
            ajusteY,
            doc,
            margemEsquerda,
            margemTopo,
            larguraDoFormulario,
            protNFe: nf.protNFe
        });
    }
    if (folha === 0) {
        y = (0, get_recibo_1.getRecibo)({
            y,
            ajusteX,
            ajusteY,
            dest,
            doc,
            emit,
            larguraDoFormulario,
            margemDireita,
            margemEsquerda,
            margemTopo,
            total,
            ide
        });
    }
    await (0, get_dados_emitente_1.getDadosEmitente)({
        ajusteX,
        ajusteY,
        doc,
        emit,
        larguraDoFormulario,
        margemDireita,
        margemEsquerda,
        margemTopo,
        protNFe: nf.protNFe,
        y,
        pathLogo,
        ide,
        folha
    });
    y = (0, get_destinatario_remetente_1.getDestinatarioRemetente)({
        ajusteX,
        ajusteY,
        dest,
        doc,
        larguraDoFormulario,
        margemDireita,
        margemEsquerda,
        margemTopo,
        y: doc.y,
        ide
    });
    if (folha === 0) {
        y = (0, get_fatura_duplicata_1.getFaturaDuplicata)({
            ajusteX,
            ajusteY,
            doc,
            larguraDoFormulario,
            margemDireita,
            margemEsquerda,
            margemTopo,
            cobr,
            y
        });
        y = (0, get_imposto_1.getImposto)({
            ajusteX,
            ajusteY,
            doc,
            larguraDoFormulario,
            margemDireita,
            margemEsquerda,
            margemTopo,
            total,
            y
        });
        y = (0, get_transporte_1.getTransporte)({
            ajusteX,
            ajusteY,
            doc,
            larguraDoFormulario,
            margemDireita,
            margemEsquerda,
            margemTopo,
            transp,
            y
        });
        y = (0, get_iss_1.getIss)({
            ajusteX,
            ajusteY,
            doc,
            emit,
            larguraDoFormulario,
            margemDireita,
            margemEsquerda,
            margemTopo,
            total,
            y
        });
        (0, get_dados_adicionais_1.getDadosAdicionais)({
            ajusteX,
            ajusteY,
            doc,
            infAdic,
            larguraDoFormulario,
            margemDireita,
            margemEsquerda,
            margemTopo,
            finalEspacoDet
        });
    }
    y = (0, get_menu_itens_1.getMenuItens)({
        ajusteX,
        ajusteY,
        doc,
        margemEsquerda,
        margemTopo,
        y,
        margemDireita,
        finalEspacoDet,
        larguraDoFormulario
    });
}
exports.criaLayout = criaLayout;
//# sourceMappingURL=cria-layout.js.map