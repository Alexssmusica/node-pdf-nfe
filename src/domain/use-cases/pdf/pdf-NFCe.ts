import { format, parseISO } from 'date-fns';
import PDFKit from 'pdfkit';
import QRCode from 'qrcode';
import { loadFontsNFCe } from '../../../application/helpers/generate-pdf/nfe/load-fontes';
import { negrito } from '../../../application/helpers/generate-pdf/nfe/negrito';
import { normal } from '../../../application/helpers/generate-pdf/nfe/normal';
import type { NFeProc, OpcoesPDF } from '../../../types';
import { formatCnpj, formatCpf, formatNumber, formatPostalCode } from '../utils';

export async function pdfNFCe(nf: NFeProc, opcoes?: OpcoesPDF): Promise<PDFKit.PDFDocument> {
  const { NFe, protNFe } = nf;
  const { infProt } = protNFe;
  const { ide, emit, det, total, pag, dest, infAdic } = NFe.infNFe;
  const larguraPagina = 207.5;
  const margemPadrao = 2.5;

  const doc = new PDFKit({
    size: [larguraPagina, 1000],
    margins: {
      top: margemPadrao,
      bottom: 0,
      left: margemPadrao,
      right: margemPadrao
    }
  });
  loadFontsNFCe(doc);

  negrito({
    doc,
    value: emit.xNome,
    x: 0,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 10,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0
  });
  negrito({
    doc,
    value: formatCnpj(emit.CNPJ),
    x: 0,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 10,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0
  });
  normal({
    doc,
    value: `${emit.enderEmit.xLgr}, ${emit.enderEmit.nro}${emit.enderEmit.xCpl !== undefined ? ' ' + emit.enderEmit.xCpl : ''}. ${
      emit.enderEmit.xBairro
    }, ${emit.enderEmit.xMun}-${emit.enderEmit.UF}. ${formatPostalCode(emit.enderEmit.CEP ?? '')}`,
    x: 0,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 8,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0
  });
  doc.y += 5;
  negrito({
    doc,
    value: 'Documento Auxiliar da Nota Fiscal de Consumidor Eletronica',
    x: 0,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 8,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0
  });
  doc.y += 5;
  let posicao = doc.y;
  negrito({
    doc,
    value: 'CODIGO',
    x: 0,
    y: posicao,
    largura: 26.5,
    tamanho: 8,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: margemPadrao,
    margemTopo: 0,
    alinhamento: 'left'
  });
  negrito({
    doc,
    value: 'DESCRICAO',
    x: 31,
    y: posicao,
    largura: 74.5,
    tamanho: 8,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  negrito({
    doc,
    value: 'UN',
    x: 105,
    y: posicao,
    largura: 15,
    tamanho: 8,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  negrito({
    doc,
    value: 'QTD',
    x: 120,
    y: posicao,
    largura: 20,
    tamanho: 8,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  negrito({
    doc,
    value: 'VL UN',
    x: 140,
    y: posicao,
    largura: 27,
    tamanho: 8,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  negrito({
    doc,
    value: 'VL TOTAL',
    x: 167,
    y: posicao,
    largura: larguraPagina - 167,
    tamanho: 8,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  det.forEach((element) => {
    posicao = doc.y;
    normal({
      doc,
      value: element.prod.cProd.padStart(9, '0').substring(0, 9),
      x: 0 + margemPadrao,
      y: posicao,
      largura: 28,
      tamanho: 6,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'left'
    });
    normal({
      doc,
      value: ajusteTamanhoTexto(doc, ide.tpAmb === '1' ? element.prod.xProd.substring(0, 26) : 'NOTA FISCAL EMITIDA EM AMB', 73.5),
      x: 31,
      y: posicao,
      largura: 73.5,
      tamanho: 6,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'left'
    });
    normal({
      doc,
      value: element.prod.uCom,
      x: 105,
      y: posicao,
      largura: 15,
      tamanho: 6,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'center'
    });
    normal({
      doc,
      value: formatNumber(element.prod.qCom, 3),
      x: 120,
      y: posicao,
      largura: 20,
      tamanho: 6,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'center'
    });
    normal({
      doc,
      value: formatNumber(element.prod.vUnCom, 2),
      x: 140,
      y: posicao,
      largura: 27,
      tamanho: 6,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'center'
    });
    normal({
      doc,
      value: formatNumber(element.prod.vProd, 2),
      x: 167,
      y: posicao,
      largura: larguraPagina - 167,
      tamanho: 6,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'center'
    });
    posicao += 7;
  });
  doc.y += 2;
  normal({
    doc,
    value: 'Quantidade Total de Itens',
    x: margemPadrao,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  doc.y -= 7;
  normal({
    doc,
    value: String(det.length),
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'right'
  });
  normal({
    doc,
    value: 'Valor Total',
    x: margemPadrao,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  doc.y -= 7;
  normal({
    doc,
    value: formatNumber(total.ICMSTot.vProd, 2),
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'right'
  });
  normal({
    doc,
    value: 'Desconto',
    x: margemPadrao,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  doc.y -= 7;
  normal({
    doc,
    value: formatNumber(total.ICMSTot.vDesc, 2),
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'right'
  });
  normal({
    doc,
    value: 'Adicional/Frete/Seguro',
    x: margemPadrao,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  doc.y -= 7;
  normal({
    doc,
    value: formatNumber(total.ICMSTot.vFrete, 2),
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'right'
  });
  normal({
    doc,
    value: 'Valor a Pagar',
    x: margemPadrao,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  doc.y -= 7;
  normal({
    doc,
    value: formatNumber(total.ICMSTot.vNF, 2),
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'right'
  });
  doc.y += 5;
  normal({
    doc,
    value: 'FORMA DE PAGAMENTO',
    x: margemPadrao,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  doc.y -= 7;
  normal({
    doc,
    value: 'VALOR PAGO',
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'right'
  });
  pag.detPag.forEach((element) => {
    normal({
      doc,
      value: getPagName(element.tPag, element.xPag),
      x: margemPadrao,
      y: doc.y,
      largura: larguraPagina,
      tamanho: 7,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'left'
    });
    doc.y -= 7;
    normal({
      doc,
      value: formatNumber(element.vPag, 2),
      x: 0,
      y: doc.y,
      largura: larguraPagina - margemPadrao,
      tamanho: 7,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'right'
    });
  });
  normal({
    doc,
    value: 'TROCO',
    x: margemPadrao,
    y: doc.y,
    largura: larguraPagina,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  doc.y -= 7;
  normal({
    doc,
    value: formatNumber(pag.vTroco ?? 0, 2),
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'right'
  });
  doc.y += 7;
  negrito({
    doc,
    value: 'Consulte pela chave de acesso em',
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao * 2,
    tamanho: 8,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  normal({
    doc,
    value: NFe.infNFeSupl?.urlChave ?? '',
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  doc.y += 7;
  normal({
    doc,
    value: nf.protNFe.infProt.chNFe.replace(/(.{4})(?=.)/g, '$1 '),
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  doc.y += 7;
  normal({
    doc,
    value: dest?.xNome !== undefined ? dest.xNome : 'CONSUMIDOR NAO IDENTIFICADO',
    x: margemPadrao,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'justify'
  });
  if (dest?.CNPJ !== undefined) {
    normal({
      doc,
      value: 'CNPJ: ' + formatCnpj(dest.CNPJ),
      x: doc.x,
      y: doc.y,
      largura: 112,
      tamanho: 7,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'left'
    });
  } else if (dest?.CPF !== undefined) {
    normal({
      doc,
      value: 'CPF: ' + formatCpf(dest.CPF),
      x: doc.x,
      y: doc.y,
      largura: 112,
      tamanho: 7,
      ajusteX: 0,
      ajusteY: 0,
      margemEsquerda: 0,
      margemTopo: 0,
      alinhamento: 'left'
    });
  }
  doc.y += 7;
  normal({
    doc,
    value: `NFC-e Série ${ide.serie} Nº ${ide.nNF} Data Emissão: ${format(parseISO(ide.dhEmi), 'dd/MM/yyyy HH:mm:ss')}`,
    x: doc.x,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  normal({
    doc,
    value: 'Consulta via Leitor QR Code',
    x: margemPadrao,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  normal({
    doc,
    value: `Protocolo de Autorização: ${infProt.nProt}`,
    x: doc.x,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  normal({
    doc,
    value: infProt.dhRecbto ? `Data Autorização: ${format(parseISO(infProt.dhRecbto), 'dd/MM/yyyy HH:mm:ss')}` : '',
    x: doc.x,
    y: doc.y,
    largura: 112,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'left'
  });
  doc.y += 7;
  normal({
    doc,
    value: 'Informacoes de interesse do contribuinte:',
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  normal({
    doc,
    value: infAdic?.infCpl ?? '',
    x: 0,
    y: doc.y,
    largura: larguraPagina - margemPadrao,
    tamanho: 7,
    ajusteX: 0,
    ajusteY: 0,
    margemEsquerda: 0,
    margemTopo: 0,
    alinhamento: 'center'
  });
  const qrImage = await QRCode.toDataURL(NFe.infNFeSupl?.qrCode ?? '');
  doc.image(qrImage, larguraPagina / 2 - 45, doc.y + 5, { fit: [90, 90], align: 'center' });
  if (!opcoes || !opcoes.notEndDocument) doc.end();
  return doc;
}

function ajusteTamanhoTexto(doc: PDFKit.PDFDocument, value: string, tamanho: number) {
  while (doc.widthOfString(value) > tamanho) {
    value = value.substring(0, value.length - 1);
  }
  return value;
}

const TPAG_LABELS: Record<string, string> = {
  '01': 'Dinheiro',
  '02': 'Cheque',
  '03': 'Cartão de Crédito',
  '04': 'Cartão de Débito',
  '05': 'Cartão de Loja (Private Label), Crediário Digital, Outros Crediários',
  '10': 'Vale Alimentação',
  '11': 'Vale Refeição',
  '12': 'Vale Presente',
  '13': 'Vale Combustível',
  '14': 'Duplicata Mercantil',
  '15': 'Boleto Bancário',
  '16': 'Depósito Bancário',
  '17': 'Pagamento Instantâneo (PIX) – Dinâmico',
  '18': 'TED (Transferência Eletrônica Disponível)',
  '19': 'Programa de fidelidade, CashBack, Crédito Virtual',
  '20': 'Pagamento Instantâneo (PIX) – Estático',
  '21': 'Crédito em Loja',
  '22': 'Pagamento Eletrônico não Informado',
  '23': 'Pagamento Instantâneo (PIX) – Automático',
  '24': 'TEF – Book Transfer',
  '90': 'Sem pagamento',
  '91': 'Pagamento Posterior',
  '99': 'Outros'
};

function getPagName(tPag: string | number, xPag?: string): string {
  const code = String(tPag).padStart(2, '0');
  if (code === '99' && xPag) {
    return xPag;
  }
  return TPAG_LABELS[code] ?? xPag ?? 'Outros';
}
