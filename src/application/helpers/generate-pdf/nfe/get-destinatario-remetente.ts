import { format, parseISO } from 'date-fns';
import { formatStateRegistration } from '../../../../domain/use-cases/utils';
import type { GeneratePdf } from '../../../../types';
import { campo } from './campo';
import { DEFAULT_NFE } from './default';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';
import { titulo } from './titulo';

export function getDestinatarioRemetente({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  dest,
  ide
}: GeneratePdf.InputRemetenteDestinatario): number {
  linhaHorizontal({ x1: 0, x2: 0, y: y + 9, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 29, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 49, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 69, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });

  linhaVertical({ y1: y + 9.2, y2: y + 69, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9.2, y2: y + 29, x: 357.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 29.2, y2: y + 69, x: 274.9, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 49.2, y2: y + 69, x: 297.6, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 29.2, y2: y + 69, x: 396.75, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9.2, y2: y + 69, x: 493.1, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9.2, y2: y + 69, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

  secao({ doc, value: 'DESTINATÁRIO / REMETENTE', x: 1.5, y: y + 0.9, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });

  titulo({ value: 'NOME / RAZÃO SOCIAL', x: 1.5, y: y + 11, largura: 353.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: dest.xNome, x: 1.5, y: y + 18, largura: 353.5, alinhamento: 'left', ajusteX, ajusteY, doc, margemEsquerda, margemTopo });

  titulo({ value: 'CNPJ / CPF', x: 358, y: y + 11, largura: 133.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: dest.CPF?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') ?? '',
    x: 358,
    y: y + 18,
    largura: 133.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: dest.CNPJ?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') ?? '',
    x: 358,
    y: y + 18,
    largura: 133.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({ value: 'DATA DA EMISSÃO', x: 495, y: y + 11, largura: 90, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: format(parseISO(ide.dhEmi), 'dd/MM/yyyy HH:mm:ss'),
    x: 495,
    y: y + 18,
    largura: 90,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({ value: 'ENDEREÇO', x: 1.5, y: y + 30, largura: 272, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: dest.enderDest?.xLgr && dest.enderDest?.nro ? `${dest.enderDest.xLgr}, ${dest.enderDest.nro}` : dest.enderDest?.xLgr ?? '',
    x: 1.5,
    y: y + 38,
    largura: 272,
    alinhamento: 'left',
    tamanho: DEFAULT_NFE.tamanhoDaFonteDoCampo - 0.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({ value: 'BAIRRO / DISTRITO', x: 276, y: y + 30, largura: 192, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: dest.enderDest?.xBairro ?? '', x: 276, y: y + 38, largura: 119, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });

  titulo({ value: 'CEP', x: 398, y: y + 30, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: dest.enderDest?.CEP ?? '', x: 398, y: y + 38, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });

  titulo({ value: 'DATA DA SAÍDA', x: 495, y: y + 30, largura: 90, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: ide.dhSaiEnt !== undefined ? format(parseISO(ide.dhSaiEnt), 'dd/MM/yyyy HH:mm:ss') : '',
    x: 495,
    y: y + 38,
    largura: 90,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({ value: 'MUNICÍPIO', x: 1.5, y: y + 51, largura: 272, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: dest.enderDest?.xMun ?? '',
    x: 1.5,
    y: y + 58,
    largura: 272,
    alinhamento: 'left',
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({ value: 'UF', x: 276, y: y + 51, largura: 20, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: dest.enderDest?.UF ?? '', x: 276, y: y + 58, largura: 20, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });

  titulo({ value: 'FONE / FAX', x: 299, y: y + 51, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: dest.enderDest?.fone ?? '', x: 299, y: y + 58, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });

  titulo({ value: 'INSCRIÇÃO ESTADUAL', x: 398, y: y + 51, largura: 93, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatStateRegistration(dest?.IE ?? ''),
    x: 398,
    y: y + 58,
    largura: 93,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({ value: 'HORA DA SAÍDA', x: 495, y: y + 51, largura: 90, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });

  return doc.y;
}
