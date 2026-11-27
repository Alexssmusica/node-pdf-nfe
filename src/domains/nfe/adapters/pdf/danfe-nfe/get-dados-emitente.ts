import Bwipjs from '@bwip-js/node';
import {
  formatCnpj,
  formatDateTime,
  formatKey,
  formatPhone,
  formatPostalCode,
  formatProtocol,
  formatStateRegistration
} from '../../../shared/formatacao';
import type { GeneratePdf } from './tipos-layout';
import { celulasComPeso } from './celulas-layout';
import { campo } from './campo';
import { DEFAULT_NFE } from './default';
import { italico } from './italico';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { negrito } from './negrito';
import { normal } from './normal';
import { titulo } from './titulo';

export async function getDadosEmitente({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  geometria,
  emit,
  protNFe,
  pathLogo,
  ide,
  folha
}: GeneratePdf.InputDadosEmitente): Promise<void> {
  const [colEmitente, colDanfe, colChave] = celulasComPeso(larguraDoFormulario, [241, 99, 247]);
  const xDivDanfe = colDanfe.x;
  const xDivChave = colChave.x;
  const escalaVertical = geometria.alturaBlocoEmitente / 130.45;
  const sy = (delta: number) => y + delta * escalaVertical;
  const escalaFonte = geometria.orientacao === 'PAISAGEM' ? escalaVertical : 1;
  const tCampo = geometria.tamanhoDaFonteDoCampo;
  const xEntradaSaida = colDanfe.x + colDanfe.largura * 0.07;
  const inicioQuadradoTpNf = geometria.orientacao === 'PAISAGEM' ? 0.77 : 0.75;
  const fimQuadradoTpNf = geometria.orientacao === 'PAISAGEM' ? 0.87 : 0.95;
  const xTpNf = colDanfe.x + colDanfe.largura * inicioQuadradoTpNf;
  const larguraTpNf = colDanfe.largura * (fimQuadradoTpNf - inicioQuadradoTpNf);
  const xTituloDanfe = colDanfe.x + colDanfe.largura * 0.26;
  const xNumeroSerie = colDanfe.x + 0.5;
  const larguraDanfe = colDanfe.largura - 1;
  const larguraChave = colChave.largura - 3;
  const larguraNatOp = xDivChave - 1.5;
  const larguraEmitente = colEmitente.largura - 3;

  linhaHorizontal({
    x1: xDivDanfe,
    x2: -colChave.largura,
    y: sy(53.1),
    doc,
    ajusteX,
    ajusteY,
    margemDireita,
    margemEsquerda,
    margemTopo
  });
  linhaHorizontal({
    x1: xDivDanfe,
    x2: -colChave.largura,
    y: sy(72.9),
    doc,
    ajusteX,
    ajusteY,
    margemDireita,
    margemEsquerda,
    margemTopo
  });
  linhaVertical({
    y1: sy(53.1),
    y2: sy(72.9),
    x: xDivDanfe + colDanfe.largura * inicioQuadradoTpNf,
    doc,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  linhaVertical({
    y1: sy(53.1),
    y2: sy(72.9),
    x: xDivDanfe + colDanfe.largura * fimQuadradoTpNf,
    doc,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  linhaHorizontal({ x1: 0, x2: 0, y: sy(15.25), doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: xDivChave, x2: 0, y: sy(60.5), doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: xDivChave, x2: 0, y: sy(83.1), doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: sy(105.9), doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: sy(125.7), doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: sy(145.7), doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaVertical({ y1: sy(15.25), y2: sy(145.7), x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: sy(15.25), y2: sy(105.7), x: xDivDanfe, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: sy(15.25), y2: sy(125.7), x: xDivChave, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: sy(15.25), y2: sy(145.7), x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  const faixasEmitente = faixasIdentificacaoEmitente(larguraDoFormulario, emit);
  faixasEmitente.forEach((faixa, indice) => {
    if (indice > 0) {
      linhaVertical({ y1: sy(125.7), y2: sy(145.7), x: faixa.x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    }
  });
  titulo({
    value: 'DANFE',
    x: xTituloDanfe,
    y: sy(19.2),
    largura: colDanfe.largura + colChave.largura * 0.2,
    alinhamento: 'left',
    tamanho: geometria.orientacao === 'PAISAGEM' ? 14 * escalaFonte : 14,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  italico({
    doc,
    value: 'IDENTIFICAÇÃO DO EMITENTE',
    x: 1,
    y: sy(15.7),
    largura: larguraEmitente,
    alinhamento: 'center',
    tamanho: geometria.orientacao === 'PAISAGEM' ? 10 * escalaFonte : 10,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });

  const identificacaoDoEmitenteY = pathLogo !== undefined ? sy(33.7) : sy(39.7);
  const identificacaoDoEmitenteX = pathLogo !== undefined ? colEmitente.x + colEmitente.largura * 0.27 : 1.5;
  const identificacaoDoEmitenteLargura = pathLogo !== undefined ? colEmitente.largura * 0.72 : larguraEmitente;
  const identificacaoDoEmitenteFonte = pathLogo !== undefined ? 0 : 1.5;

  if (pathLogo !== undefined) {
    if (geometria.alturaCanhotoTopo > 0) {
      if (folha === 0) {
        doc.image(pathLogo, margemEsquerda + ajusteX + 4.5, margemTopo + ajusteY + DEFAULT_NFE.ajusteYDoLogotipo + 78, {
          fit: [60, 60]
        });
      } else {
        doc.image(pathLogo, margemEsquerda + ajusteX + 4.5, margemTopo + ajusteY + DEFAULT_NFE.ajusteYDoLogotipo + 33, {
          fit: [60, 60]
        });
      }
    } else {
      const topoLogo = sy(26);
      const larguraDisponivelLogo = colEmitente.largura * 0.27 - 9;
      const tamanhoLogoPaisagem = Math.min(sy(103) - topoLogo, larguraDisponivelLogo);
      doc.image(pathLogo, margemEsquerda + ajusteX + 4.5, margemTopo + ajusteY + topoLogo, {
        fit: [tamanhoLogoPaisagem, tamanhoLogoPaisagem]
      });
    }
  }

  negrito({
    doc,
    value: emit.xNome,
    x: identificacaoDoEmitenteX,
    y: identificacaoDoEmitenteY + DEFAULT_NFE.ajusteYDaIdentificacaoDoEmitente,
    largura: identificacaoDoEmitenteLargura,
    alinhamento: 'center',
    tamanho: 8 + identificacaoDoEmitenteFonte,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  normal({
    doc,
    value: `${emit.enderEmit.xLgr}, ${emit.enderEmit.nro} ${emit.enderEmit.xCpl ?? ''}`,
    x: identificacaoDoEmitenteX,
    y: doc.y - margemTopo + 2,
    largura: identificacaoDoEmitenteLargura,
    alinhamento: 'center',
    tamanho: 6 + identificacaoDoEmitenteFonte,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  normal({
    doc,
    value: `${emit.enderEmit.xBairro}. ${emit.enderEmit.xMun}-${emit.enderEmit.UF}`,
    x: identificacaoDoEmitenteX,
    y: doc.y - margemTopo,
    largura: identificacaoDoEmitenteLargura,
    alinhamento: 'center',
    tamanho: 6 + identificacaoDoEmitenteFonte,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });

  if (emit.enderEmit && emit.enderEmit.CEP !== undefined) {
    normal({
      doc,
      value: 'CEP: ' + formatPostalCode(emit.enderEmit.CEP),
      x: identificacaoDoEmitenteX,
      y: doc.y - margemTopo + 2,
      largura: identificacaoDoEmitenteLargura,
      alinhamento: 'center',
      tamanho: 6 + identificacaoDoEmitenteFonte,
      ajusteX,
      ajusteY,
      margemEsquerda,
      margemTopo
    });
  }

  if (emit.enderEmit && emit.enderEmit.fone !== undefined) {
    normal({
      doc,
      value: 'Telefone: ' + formatPhone(emit.enderEmit.fone),
      x: identificacaoDoEmitenteX,
      y: doc.y - margemTopo + 2,
      largura: identificacaoDoEmitenteLargura,
      alinhamento: 'center',
      tamanho: 6 + identificacaoDoEmitenteFonte,
      ajusteX,
      ajusteY,
      margemEsquerda,
      margemTopo
    });
  }

  normal({
    doc,
    value: 'Documento Auxiliar da Nota Fiscal Eletrônica',
    x: xNumeroSerie,
    y: sy(32.7),
    largura: larguraDanfe,
    alinhamento: 'center',
    tamanho: geometria.orientacao === 'PAISAGEM' ? 6.5 * escalaFonte : 10,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  normal({
    doc,
    value: '0 - ENTRADA',
    x: xEntradaSaida,
    y: sy(55.7),
    largura: larguraDanfe,
    alinhamento: 'left',
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  normal({
    doc,
    value: '1 - SAÍDA',
    x: xEntradaSaida,
    y: sy(64.2),
    largura: larguraDanfe,
    alinhamento: 'left',
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });

  normal({
    doc,
    value: ide.tpNF,
    x: xTpNf,
    y: sy(52.5),
    largura: larguraTpNf,
    alinhamento: 'center',
    tamanho: geometria.orientacao === 'PAISAGEM' ? 18 * escalaFonte : 18,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  normal({
    doc,
    value: 'Consulta de autenticidade no portal nacional da NF-e',
    x: xDivChave + 1.5,
    y: sy(85.7),
    largura: larguraChave,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  normal({
    doc,
    value: 'www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora',
    x: xDivChave + 1.5,
    y: sy(93.7),
    largura: larguraChave,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });

  normal({
    doc,
    value: 'Nº. ' + ide.nNF.padStart(9, '0').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'),
    x: xNumeroSerie,
    y: sy(75.2),
    largura: larguraDanfe,
    alinhamento: 'center',
    tamanho: geometria.orientacao === 'PAISAGEM' ? 10 * escalaFonte : 10,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  normal({
    doc,
    value: 'Série ' + ide.serie,
    x: xNumeroSerie,
    y: sy(85.2),
    largura: larguraDanfe,
    alinhamento: 'center',
    tamanho: geometria.orientacao === 'PAISAGEM' ? 10 * escalaFonte : 10,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  const options =
    geometria.orientacao === 'PAISAGEM'
      ? {
          bcid: 'code128',
          text: protNFe.infProt.chNFe,
          height: 10,
          scale: 3,
          includetext: false
        }
      : {
          bcid: 'code128',
          text: protNFe.infProt.chNFe,
          height: 15,
          width: 130
        };
  const barcodeCep = await Bwipjs.toBuffer(options);
  if (geometria.orientacao === 'PAISAGEM') {
    const topoCelulaChave = sy(15.25);
    const baseCelulaChave = sy(60.5);
    const alturaUtilBarra = baseCelulaChave - topoCelulaChave - 5;
    const larguraBarra = colChave.largura * 0.85;
    const xBarra = xDivChave + (colChave.largura - larguraBarra) / 2;
    doc.image(barcodeCep, margemEsquerda + ajusteX + xBarra, margemTopo + ajusteY + topoCelulaChave + 2.5, {
      fit: [larguraBarra, alturaUtilBarra],
      align: 'center',
      valign: 'center'
    });
  } else {
    const posYBarra = sy(22.7);
    const fitBarra: [number, number] = [Math.min(230, larguraChave), 50];
    doc.image(barcodeCep, margemEsquerda + ajusteX + xDivChave + 10, margemTopo + ajusteY + posYBarra, {
      fit: fitBarra
    });
  }
  titulo({
    value: 'CHAVE DE ACESSO',
    x: xDivChave + 1.5,
    y: sy(61.2),
    largura: larguraChave,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatKey(protNFe.infProt.chNFe),
    x: xDivChave + 1.5,
    y: sy(67.7),
    largura: larguraChave,
    tamanho: tCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'PROTOCOLO DE AUTORIZAÇÃO DE USO',
    x: xDivChave + 1.5,
    y: sy(106.7),
    largura: larguraChave,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: `${formatProtocol(protNFe.infProt.nProt)} - ${formatDateTime(protNFe.infProt.dhRecbto)}`,
    x: xDivChave + 1.5,
    y: sy(114.1),
    largura: larguraChave,
    tamanho: tCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'NATUREZA DA OPERAÇÃO',
    x: 1.5,
    y: sy(106.7),
    largura: larguraNatOp,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: ide.natOp,
    x: 1.5,
    y: sy(114.1),
    largura: larguraNatOp,
    tamanho: tCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  faixasEmitente.forEach((faixa) => {
    titulo({
      value: faixa.titulo,
      x: faixa.x + 1.5,
      y: sy(126.7),
      largura: faixa.largura - 3,
      tamanho: faixa.titulo.length > 32 ? 5 : 6,
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo
    });
    if (faixa.valor) {
      campo({
        value: faixa.valor,
        x: faixa.x + 1.5,
        y: sy(134.1),
        tamanho: tCampo,
        largura: faixa.largura - 3,
        ajusteX,
        ajusteY,
        doc,
        margemEsquerda,
        margemTopo
      });
    }
  });

  doc.y = margemTopo + ajusteY + sy(145.7);
}

function descricaoCrt(crt: string): string {
  switch (crt) {
    case '1':
      return '1 - SIMPLES NACIONAL';
    case '2':
      return '2 - SIMPLES NACIONAL - EXCESSO';
    case '3':
      return '3 - REGIME NORMAL';
    case '4':
      return '4 - MEI';
    default:
      return crt;
  }
}

function faixasIdentificacaoEmitente(
  larguraDoFormulario: number,
  emit: GeneratePdf.InputDadosEmitente['emit']
): Array<{ x: number; largura: number; titulo: string; valor: string }> {
  const pesos = [1.05, 1.25, 1.05, 1.35, 1.65];
  const soma = pesos.reduce((total, peso) => total + peso, 0);
  const faixas = [
    { titulo: 'INSCRIÇÃO ESTADUAL', valor: formatStateRegistration(emit.IE) },
    { titulo: 'INSC. ESTADUAL DO SUBST. TRIBUT.', valor: formatStateRegistration(emit.IEST ?? '') ?? '' },
    { titulo: 'CNPJ / CPF', valor: formatCnpj(emit.CNPJ ?? '') },
    { titulo: 'CÓDIGO DO REGIME TRIBUTÁRIO', valor: descricaoCrt(emit.CRT) },
    { titulo: 'TIPO DE REGIME DE APURAÇÃO DO IBS E DA CBS', valor: '' }
  ];
  let cursor = 0;
  return faixas.map((faixa, indice) => {
    const largura = indice === faixas.length - 1 ? larguraDoFormulario - cursor : (pesos[indice] / soma) * larguraDoFormulario;
    const atual = { ...faixa, x: cursor, largura };
    cursor += largura;
    return atual;
  });
}
