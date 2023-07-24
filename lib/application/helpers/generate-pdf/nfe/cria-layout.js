"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criaLayout = void 0;
const bwip_js_1 = __importDefault(require("bwip-js"));
const date_fns_1 = require("date-fns");
const campo_1 = require("./campo");
const italico_1 = require("./italico");
const linha_horizontal_1 = require("./linha-horizontal");
const linha_horizontal_tracejada_1 = require("./linha-horizontal-tracejada");
const linha_vertical_1 = require("./linha-vertical");
const negrito_1 = require("./negrito");
const normal_1 = require("./normal");
const secao_1 = require("./secao");
const titulo_1 = require("./titulo");
const default_1 = require("./default");
async function criaLayout({ pathLogo, nf, ajusteX, ajusteY, doc, margemEsquerda, margemTopo, larguraDoFormulario, margemDireita, folha }) {
    const { dest, emit, ide, infAdic, total, transp } = nf.NFe.infNFe;
    if (ide.tpAmb === '2') {
        doc.font('normal')
            .fillColor(default_1.DEFAULT_NFE.corDoTitulo)
            .fontSize(38)
            .fillOpacity(default_1.DEFAULT_NFE.opacidadeDaHomologacao)
            .text('EMITIDA EM HOMOLOGAÇÃO', margemEsquerda + ajusteX + 0, margemTopo + ajusteY + 200 + default_1.DEFAULT_NFE.ajusteYDaHomologacao, {
            width: larguraDoFormulario,
            align: 'center'
        });
        doc.font('normal')
            .fillColor(default_1.DEFAULT_NFE.corDoTitulo)
            .fontSize(25)
            .fillOpacity(default_1.DEFAULT_NFE.opacidadeDaHomologacao)
            .text(nf.protNFe !== undefined ? 'SEM VALOR FISCAL' : 'NÃO ENVIADA PARA SEFAZ', margemEsquerda + ajusteX + 0, margemTopo + ajusteY + 250 + default_1.DEFAULT_NFE.ajusteYDaHomologacao, {
            width: larguraDoFormulario,
            align: 'center'
        });
        doc.fillOpacity(100);
    }
    if (folha === 0) {
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 0, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: -110.5, y: 28.3, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 51.1, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 0, y2: 51.1, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 28.3, y2: 51.1, x: 99.2, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 0, y2: 51.1, x: 476, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 0, y2: 51.1, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 0, y2: 51.1, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_horizontal_tracejada_1.linhaHorizontalTracejada)({ x1: 0, x2: 0, y: 55.32, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    }
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 317, x2: -254.7, y: 97.4, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 317, x2: -254.7, y: 117.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 97.4, y2: 117.2, x: 317.4, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 97.4, y2: 117.2, x: 331.55, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 59.55, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 340.05, x2: 0, y: 104.8, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 340.05, x2: 0, y: 127.4, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 150.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 170, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 190, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 59.55, y2: 190, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 59.55, y2: 150.2, x: 240.75, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 59.55, y2: 170, x: 340.05, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 59.55, y2: 190, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 170, y2: 190, x: 195.55, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 170, y2: 190, x: 391, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 201.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 221, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 241, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 261, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 201.2, y2: 261, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 201.2, y2: 221, x: 357.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 221.2, y2: 261, x: 274.9, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 241.2, y2: 261, x: 297.6, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 221.2, y2: 261, x: 396.75, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 201.2, y2: 261, x: 493.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 201.2, y2: 261, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    if (folha === 0) {
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 269, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 289, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 309, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 269, y2: 309, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 269, y2: 309, x: 87.7, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 269, y2: 309, x: (87.7 * 2) + 0.3, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 269, y2: 309, x: (87.7 * 3) + 0.4, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 269, y2: 309, x: (87.7 * 4) + 0.4, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 269, y2: 309, x: (87.7 * 5) + 0.6, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 269, y2: 309, x: (87.7 * 5) + 51.8, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 269, y2: 309, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 320, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 340, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 360, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 380, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 320, y2: 380, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 320, y2: 340, x: 170, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 320, y2: 340, x: 346, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 320, y2: 360, x: 434, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 320, y2: 360, x: 456.65, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 320, y2: 380, x: 258, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 360, y2: 380, x: 59.6, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 360, y2: 380, x: 156.6, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 360, y2: 380, x: 357, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 360, y2: 380, x: 473.3, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 320, y2: 380, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    }
    let alturaInicialDoSetimoBloco = 793.6;
    const deveExibirQuadroDeCalculoDoIssqn = total.ISSQNtot?.vServ !== undefined ||
        total.ISSQNtot?.vBC !== undefined ||
        total.ISSQNtot?.vISS !== undefined;
    if (deveExibirQuadroDeCalculoDoIssqn) {
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 762.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 782.2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: 136.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: (136.1 * 2) - 0.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: (136.1 * 3) - 0.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: 762.2, y2: 782.2, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    }
    else {
        alturaInicialDoSetimoBloco = 762.2;
    }
    const numeroFolha = folha === 0 ? 0 : 115;
    const finalLinhaY = folha === 0 ? 752 : 828;
    (0, linha_horizontal_1.linhaHorizontal)({ x1: -0.5, x2: 0.5, y: 390 - numeroFolha, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: -0.5, x2: 0.5, y: 405 - numeroFolha, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_horizontal_1.linhaHorizontal)({ x1: -0.5, x2: 0.5, y: finalLinhaY, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 53, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 236.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 267, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 293.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 315, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 333, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 373, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 407.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 441.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 475, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 508, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 533.5, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: 557, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, linha_vertical_1.linhaVertical)({ y1: 390 - numeroFolha, y2: finalLinhaY, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    if (folha === 0) {
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: alturaInicialDoSetimoBloco, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_horizontal_1.linhaHorizontal)({ x1: 0, x2: 0, y: 821.8, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: alturaInicialDoSetimoBloco, y2: 821.8, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: alturaInicialDoSetimoBloco, y2: 821.8, x: 388.25, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, linha_vertical_1.linhaVertical)({ y1: alturaInicialDoSetimoBloco, y2: 821.8, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
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
                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vNF)),
                '- Destinatário:',
                dest.xNome,
                '- Endereço:',
                dest.enderDest?.xLgr
            ].join(' ').toUpperCase(),
            x: 1.5,
            y: 3,
            largura: 472.5,
            alinhamento: 'justify',
            tamanho: 6.9,
            ajusteX,
            ajusteY,
            margemEsquerda,
            margemTopo
        });
        (0, normal_1.normal)({ doc, value: 'NF-e', x: 476.6, y: 1.8, largura: 110, alinhamento: 'center', tamanho: 14, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, normal_1.normal)({ doc, value: 'Nº. ' + ide.nNF.padStart(9, '0').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'), x: 476.6, y: 22, largura: 110, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, normal_1.normal)({ doc, value: 'Série ' + ide.serie, x: 476.6, y: 31.5, largura: 110, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
    }
    (0, titulo_1.titulo)({ value: 'DANFE', x: 266.5, y: 63.5, largura: 197, alinhamento: 'left', tamanho: 14, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, italico_1.italico)({ doc, value: 'IDENTIFICAÇÃO DO EMITENTE', x: 1, y: 60, largura: 238, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
    const identificacaoDoEmitenteY = pathLogo !== undefined ? 78 : 84;
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
    (0, normal_1.normal)({ doc, value: 'Documento Auxiliar da Nota Fiscal Eletrônica', x: 241.5, y: 77, largura: 99.5, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: '0 - ENTRADA', x: 248, y: 100, largura: 99.5, alinhamento: 'left', ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: '1 - SAÍDA', x: 248, y: 108.5, largura: 99.5, alinhamento: 'left', ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: ide.tpNF, x: 317.5, y: 96.8, largura: 14.5, alinhamento: 'center', tamanho: 18, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: 'Consulta de autenticidade no portal nacional da NF-e', x: 340.5, y: 130, largura: 244, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: 'www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora', x: 340.5, y: 138, largura: 244, ajusteX, ajusteY, margemEsquerda, margemTopo });
    const informacoesComplementares = [
        infAdic.infCpl
    ];
    if (folha === 0) {
        (0, normal_1.normal)({ doc, value: informacoesComplementares.join(' - '), x: 1, y: alturaInicialDoSetimoBloco + 7.5, largura: 386, alinhamento: 'justify', tamanho: 6, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'DATA DE RECEBIMENTO', x: 1.5, y: 29, largura: 97, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR', x: 100.5, y: 29, largura: 374, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    }
    (0, normal_1.normal)({ doc, value: 'Nº. ' + ide.nNF.padStart(9, '0').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'), x: 241.2, y: 119.5, largura: 98.5, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, normal_1.normal)({ doc, value: 'Série ' + ide.serie, x: 241.2, y: 129.5, largura: 98.5, alinhamento: 'center', tamanho: 10, ajusteX, ajusteY, margemEsquerda, margemTopo });
    const optionsCep = {
        bcid: 'code128',
        text: nf.protNFe.infProt.chNFe,
        height: 15,
        width: 130
    };
    const barcodeCep = await bwip_js_1.default.toBuffer(optionsCep);
    doc.image(barcodeCep, 350, 67, { fit: [230, 50] });
    (0, titulo_1.titulo)({ value: 'CHAVE DE ACESSO', x: 341.5, y: 105.5, largura: 244, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: nf.protNFe.infProt.chNFe.replace(/(.{4})(?=.)/g, '$1 '), x: 341.5, y: 114, largura: 244, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'PROTOCOLO DE AUTORIZAÇÃO DE USO', x: 341.5, y: 151, largura: 244, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: `${nf.protNFe.infProt.nProt.replace(/(.{3})(?=.)/g, '$1 ')} - ${(0, date_fns_1.format)((0, date_fns_1.parseISO)(nf.protNFe.infProt.dhRecbto), 'dd/MM/yyyy HH:mm:ss')}`, x: 341.5, y: 158.4, largura: 244, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'NATUREZA DA OPERAÇÃO', x: 1.5, y: 151, largura: 338, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: ide.natOp, x: 1.5, y: 158.4, largura: 338, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'INSCRIÇÃO ESTADUAL', x: 1.5, y: 171, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: emit.IE.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4'), x: 1.5, y: 178.4, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'INSCRIÇÃO ESTADUAL DO SUBST. TRIBUT.', x: 197, y: 171, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: emit.iEST ?? '', x: 197, y: 178.4, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'CNPJ', x: 392.5, y: 171, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: emit.CNPJ?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') ?? '', x: 392.5, y: 178.4, largura: 192.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, secao_1.secao)({ doc, value: 'DESTINATÁRIO / REMETENTE', x: 1.5, y: 193, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'NOME / RAZÃO SOCIAL', x: 1.5, y: 202, largura: 353.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.xNome, x: 1.5, y: 210, largura: 353.5, alinhamento: 'left', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'CNPJ / CPF', x: 358, y: 202, largura: 133.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.CPF?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') ?? '', x: 358, y: 210, largura: 133.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.CNPJ?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') ?? '', x: 358, y: 210, largura: 133.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'DATA DA EMISSÃO', x: 495, y: 202, largura: 90, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: (0, date_fns_1.format)((0, date_fns_1.parseISO)(ide.dhEmi), 'dd/MM/yyyy HH:mm:ss'), x: 495, y: 210, largura: 90, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'ENDEREÇO', x: 1.5, y: 222, largura: 272, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.enderDest?.xLgr ?? '', x: 1.5, y: 230, largura: 272, alinhamento: 'left', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDoCampo - 0.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'BAIRRO / DISTRITO', x: 276, y: 222, largura: 192, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.enderDest?.xBairro ?? '', x: 276, y: 230, largura: 119, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'CEP', x: 398, y: 222, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.enderDest?.CEP ?? '', x: 398, y: 230, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'DATA DA SAÍDA', x: 495, y: 222, largura: 90, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: ide.dhSaiEnt !== undefined ? (0, date_fns_1.format)((0, date_fns_1.parseISO)(ide.dhSaiEnt), 'dd/MM/yyyy HH:mm:ss') : '', x: 495, y: 230, largura: 90, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'MUNICÍPIO', x: 1.5, y: 242, largura: 272, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.enderDest?.xMun ?? '', x: 1.5, y: 250, largura: 272, alinhamento: 'left', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'UF', x: 276, y: 242, largura: 20, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.enderDest?.UF ?? '', x: 276, y: 250, largura: 20, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'FONE / FAX', x: 299, y: 242, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.enderDest?.fone ?? '', x: 299, y: 250, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'INSCRIÇÃO ESTADUAL', x: 398, y: 242, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, campo_1.campo)({ value: dest.indIEDest.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4'), x: 398, y: 250, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'HORA DA SAÍDA', x: 495, y: 242, largura: 90, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    if (folha === 0) {
        (0, secao_1.secao)({ doc, value: 'CÁLCULO DO IMPOSTO', x: 1.5, y: 261.5, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'BASE DE CÁLCULO DO ICMS', x: 1.5, y: 270, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vBC)), x: 1.5, y: 278, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR DO ICMS', x: 89, y: 270, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vICMS)), x: 89, y: 278, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'BASE DE CÁLC. ICMS S.T.', x: 177, y: 270, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vBCST)), x: 177, y: 278, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR DO ICMS SUBST.', x: 265, y: 270, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vST)), x: 265, y: 278, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR IMP. IMPORTAÇÃO', x: 353, y: 270, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vIPI)), x: 353, y: 278, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR DO PIS', x: 441, y: 270, largura: 47, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vPIS)), x: 441, y: 278, largura: 47, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR TOTAL DOS PRODUTOS', x: 492, y: 270, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vProd)), x: 492, y: 278, largura: 93, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR DO FRETE', x: 1.5, y: 290, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vFrete)), x: 1.5, y: 298, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR DO SEGURO', x: 89, y: 290, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vSeg)), x: 89, y: 298, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'DESCONTO', x: 177, y: 290, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vDesc)), x: 177, y: 298, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'OUTRAS DESPESAS', x: 265, y: 290, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vOutro)), x: 265, y: 298, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR TOTAL DO IPI', x: 353, y: 290, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vIPI)), x: 353, y: 298, largura: 84, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR DA COFINS', x: 440.5, y: 290, largura: 47, ajusteX, ajusteY, doc, margemEsquerda, margemTopo, tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDoTitulo - 1 });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vCOFINS)), x: 440.5, y: 298, largura: 47, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR TOTAL DA NOTA', x: 492, y: 290, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(total.ICMSTot.vNF)), x: 492, y: 298, largura: 93, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, secao_1.secao)({ doc, value: 'TRANSPORTADOR / VOLUMES TRANSPORTADOS', x: 1.5, y: 312.5, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'NOME / RAZÃO SOCIAL', x: 1.5, y: 321, largura: 166.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.transporta?.xNome ?? '', x: 1.5, y: 329, largura: 166.5, alinhamento: 'left', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        function ModFrete(value) {
            if (value === '0') {
                return 'Frete por conta do Remetente';
            }
            else if (value === '1') {
                return 'Frete por conta do Destinatário';
            }
            else if (value === '2') {
                return 'Frete por conta de Terceiros';
            }
            else if (value === '3') {
                return 'Por conta do Remetente';
            }
            else if (value === '4') {
                return 'Por conta do Destinatário';
            }
            else if (value === '9') {
                return 'Sem Ocorrência de Transporte';
            }
            return 'VALOR NAO CADASTRADO';
        }
        (0, titulo_1.titulo)({ value: 'FRETE POR CONTA', x: 171.5, y: 321, largura: 85, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: ModFrete(transp.modFrete), x: 171.5, y: 329, largura: 85, ajusteX, ajusteY, doc, margemEsquerda, margemTopo, tamanho: 6 });
        (0, titulo_1.titulo)({ value: 'CÓDIGO ANTT', x: 259.5, y: 321, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.veicTransp?.RNTC ?? '', x: 259.5, y: 329, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'PLACA DO VEÍCULO', x: 347.5, y: 321, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.veicTransp?.placa ?? '', x: 347.5, y: 329, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'UF', x: 435.5, y: 321, largura: 19.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.veicTransp?.UF ?? '', x: 435.5, y: 329, largura: 19.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'CNPJ / CPF', x: 458, y: 321, largura: 126.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.transporta?.CNPJ ?? '', x: 458, y: 329, largura: 126.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.transporta?.CPF ?? '', x: 458, y: 329, largura: 126.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'ENDEREÇO', x: 1.5, y: 341, largura: 254, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.transporta?.xEnder ?? '', x: 1.5, y: 349, largura: 254, alinhamento: 'left', tamanho: default_1.DEFAULT_NFE.tamanhoDaFonteDoCampo - 0.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'MUNICÍPIO', x: 259.5, y: 341, largura: 172, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.transporta?.xMun ?? '', x: 259.5, y: 349, largura: 172, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'UF', x: 435.5, y: 341, largura: 19.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.transporta?.uf ?? '', x: 435.5, y: 349, largura: 19.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'INSCRIÇÃO ESTADUAL', x: 458, y: 341, largura: 126.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.transporta?.ie ?? '', x: 458, y: 349, largura: 126.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'QUANTIDADE', x: 1.5, y: 361, largura: 56.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.vol?.qVol ?? '', x: 1.5, y: 369, largura: 56.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'ESPÉCIE', x: 60.8, y: 361, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.vol?.esp ?? '', x: 60.8, y: 369, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'MARCA', x: 160, y: 361, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.vol?.marca ?? '', x: 160, y: 369, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'NUMERAÇÃO', x: 259.5, y: 361, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.vol?.nVol ?? '', x: 259.5, y: 369, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'PESO BRUTO', x: 358.5, y: 361, largura: 112.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.vol?.pesoB ?? '', x: 358.5, y: 369, largura: 112.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'PESO LÍQUIDO', x: 474.5, y: 361, largura: 110.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: transp.vol?.pesoL ?? '', x: 474.5, y: 369, largura: 110.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    }
    const alturaDaSecaoDosItens = folha === 0 ? 383 : 268;
    let alturaDosTitulosDosItens;
    alturaDosTitulosDosItens = alturaDaSecaoDosItens + 12;
    (0, secao_1.secao)({ doc, value: 'DADOS DOS PRODUTOS / SERVIÇOS', x: 1.5, y: alturaDaSecaoDosItens, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'CÓDIGO', x: 1.5, y: alturaDosTitulosDosItens, largura: 50.5, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'DESCRIÇÃO DO PRODUTO / SERVIÇO', x: 55, y: alturaDosTitulosDosItens, largura: 179, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'NCM/SH', x: 236.5, y: alturaDosTitulosDosItens, largura: 31.5, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'O/CST', x: 270, y: alturaDosTitulosDosItens, largura: 20, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'CFOP', x: 294.5, y: alturaDosTitulosDosItens, largura: 19.5, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'UN.', x: 317, y: alturaDosTitulosDosItens, largura: 14.5, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'QUANT.', x: 335, y: alturaDosTitulosDosItens, largura: 37, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'VALOR UNIT.', x: 375, y: alturaDosTitulosDosItens - 4, largura: 31.5, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'VALOR TOTAL.', x: 409.5, y: alturaDosTitulosDosItens - 4, largura: 31.5, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'B. CÁLC. ICMS', x: 443, y: alturaDosTitulosDosItens - 4, largura: 31.5, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'VALOR ICMS', x: 476, y: alturaDosTitulosDosItens - 4, largura: 31.5, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'VALOR IPI', x: 507.5, y: alturaDosTitulosDosItens - 4, largura: 28, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'ALÍQ. ICMS', x: 532, y: alturaDosTitulosDosItens - 4, largura: 28, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    (0, titulo_1.titulo)({ value: 'ALÍQ. IPI', x: 557.75, y: alturaDosTitulosDosItens, largura: 28, alinhamento: default_1.DEFAULT_NFE.alinhamentoDoTituloDaTabela, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    if (deveExibirQuadroDeCalculoDoIssqn) {
        (0, secao_1.secao)({ doc, value: 'CÁLCULO DO ISSQN', x: 1.5, y: 754.5, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'INSCRIÇÃO MUNICIPAL', x: 1.5, y: 763, largura: 132.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: emit.IE, x: 1.5, y: 771, largura: 132.5, alinhamento: 'left', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR TOTAL DOS SERVIÇOS', x: 137.5, y: 763, largura: 132.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: total.ISSQNtot?.vServ ?? '', x: 137.5, y: 771, largura: 132.5, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'BASE DE CÁLCULO DO ISSQN', x: 273.5, y: 763, largura: 132.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: total.ISSQNtot?.vBC ?? '', x: 273.5, y: 771, largura: 132.5, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'VALOR TOTAL DO ISSQN', x: 409.5, y: 763, largura: 175.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, campo_1.campo)({ value: total.ISSQNtot?.vServ ?? '', x: 409.5, y: 771, largura: 175.5, alinhamento: 'right', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    }
    let alturaDaSecaoDoSetimoBloco = 786;
    let alturaDosTitulosDoSetimoBloco;
    if (!deveExibirQuadroDeCalculoDoIssqn) {
        alturaDaSecaoDoSetimoBloco = 754;
    }
    alturaDosTitulosDoSetimoBloco = alturaDaSecaoDoSetimoBloco + 9;
    if (folha === 0) {
        (0, secao_1.secao)({ doc, value: 'DADOS ADICIONAIS', x: 1.5, y: alturaDaSecaoDoSetimoBloco, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'INFORMAÇÕES COMPLEMENTARES', x: 1.5, y: alturaDosTitulosDoSetimoBloco, largura: 385.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
        (0, titulo_1.titulo)({ value: 'RESERVADO AO FISCO', x: 390, y: alturaDosTitulosDoSetimoBloco, largura: 195, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
    }
}
exports.criaLayout = criaLayout;
//# sourceMappingURL=cria-layout.js.map