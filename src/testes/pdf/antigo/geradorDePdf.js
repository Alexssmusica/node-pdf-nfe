"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarArquivoPDF = void 0;
const bwip_js_1 = __importDefault(require("bwip-js"));
const date_fns_1 = require("date-fns");
const path_1 = __importDefault(require("path"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const diretorioDeFontes = path_1.default.join(__dirname, './fontes');
const timesNewRoman = path_1.default.join(diretorioDeFontes, 'Times New Roman.ttf');
const timesNewRomanNegrito = path_1.default.join(diretorioDeFontes, 'Times New Roman Bold.ttf');
const timesNewRomanItalico = path_1.default.join(diretorioDeFontes, 'Times New Roman Italic.ttf');
const timesNewRomanNegritoItalico = path_1.default.join(diretorioDeFontes, 'Times New Roman Bold Italic.ttf');
const args = {
    ajusteY: 0,
    ajusteX: 0,
    autor: '',
    titulo: '',
    criador: '',
    tamanhoDaFonteDoTitulo: 6,
    corDoTitulo: 'black',
    alinhamentoDoTitulo: 'left',
    alinhamentoDoTituloDaTabela: 'center',
    tamanhoDaFonteDaSecao: 7,
    corDaSecao: 'black',
    tamanhoDaFonteDoCampo: 9.5,
    alinhamentoDoCampo: 'center',
    corDoCampo: 'black',
    tamanhoDaFonteDosItens: 7,
    separadorDeItens: true,
    ajusteYDoLogotipo: 0,
    ajusteYDaIdentificacaoDoEmitente: 0,
    ambiente: 'producao',
    opacidadeDaHomologacao: 0.2,
    ajusteYDaHomologacao: 275,
    tamanhoDoCodigoDeBarras: 32,
    corDoLayout: 'black',
    larguraDaPagina: 595.44,
    alturaDaPagina: 841.68,
    creditos: 'Impresso com Brasil.js - http://github.com/brasil-js/danfe'
};
function gerarArquivoPDF(danfe, callback) {
    const emitente = danfe.emitente;
    const destinatario = danfe.destinatario;
    const transportador = danfe.transportador;
    const impostos = danfe.impostos;
    const volumes = danfe.volumes;
    const protocolo = danfe.protocolo;
    const itens = danfe.itens;
    const fatura = danfe.fatura;
    let alturaDoBlocoFaturaDuplicatas = 0;
    let duplicatas = danfe.duplicatas;
    const pdf = new pdfkit_1.default({
        bufferPages: true,
        margin: 0,
        size: [
            args.larguraDaPagina,
            args.alturaDaPagina
        ],
        info: {
            Author: args.autor,
            Title: args.titulo,
            Creator: args.criador,
            Producer: 'http://github.com/brasil-js/danfe'
        }
    });
    const pdfTemporario = new pdfkit_1.default({
        margin: 0,
        size: [
            args.larguraDaPagina,
            args.alturaDaPagina
        ]
    });
    const deveExibirQuadroDeCalculoDoIssqn = danfe.valorTotalDosServicos !== undefined ||
        impostos.baseDeCalculoDoIssqn !== undefined ||
        impostos.valorTotalDoIssqn;
    pdf.registerFont('normal', timesNewRoman);
    pdf.registerFont('negrito', timesNewRomanNegrito);
    pdf.registerFont('italico', timesNewRomanItalico);
    pdf.registerFont('negrito-italico', timesNewRomanNegritoItalico);
    pdf.registerFont('codigoDeBarras', timesNewRoman);
    pdfTemporario.registerFont('normal', timesNewRoman);
    const grossuraDaLinha = 0.5;
    const margemTopo = 2.8;
    const margemEsquerda = 3;
    const margemDireita = 589.65;
    const larguraDoFormulario = margemDireita - margemEsquerda;
    pdf.lineWidth(grossuraDaLinha);
    function linhaHorizontal(x1, x2, y) {
        y = margemTopo + Number(args.ajusteY) + y;
        x1 = margemEsquerda + Number(args.ajusteX) + x1;
        x2 = margemDireita + Number(args.ajusteX) + x2;
        return pdf.moveTo(x1, y).lineTo(x2, y).stroke();
    }
    function linhaHorizontalTracejada(x1, x2, y) {
        y = margemTopo + Number(args.ajusteY) + y;
        x1 = margemEsquerda + Number(args.ajusteX) + x1;
        x2 = margemDireita + Number(args.ajusteX) + x2;
        return pdf.moveTo(x1, y).lineTo(x2, y).dash(3, { space: 5 }).stroke();
    }
    function linhaVertical(y1, y2, x) {
        x = margemEsquerda + Number(args.ajusteX) + x;
        y1 = margemTopo + Number(args.ajusteY) + y1;
        y2 = margemTopo + Number(args.ajusteY) + y2;
        return pdf.moveTo(x, y1).lineTo(x, y2).stroke();
    }
    function secao(value, x, y, largura, tamanho) {
        x = margemEsquerda + Number(args.ajusteX) + x;
        y = margemTopo + Number(args.ajusteY) + y;
        pdf.font('negrito')
            .fillColor(args.corDaSecao)
            .fontSize(tamanho ?? args.tamanhoDaFonteDaSecao)
            .text((value ?? '').toUpperCase(), x, y, {
            width: largura,
            align: 'left'
        });
    }
    function titulo(value, x, y, largura, alinhamento, tamanho) {
        x = margemEsquerda + Number(args.ajusteX) + x;
        y = margemTopo + Number(args.ajusteY) + y;
        pdf.font('normal')
            .fillColor(args.corDoTitulo)
            .fontSize(tamanho ?? args.tamanhoDaFonteDoTitulo)
            .text((value ?? '').toUpperCase(), x, y, {
            width: largura,
            align: alinhamento ?? args.alinhamentoDoTitulo
        });
    }
    function normal(pdf, value, x, y, largura, alinhamento, tamanho) {
        pdf.font('normal')
            .fillColor(args.corDoTitulo)
            .fontSize(tamanho ?? 8)
            .text(value ?? '', margemEsquerda + Number(args.ajusteX) + x, margemTopo + Number(args.ajusteY) + y, {
            width: largura,
            align: alinhamento ?? 'center',
            lineGap: -1.5
        });
    }
    function italico(value, x, y, largura, alinhamento, tamanho) {
        pdf.font('italico')
            .fillColor(args.corDoTitulo)
            .fontSize(tamanho ?? 6)
            .text(value ?? '', margemEsquerda + Number(args.ajusteX) + x, margemTopo + Number(args.ajusteY) + y, {
            width: largura,
            align: alinhamento ?? 'center',
            lineGap: -1.5
        });
    }
    function negrito(value, x, y, largura, alinhamento, tamanho) {
        pdf.font('negrito')
            .fillColor(args.corDoTitulo)
            .fontSize(tamanho ?? 6)
            .text(value ?? '', margemEsquerda + Number(args.ajusteX) + x, margemTopo + Number(args.ajusteY) + y, {
            width: largura,
            align: alinhamento ?? 'center',
            lineGap: -1.5
        });
    }
    function campo(value, x, y, largura, alinhamento, tamanho) {
        pdf.font('negrito')
            .fillColor(args.corDoCampo)
            .fontSize(tamanho ?? args.tamanhoDaFonteDoCampo)
            .text(value ?? '', margemEsquerda + Number(args.ajusteX) + x, margemTopo + Number(args.ajusteY) + y, {
            width: largura,
            align: alinhamento ?? args.alinhamentoDoCampo
        });
    }
    async function desenharPagina() {
        if (args.ambiente !== 'producao') {
            pdf.font('normal')
                .fillColor(args.corDoTitulo)
                .fontSize(50)
                .fillOpacity(args.opacidadeDaHomologacao)
                .text('HOMOLOGAÇÃO', margemEsquerda + Number(args.ajusteX) + 0, margemTopo + Number(args.ajusteY) + 400 + Number(args.ajusteYDaHomologacao), {
                width: larguraDoFormulario,
                align: 'center'
            });
            pdf.font('normal')
                .fillColor(args.corDoTitulo)
                .fontSize(25)
                .fillOpacity(args.opacidadeDaHomologacao)
                .text('SEM VALOR FISCAL', margemEsquerda + Number(args.ajusteX) + 0, margemTopo + Number(args.ajusteY) + 450 + Number(args.ajusteYDaHomologacao), {
                width: larguraDoFormulario,
                align: 'center'
            });
        }
        linhaHorizontal(0, 0, 0);
        linhaHorizontal(0, -110.5, 28.3);
        linhaHorizontal(0, 0, 51.1);
        linhaVertical(0, 51.1, 0);
        linhaVertical(28.3, 51.1, 99.2);
        linhaVertical(0, 51.1, 476);
        linhaVertical(0, 51.1, 0);
        linhaVertical(0, 51.1, larguraDoFormulario);
        linhaHorizontal(317.4, -255, 96.4);
        linhaVertical(96.4, 116.2, 317.4);
        linhaHorizontal(317.4, -255, 116.2);
        linhaVertical(96.4, 116.2, 331.55);
        linhaHorizontal(0, 0, 59.55);
        linhaHorizontal(340.05, 0, 104.8);
        linhaHorizontal(340.05, 0, 127.4);
        linhaHorizontal(0, 0, 150.2);
        linhaHorizontal(0, 0, 170);
        linhaHorizontal(0, 0, 190);
        linhaVertical(59.55, 190, 0);
        linhaVertical(59.55, 150.2, 240.75);
        linhaVertical(59.55, 170, 340.05);
        linhaVertical(59.55, 190, larguraDoFormulario);
        linhaVertical(170, 190, 195.55);
        linhaVertical(170, 190, 391);
        linhaHorizontal(0, 0, 201.2);
        linhaHorizontal(0, 0, 221);
        linhaHorizontal(0, 0, 241);
        linhaHorizontal(0, 0, 261);
        linhaVertical(201.2, 261, 0);
        linhaVertical(201.2, 221, 357.1);
        linhaVertical(221, 261, 274.9);
        linhaVertical(241, 261, 297.6);
        linhaVertical(221, 261, 396.75);
        linhaVertical(201.2, 261, 493.1);
        linhaVertical(201.2, 261, larguraDoFormulario);
        linhaHorizontal(0, 0, 269);
        linhaHorizontal(0, 0, 289);
        linhaHorizontal(0, 0, 309);
        linhaVertical(269, 309, 0);
        linhaVertical(269, 309, 87.7);
        linhaVertical(269, 309, (87.7 * 2) + 0.3);
        linhaVertical(269, 309, (87.7 * 3) + 0.4);
        linhaVertical(269, 309, (87.7 * 4) + 0.4);
        linhaVertical(269, 309, (87.7 * 5) + 0.6);
        linhaVertical(269, 309, (87.7 * 5) + 51.8);
        linhaVertical(269, 309, larguraDoFormulario);
        linhaHorizontal(0, 0, 320);
        linhaHorizontal(0, 0, 340);
        linhaHorizontal(0, 0, 360);
        linhaHorizontal(0, 0, 380);
        linhaVertical(320, 380, 0);
        linhaVertical(320, 340, 170);
        linhaVertical(320, 340, 346);
        linhaVertical(320, 360, 434);
        linhaVertical(320, 360, 456.65);
        linhaVertical(320, 380, 258);
        linhaVertical(360, 380, 59.6);
        linhaVertical(360, 380, 158.6);
        linhaVertical(360, 380, 357);
        linhaVertical(360, 380, 473.3);
        linhaVertical(320, 380, larguraDoFormulario);
        let alturaInicialDoQuadroDeItens = 381;
        let alturaInicialDoQuadroDeDuplicatas = alturaInicialDoQuadroDeItens;
        const alturaDeLinhaDeDuplicata = 23;
        const duplicatasPorLinha = 8;
        const larguraDaDuplicata = larguraDoFormulario / duplicatasPorLinha;
        let segundaLinhaDoQuadroDeItens;
        let linhasDeDuplicatas = 0;
        if (fatura !== undefined) {
            alturaDoBlocoFaturaDuplicatas += Number(args.tamanhoDaFonteDoTitulo);
            alturaInicialDoQuadroDeDuplicatas += 6.5;
        }
        if (duplicatas !== undefined && duplicatas.length > 0) {
            linhasDeDuplicatas = Math.ceil(duplicatas.length / duplicatasPorLinha);
            alturaDoBlocoFaturaDuplicatas += (linhasDeDuplicatas * alturaDeLinhaDeDuplicata) + 10;
        }
        else {
            alturaDoBlocoFaturaDuplicatas += Number(args.tamanhoDaFonteDoTitulo) + 3;
        }
        duplicatas = [];
        const margemDeCimaDaDuplicata = 2;
        const margemEsquerdaDaDuplicata = 2;
        const larguraDaDuplicataComMargem = larguraDaDuplicata - margemEsquerdaDaDuplicata - 1;
        let x1, x2, y;
        duplicatas.forEach(function (linha, indiceDaLinha) {
            linha.forEach(function (duplicata, indiceDaDuplicata) {
                x1 = indiceDaDuplicata * larguraDaDuplicata;
                x2 = x1 + larguraDaDuplicata - larguraDoFormulario;
                y = alturaInicialDoQuadroDeDuplicatas + (indiceDaLinha * alturaDeLinhaDeDuplicata);
                linhaHorizontal(x1, x2, y);
                linhaVertical(y, y + alturaDeLinhaDeDuplicata, x1);
                titulo('NÚM.', x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata, larguraDaDuplicataComMargem);
                titulo(duplicata.numero, x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata, larguraDaDuplicataComMargem, 'right');
                titulo('VENC.', x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata + Number(args.tamanhoDaFonteDoTitulo), larguraDaDuplicataComMargem, 'left');
                titulo(duplicata.vencimento, x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata + Number(args.tamanhoDaFonteDoTitulo), larguraDaDuplicataComMargem, 'right');
                titulo('VALOR', x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata + (2 * args.tamanhoDaFonteDoTitulo), larguraDaDuplicataComMargem, 'left');
                titulo(duplicata.valor, x1 + margemEsquerdaDaDuplicata, y + margemDeCimaDaDuplicata + (2 * args.tamanhoDaFonteDoTitulo), larguraDaDuplicataComMargem, 'right');
            });
            linhaVertical(y, y + alturaDeLinhaDeDuplicata, x1 + larguraDaDuplicata);
            linhaHorizontal(0, x2, y + alturaDeLinhaDeDuplicata);
        });
        alturaInicialDoQuadroDeItens += alturaDoBlocoFaturaDuplicatas;
        segundaLinhaDoQuadroDeItens = alturaInicialDoQuadroDeItens + 14.2;
        linhaHorizontal(0, 0, alturaInicialDoQuadroDeItens);
        linhaHorizontal(0, 0, segundaLinhaDoQuadroDeItens);
        linhaHorizontal(0, 0, 751);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 0);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 53.8);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 235.3);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 269.3);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 292);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 314.5);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 331.6);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 371.2);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 405.4);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 439.3);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 473.2);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 507.2);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 535.6);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, 555.4);
        linhaVertical(alturaInicialDoQuadroDeItens, 751, larguraDoFormulario);
        let alturaInicialDoSetimoBloco = 793.6;
        if (deveExibirQuadroDeCalculoDoIssqn) {
            linhaHorizontal(0, 0, 762.2);
            linhaHorizontal(0, 0, 782.2);
            linhaVertical(762.2, 782.2, 0);
            linhaVertical(762.2, 782.2, 136.1);
            linhaVertical(762.2, 782.2, (136.1 * 2) - 0.1);
            linhaVertical(762.2, 782.2, (136.1 * 3) - 0.1);
            linhaVertical(762.2, 782.2, larguraDoFormulario);
        }
        else {
            alturaInicialDoSetimoBloco = 762.2;
        }
        linhaHorizontal(0, 0, alturaInicialDoSetimoBloco);
        linhaHorizontal(0, 0, 821.8);
        linhaVertical(alturaInicialDoSetimoBloco, 821.8, 0);
        linhaVertical(alturaInicialDoSetimoBloco, 821.8, 388.25);
        linhaVertical(alturaInicialDoSetimoBloco, 821.8, larguraDoFormulario);
        linhaHorizontalTracejada(0, 0, 55.32);
        normal(pdf, [
            'Recebemos de',
            emitente.nome,
            'os produtos e/ou serviços constantes da nota',
            'fiscal eletrônica indicada abaixo.',
            'Emissão:',
            danfe.dataDaEmissaoFormatada,
            '- Valor Total:',
            danfe.dataDaEmissao,
            '- Destinatário:',
            destinatario.nome,
            '- Endereço:',
            destinatario.endereco.logradouro
        ].join(' ').toUpperCase(), 1.5, 3, 472.5, 'justify', 6.9);
        titulo('DANFE', 266.5, 63.5, 197, 'left', 14);
        normal(pdf, 'NF-e', 476.6, 1.8, 110, 'center', 14);
        normal(pdf, danfe.numero, 476.6, 22, 110, 'center', 10);
        normal(pdf, danfe.serie, 476.6, 31.5, 110, 'center', 10);
        italico('IDENTIFICAÇÃO DO EMITENTE', 1, 60, 238);
        const temLogotipo = emitente.logotipo;
        const identificacaoDoEmitenteY = temLogotipo !== undefined ? 78 : 84;
        const identificacaoDoEmitenteX = temLogotipo !== undefined ? 67 : 1.5;
        const identificacaoDoEmitenteLargura = temLogotipo !== undefined ? 172 : 237;
        const identificacaoDoEmitenteFonte = temLogotipo !== undefined ? 0 : 1.5;
        if (temLogotipo !== undefined) {
            const caminhoDoLogotipo = emitente.logotipo;
            pdf.image(caminhoDoLogotipo, margemEsquerda + Number(args.ajusteX) + 4.5, margemTopo + Number(args.ajusteY) + Number(args.ajusteYDoLogotipo) + 78, {
                fit: [60, 60]
            });
        }
        negrito(emitente.nome, identificacaoDoEmitenteX, identificacaoDoEmitenteY + Number(args.ajusteYDaIdentificacaoDoEmitente), identificacaoDoEmitenteLargura, 'center', 8 + identificacaoDoEmitenteFonte);
        if (emitente.endereco.logradouro !== undefined) {
            normal(pdf, emitente.endereco.logradouro, identificacaoDoEmitenteX, pdf.y - margemTopo + 2, identificacaoDoEmitenteLargura, 'center', 6 + identificacaoDoEmitenteFonte);
        }
        if (emitente.endereco.cidade !== undefined) {
            normal(pdf, emitente.endereco.cidade, identificacaoDoEmitenteX, pdf.y - margemTopo, identificacaoDoEmitenteLargura, 'center', 6 + identificacaoDoEmitenteFonte);
        }
        let jaAdicionouEspacamento = false;
        if (emitente.telefone !== undefined) {
            jaAdicionouEspacamento = true;
            normal(pdf, 'Telefone: ' + String(emitente.telefone), identificacaoDoEmitenteX, pdf.y - margemTopo + 2, identificacaoDoEmitenteLargura, 'center', 6 + identificacaoDoEmitenteFonte);
        }
        if (emitente.email !== undefined) {
            normal(pdf, 'Email: ' + String(emitente.email), identificacaoDoEmitenteX, pdf.y - margemTopo + (jaAdicionouEspacamento ? 0 : 2), identificacaoDoEmitenteLargura, 'center', 6 + identificacaoDoEmitenteFonte);
        }
        normal(pdf, 'Documento Auxiliar da Nota Fiscal Eletrônica', 241.5, 77, 99.5);
        normal(pdf, '0 - ENTRADA', 248, 100, 99.5, 'left');
        normal(pdf, '1 - SAÍDA', 248, 108.5, 99.5, 'left');
        negrito(danfe.tipo, 317.5, 96.8, 14.5, 'center', 18);
        const formularioDeSeguranca = danfe.formularioDeSeguranca;
        if (protocolo !== undefined) {
            normal(pdf, 'Consulta de autenticidade no portal nacional da NF-e', 340.5, 130, 244);
            normal(pdf, 'www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora', 340.5, 138, 244);
        }
        else if (formularioDeSeguranca !== undefined) {
            const optionsCep = {
                bcid: 'code128',
                text: formularioDeSeguranca.dadosDaNfe(),
                height: 341.5,
                width: 131.5
            };
            const barcodeCep = await bwip_js_1.default.toBuffer(optionsCep);
            pdf.image(barcodeCep, 341.5, 131.5);
        }
        const informacoesComplementares = [
            danfe.InformacoesComplementares
        ];
        if (formularioDeSeguranca !== undefined) {
            informacoesComplementares.unshift([
                'DANFE EM CONTINGÊNCIA, ',
                'IMPRESSO EM DECORRÊNCIA DE PROBLEMAS TÉCNICOS: ',
                formularioDeSeguranca.justificativa.toUpperCase()
            ].join(''));
        }
        normal(pdf, informacoesComplementares.join(' - '), 1, alturaInicialDoSetimoBloco + 7.5, 386, 'justify', 6);
        normal(pdf, danfe.numero, 241.2, 119.5, 98.5, 'center', 10);
        normal(pdf, danfe.serie, 241.2, 129.5, 98.5, 'center', 10);
        titulo('DATA DE RECEBIMENTO', 1.5, 29, 97);
        titulo('IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR', 100.5, 29, 374);
        titulo('CHAVE DE ACESSO', 341.5, 105.5, 244);
        campo(danfe.chaveDeAcesso, 341.5, 114, 244);
        if (protocolo !== undefined) {
            titulo('PROTOCOLO DE AUTORIZAÇÃO DE USO', 341.5, 151, 244);
            campo(`${String(protocolo.codigo)} - ${(0, date_fns_1.format)(protocolo.data, 'dd/MM/yyyy HH:mm:ss')}`, 341.5, 158.4, 244);
        }
        else if (formularioDeSeguranca !== undefined) {
            titulo('DADOS DA NFE', 341.5, 151, 244);
            campo(formularioDeSeguranca.dadosDaNfe, 341.5, 158.4, 244);
        }
        titulo('NATUREZA DA OPERAÇÃO', 1.5, 151, 338);
        campo(danfe.naturezaDaOperacao, 1.5, 158.4, 338);
        titulo('INSCRIÇÃO ESTADUAL', 1.5, 171, 192.5);
        campo(emitente.inscricaoEstadual, 1.5, 178.4, 192.5);
        titulo('INSCRIÇÃO ESTADUAL DO SUBST. TRIBUT.', 197, 171, 192.5);
        campo(danfe.inscricaoEstadualDoSubstitutoTributario, 197, 178.4, 192.5);
        titulo('CNPJ', 392.5, 171, 192.5);
        campo(emitente.registroNacional, 392.5, 178.4, 192.5);
        secao('DESTINATÁRIO / REMETENTE', 1.5, 194, 0, undefined);
        titulo('NOME / RAZÃO SOCIAL', 1.5, 202, 353.5);
        campo(destinatario.nome, 1.5, 210, 353.5, 'left');
        titulo('CNPJ / CPF', 358, 202, 133.5);
        campo(destinatario.registroNacional, 358, 210, 133.5);
        titulo('DATA DA EMISSÃO', 495, 202, 90);
        campo(danfe.dataDaEmissaoFormatada, 495, 210, 90);
        titulo('ENDEREÇO', 1.5, 222, 272);
        campo(destinatario.endereco.logradouro, 1.5, 230, 272, 'left', args.tamanhoDaFonteDoCampo - 0.5);
        titulo('BAIRRO / DISTRITO', 276, 222, 119);
        campo(destinatario.endereco.bairro, 276, 230, 119);
        titulo('CEP', 398, 222, 93);
        campo(destinatario.endereco.cep, 398, 230, 93);
        titulo('DATA DA SAÍDA', 495, 222, 90);
        campo((0, date_fns_1.format)(danfe.dataDaEntradaOuSaida, 'dd/MM/yyyy HH:mm:ss'), 495, 230, 90);
        titulo('MUNICÍPIO', 1.5, 242, 272);
        campo(destinatario.endereco.municipio, 1.5, 250, 272, 'left');
        titulo('UF', 276, 242, 20);
        campo(destinatario.endereco.uf, 276, 250, 20);
        titulo('FONE / FAX', 299, 242, 96);
        campo(destinatario.telefone, 299, 250, 96);
        titulo('INSCRIÇÃO ESTADUAL', 398, 242, 93);
        campo(destinatario.inscricaoEstadual, 398, 250, 93);
        titulo('HORA DA SAÍDA', 495, 242, 90);
        campo(danfe.horarioDaEntradaOuSaida, 495, 250, 90);
        secao('CÁLCULO DO IMPOSTO', 1.5, 261.5, 0, undefined);
        titulo('BASE DE CÁLCULO DO ICMS', 1.5, 270, 84);
        campo(impostos.baseDeCalculoDoIcms, 1.5, 278, 84, 'right');
        titulo('VALOR DO ICMS', 89, 270, 84);
        campo(impostos.valorDoIcms, 89, 278, 84, 'right');
        titulo('BASE DE CÁLC. ICMS S.T.', 177, 270, 84);
        campo(impostos.baseDeCalculoDoIcmsSt, 177, 278, 84, 'right');
        titulo('VALOR DO ICMS SUBST.', 265, 270, 84);
        campo(impostos.valorDoIcmsSt, 265, 278, 84, 'right');
        titulo('VALOR IMP. IMPORTAÇÃO', 353, 270, 84);
        campo(impostos.valorDoImpostoDeImportacao, 353, 278, 84, 'right');
        titulo('VALOR DO PIS', 441, 270, 47);
        campo(impostos.valorDoPis, 441, 278, 47, 'right');
        titulo('VALOR TOTAL DOS PRODUTOS', 492, 270, 93);
        campo(danfe.valorTotalDosProdutos, 492, 278, 93, 'right');
        titulo('VALOR DO FRETE', 1.5, 290, 84);
        campo(danfe.valorDoFrete, 1.5, 298, 84, 'right');
        titulo('VALOR DO SEGURO', 89, 290, 84);
        campo(danfe.valorDoSeguro, 89, 298, 84, 'right');
        titulo('DESCONTO', 177, 290, 84);
        campo(danfe.desconto, 177, 298, 84, 'right');
        titulo('OUTRAS DESPESAS', 265, 290, 84);
        campo(danfe.uutrasDespesas, 265, 298, 84, 'right');
        titulo('VALOR TOTAL DO IPI', 353, 290, 84);
        campo(impostos.valorTotalDoIpi, 353, 298, 84, 'right');
        titulo('VALOR DA COFINS', 440.5, 290.5, 47, undefined, Number(args.tamanhoDaFonteDoTitulo) - 1);
        campo(impostos.valorDaCofins, 440.5, 298, 47, 'right');
        titulo('VALOR TOTAL DA NOTA', 492, 290, 93);
        campo(danfe.valorTotalDaNota, 492, 298, 93, 'right');
        secao('TRANSPORTADOR / VOLUMES TRANSPORTADOS', 1.5, 312.5, 0, undefined);
        titulo('NOME / RAZÃO SOCIAL', 1.5, 321, 166.5);
        campo(transportador.nome, 1.5, 329, 166.5, 'left');
        titulo('FRETE POR CONTA', 171.5, 321, 85);
        campo(danfe.modalidadeDoFrete, 171.5, 329, 85);
        titulo('CÓDIGO ANTT', 259.5, 321, 84);
        campo(transportador.codigoAntt, 259.5, 329, 84);
        titulo('PLACA DO VEÍCULO', 347.5, 321, 84);
        campo(transportador.placaDoVeiculo, 347.5, 329, 84);
        titulo('UF', 435.5, 321, 19.5);
        campo(transportador.ufDaPlacaDoVeiculo, 435.5, 329, 19.5);
        titulo('CNPJ / CPF', 458, 321, 126.5);
        campo(transportador.registroNacional, 458, 329, 126.5);
        titulo('ENDEREÇO', 1.5, 341, 254);
        campo(transportador.endereco.logradouro, 1.5, 349, 254, 'left', Number(args.tamanhoDaFonteDoCampo) - 0.5);
        titulo('MUNICÍPIO', 259.5, 341, 172);
        campo(transportador.endereco.municipio, 259.5, 349, 172);
        titulo('UF', 435.5, 341, 19.5);
        campo(transportador.endereco.uf, 435.5, 349, 19.5);
        titulo('INSCRIÇÃO ESTADUAL', 458, 341, 126.5);
        campo(transportador.inscricaoEstadual, 458, 349, 126.5);
        titulo('QUANTIDADE', 1.5, 361, 56.5);
        campo(volumes.quantidade, 1.5, 369, 56.5);
        titulo('ESPÉCIE', 60.8, 361, 96);
        campo(volumes.especie, 60.8, 369, 96);
        titulo('MARCA', 160, 361, 96);
        campo(volumes.marca, 160, 369, 96);
        titulo('NUMERAÇÃO', 259.5, 361, 96);
        campo(volumes.numeracao, 259.5, 369, 96);
        titulo('PESO BRUTO', 358.5, 361, 112.5);
        campo(volumes.pesoBruto, 358.5, 369, 112.5);
        titulo('PESO LÍQUIDO', 474.5, 361, 110.5);
        campo(volumes.pesoLiquido, 474.5, 369, 110.5);
        let alturaDaSecaoDosItens = 383;
        let alturaDosTitulosDosItens;
        if (fatura !== undefined || duplicatas.length > 0) {
            secao('FATURA / DUPLICATAS', 1.5, 383, 0, undefined);
            alturaDaSecaoDosItens += alturaDoBlocoFaturaDuplicatas;
        }
        if (fatura !== undefined) {
            const dadosDaFatura = [];
            if (fatura.getNumero() !== undefined) {
                dadosDaFatura.push('NÚMERO: ' + String(fatura.numero));
                dadosDaFatura.push('VALOR ORIGINAL: ' + String(fatura.valorOriginal));
                dadosDaFatura.push('VALOR DO DESCONTO: ' + String(fatura.valorDoDesconto));
                dadosDaFatura.push('VALOR LÍQUIDO: ' + String(fatura.valorLiquido));
            }
            if (fatura.getFormaDePagamento() !== undefined) {
                dadosDaFatura.push('PAGAMENTO: ' + String(fatura.formaDePagamento));
            }
            const linhaDadosDaFatura = dadosDaFatura.join(' - ');
            if (linhaDadosDaFatura !== undefined) {
                negrito(linhaDadosDaFatura, 1.5, 390, larguraDoFormulario, 'left');
            }
        }
        alturaDosTitulosDosItens = alturaDaSecaoDosItens + 12;
        secao('DADOS DOS PRODUTOS / SERVIÇOS', 1.5, alturaDaSecaoDosItens, 0, undefined);
        titulo('CÓDIGO', 1.5, alturaDosTitulosDosItens, 50.5, args.alinhamentoDoTituloDaTabela);
        titulo('DESCRIÇÃO DO PRODUTO / SERVIÇO', 55, alturaDosTitulosDosItens, 179, args.alinhamentoDoTituloDaTabela);
        titulo('NCM/SH', 236.5, alturaDosTitulosDosItens, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('O/CST', 270.5, alturaDosTitulosDosItens, 20, args.alinhamentoDoTituloDaTabela);
        titulo('CFOP', 293.5, alturaDosTitulosDosItens, 19.5, args.alinhamentoDoTituloDaTabela);
        titulo('UN.', 316, alturaDosTitulosDosItens, 14.5, args.alinhamentoDoTituloDaTabela);
        titulo('QUANT.', 333, alturaDosTitulosDosItens, 37, args.alinhamentoDoTituloDaTabela);
        titulo('VALOR UNIT.', 373, alturaDosTitulosDosItens - 4, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('VALOR TOTAL', 407.5, alturaDosTitulosDosItens - 4, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('B. CÁLC. ICMS', 441.5, alturaDosTitulosDosItens - 4, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('VALOR ICMS', 475, alturaDosTitulosDosItens - 4, 31.5, args.alinhamentoDoTituloDaTabela);
        titulo('VALOR IPI', 508, alturaDosTitulosDosItens - 4, 28, args.alinhamentoDoTituloDaTabela);
        titulo('ALÍQ. ICMS', 532, alturaDosTitulosDosItens - 4, 28, args.alinhamentoDoTituloDaTabela);
        titulo('ALÍQ. IPI', 557, alturaDosTitulosDosItens, 28, args.alinhamentoDoTituloDaTabela);
        if (deveExibirQuadroDeCalculoDoIssqn !== undefined) {
            secao('CÁLCULO DO ISSQN', 1.5, 754.5, 0, undefined);
            titulo('INSCRIÇÃO MUNICIPAL', 1.5, 763, 132.5);
            campo(emitente.inscricaoMunicipal, 1.5, 771, 132.5, 'left');
            titulo('VALOR TOTAL DOS SERVIÇOS', 137.5, 763, 132.5);
            campo(danfe.valorTotalDosServicos, 137.5, 771, 132.5, 'right');
            titulo('BASE DE CÁLCULO DO ISSQN', 273.5, 763, 132.5);
            campo(impostos.baseDeCalculoDoIssqn, 273.5, 771, 132.5, 'right');
            titulo('VALOR TOTAL DO ISSQN', 409.5, 763, 175.5);
            campo(impostos.valorTotalDoIssqn, 409.5, 771, 175.5, 'right');
        }
        let alturaDaSecaoDoSetimoBloco = 786;
        let alturaDosTitulosDoSetimoBloco;
        if (!deveExibirQuadroDeCalculoDoIssqn) {
            alturaDaSecaoDoSetimoBloco = 754;
        }
        alturaDosTitulosDoSetimoBloco = alturaDaSecaoDoSetimoBloco + 9;
        secao('DADOS ADICIONAIS', 1.5, alturaDaSecaoDoSetimoBloco, 0, undefined);
        titulo('INFORMAÇÕES COMPLEMENTARES', 1.5, alturaDosTitulosDoSetimoBloco, 385);
        titulo('RESERVADO AO FISCO', 390, alturaDosTitulosDoSetimoBloco, 195);
        if (args.creditos !== undefined) {
            italico(args.creditos, 1.5, 827, larguraDoFormulario);
        }
    }
    void desenharPagina();
    let numeroDePaginas = 1;
    const yInicialDosItens = 406 + alturaDoBlocoFaturaDuplicatas;
    let yDoItemAtual = yInicialDosItens;
    let alturaAtual = 0;
    itens.forEach(async function (item) {
        function renderizarLinha(pdf) {
            if (item.codigo === '0' || item.codigo === '29' || item.codigo === '58') {
                console.log(pdf.y);
            }
            normal(pdf, item.codigo, 1.5, yDoItemAtual, 51, 'center', args.tamanhoDaFonteDosItens);
            let maiorY = pdf.y;
            let descricao = item.descricao;
            if (item.informacoesAdicionais !== undefined) {
                descricao += '\n' + item.informacoesAdicionais;
            }
            normal(pdf, descricao, 55.5, yDoItemAtual, 178, 'justify', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.ncmSh, 235.5, yDoItemAtual, 32.5, 'center', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.oCst, 270, yDoItemAtual, 21, 'center', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.cfop, 293.5, yDoItemAtual, 21, 'center', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.unidade, 315, yDoItemAtual, 16.5, 'center', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.quantidade, 332.5, yDoItemAtual, 37.5, 'right', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.valorUnitario, 372, yDoItemAtual, 32.5, 'right', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.valorTotal, 407, yDoItemAtual, 31, 'right', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.baseDeCalculoDoIcms, 440, yDoItemAtual, 32.5, 'right', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.baseDeCalculoDoIcms, 440, yDoItemAtual, 32.5, 'right', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.valorDoIcms, 474.5, yDoItemAtual, 32, 'right', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.valorDoIpi, 508.5, yDoItemAtual, 26, 'right', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.aliquotaDoIcms, 536, yDoItemAtual + 0.65, 19, 'center', args.tamanhoDaFonteDosItens - 1);
            maiorY = Math.max(maiorY, pdf.y);
            normal(pdf, item.aliquotaDoIpi, 556.5, yDoItemAtual, 29, 'center', args.tamanhoDaFonteDosItens);
            maiorY = Math.max(maiorY, pdf.y);
            if (args.separadorDeItens !== undefined) {
                linhaHorizontalTracejada(0, 0, maiorY);
            }
            return Number(maiorY) + (args.separadorDeItens !== undefined ? 2 : 0);
        }
        const altura = renderizarLinha(pdfTemporario) - yDoItemAtual;
        if (alturaAtual + altura > (751 - yInicialDosItens)) {
            numeroDePaginas += 1;
            pdf.addPage({
                margin: 0,
                size: [
                    args.larguraDaPagina,
                    args.alturaDaPagina
                ]
            });
            pdf.y = 0;
            yDoItemAtual = yInicialDosItens;
            alturaAtual = 0;
            void desenharPagina();
        }
        renderizarLinha(pdf);
        alturaAtual += altura;
        yDoItemAtual = yDoItemAtual + altura;
    });
    const paginas = pdf.bufferedPageRange();
    for (let i = paginas.start; i < paginas.start + paginas.count; i++) {
        pdf.switchToPage(i);
        italico('FOLHA ' + (i + 1) + '/' + String(numeroDePaginas), 241.2, 141.2, 98.5, 'center', 8);
    }
    pdf.flushPages();
    pdf.end();
    callback(undefined, pdf);
}
exports.gerarArquivoPDF = gerarArquivoPDF;
//# sourceMappingURL=geradorDePdf.js.map