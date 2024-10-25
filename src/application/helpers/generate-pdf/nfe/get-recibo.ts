import { format, parseISO } from 'date-fns';
import { formatMoney } from '../../../../domain/use-cases/utils';
import type { GeneratePdf } from '../../../../types';
import { linhaHorizontal } from './linha-horizontal';
import { linhaHorizontalTracejada } from './linha-horizontal-tracejada';
import { linhaVertical } from './linha-vertical';
import { normal } from './normal';
import { titulo } from './titulo';

export function getRecibo({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  dest,
  emit,
  total,
  ide
}: GeneratePdf.InputRecibo): number {
  linhaHorizontal({ x1: 0, x2: 0, y, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: -110.5, y: y + 28.3, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 51.1, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });

  linhaVertical({ y1: y, y2: y + 51.1, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 28.3, y2: y + 51.1, x: 99.2, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y, y2: y + 51.1, x: 476, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y, y2: y + 51.1, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y, y2: y + 51.1, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

  normal({
    doc,
    value: [
      'Recebemos de',
      emit.xNome,
      'os produtos e/ou serviços constantes da nota',
      'fiscal eletrônica indicada abaixo.',
      'Emissão:',
      format(parseISO(ide.dhEmi), 'dd/MM/yyyy HH:mm:ss'),
      '- Valor Total:',
      formatMoney(total.ICMSTot.vNF, 2),
      '- Destinatário:',
      dest.xNome,
      '- Endereço:',
      dest.enderDest?.xLgr
    ]
      .join(' ')
      .toUpperCase(),
    x: 1.5,
    y: y + 3,
    largura: 472.5,
    alinhamento: 'justify',
    tamanho: 6.9,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });

  titulo({ value: 'DATA DE RECEBIMENTO', x: 1.5, y: y + 30, largura: 97, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({
    value: 'IDENTIFICAÇÃO E ASSINATURA DO RECEBEDOR',
    x: 100.5,
    y: y + 30,
    largura: 374,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  normal({
    doc,
    value: 'NF-e',
    x: 476.6,
    y: y + 1.8,
    largura: 110,
    alinhamento: 'center',
    tamanho: 14,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  normal({
    doc,
    value: 'Nº. ' + ide.nNF.padStart(9, '0').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'),
    x: 476.6,
    y: y + 22,
    largura: 110,
    alinhamento: 'center',
    tamanho: 10,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  normal({
    doc,
    value: 'Série ' + ide.serie,
    x: 476.6,
    y: y + 31.5,
    largura: 110,
    alinhamento: 'center',
    tamanho: 10,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });

  linhaHorizontalTracejada({ x1: 0, x2: 0, y: y + 55.32, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });

  return doc.y;
}
