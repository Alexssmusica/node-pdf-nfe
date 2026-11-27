import {
  formatCnpj,
  formatCpf,
  formatDate,
  formatPhone,
  formatPostalCode,
  formatStateRegistration,
  formatTime
} from '../../../shared/formatacao';
import type { GeneratePdf } from './tipos-layout';
import { celulasComPeso } from './celulas-layout';
import { campo } from './campo';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { offsetsLinha } from './linha-campos';
import { secao } from './secao';
import { titulo } from './titulo';

const PESOS_LINHA1 = [357.1, 136, 93.55];
const PESOS_LINHA2 = [274.9, 121.85, 96.35, 93.55];
const PESOS_LINHA3 = [274.9, 22.7, 99.15, 96.35, 93.55];

export function getDestinatarioRemetente({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  geometria,
  dest,
  ide
}: GeneratePdf.InputRemetenteDestinatario): number {
  const alturaLinha = geometria.alturaLinhaDestinatario;
  const linha1 = celulasComPeso(larguraDoFormulario, PESOS_LINHA1);
  const linha2 = celulasComPeso(larguraDoFormulario, PESOS_LINHA2);
  const linha3 = celulasComPeso(larguraDoFormulario, PESOS_LINHA3);
  const tamanhoCampo = geometria.tamanhoDaFonteDoCampo;
  const tamanhoTitulo = geometria.tamanhoDaFonteDoTitulo;
  const linhaUnica = geometria.orientacao === 'PAISAGEM';
  const offLinha1 = offsetsLinha(geometria, alturaLinha, tamanhoTitulo, tamanhoCampo, { titulo: 2, campo: 9 });
  const offLinha2 = offsetsLinha(geometria, alturaLinha, tamanhoTitulo, tamanhoCampo - 0.5, { titulo: 2, campo: 10 });
  const yLinha = (indice: number) => y + 9 + alturaLinha * indice;

  linhaHorizontal({ x1: 0, x2: 0, y: y + 9, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 9 + alturaLinha, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 9 + alturaLinha * 2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 9 + alturaLinha * 3, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });

  linhaVertical({ y1: y + 9.2, y2: y + 9 + alturaLinha * 3, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 9.2, y2: y + 9 + alturaLinha * 3, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

  [linha1[1].x, linha1[2].x].forEach((x) => {
    linhaVertical({ y1: y + 9.2, y2: y + 9 + alturaLinha, x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  });
  linhaVertical({
    y1: y + 9 + alturaLinha,
    y2: y + 9 + alturaLinha * 3,
    x: linha2[1].x,
    doc,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  linhaVertical({
    y1: y + 9 + alturaLinha * 2,
    y2: y + 9 + alturaLinha * 3,
    x: linha3[1].x,
    doc,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  linhaVertical({
    y1: y + 9 + alturaLinha,
    y2: y + 9 + alturaLinha * 3,
    x: linha2[2].x,
    doc,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });
  linhaVertical({
    y1: y + 9 + alturaLinha,
    y2: y + 9 + alturaLinha * 3,
    x: linha2[3].x,
    doc,
    ajusteX,
    ajusteY,
    margemEsquerda,
    margemTopo
  });

  secao({ doc, value: 'DESTINATÁRIO / REMETENTE', x: 1.5, y: y + 0.9, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });

  titulo({
    value: 'NOME / RAZÃO SOCIAL',
    x: linha1[0].x + 1.5,
    y: yLinha(0) + offLinha1.titulo,
    largura: linha1[0].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: dest.xNome,
    x: linha1[0].x + 1.5,
    y: yLinha(0) + offLinha1.campo,
    largura: linha1[0].largura - 3,
    alinhamento: 'left',
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'CNPJ / CPF',
    x: linha1[1].x + 1.5,
    y: yLinha(0) + offLinha1.titulo,
    largura: linha1[1].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatCpf(dest.CPF ?? ''),
    x: linha1[1].x + 1.5,
    y: yLinha(0) + offLinha1.campo,
    largura: linha1[1].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatCnpj(dest.CNPJ ?? ''),
    x: linha1[1].x + 1.5,
    y: yLinha(0) + offLinha1.campo,
    largura: linha1[1].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'DATA DA EMISSÃO',
    x: linha1[2].x + 1.5,
    y: yLinha(0) + offLinha1.titulo,
    largura: linha1[2].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatDate(ide.dhEmi),
    x: linha1[2].x + 1.5,
    y: yLinha(0) + offLinha1.campo,
    largura: linha1[2].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'ENDEREÇO',
    x: linha2[0].x + 1.5,
    y: yLinha(1) + offLinha2.titulo,
    largura: linha2[0].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  const complemento = dest.enderDest?.xCpl ? ` ${dest.enderDest.xCpl}` : '';
  campo({
    value:
      dest.enderDest?.xLgr && dest.enderDest?.nro
        ? `${dest.enderDest.xLgr}, ${dest.enderDest.nro}${complemento}`
        : (dest.enderDest?.xLgr ?? ''),
    x: linha2[0].x + 1.5,
    y: yLinha(1) + offLinha2.campo,
    largura: linha2[0].largura - 3,
    alinhamento: 'left',
    tamanho: tamanhoCampo - 0.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'BAIRRO / DISTRITO',
    x: linha2[1].x + 1.5,
    y: yLinha(1) + offLinha2.titulo,
    largura: linha2[1].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: dest.enderDest?.xBairro ?? '',
    x: linha2[1].x + 1.5,
    y: yLinha(1) + offLinha2.campo,
    largura: linha2[1].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'CEP',
    x: linha2[2].x + 1.5,
    y: yLinha(1) + offLinha2.titulo,
    largura: linha2[2].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatPostalCode(dest.enderDest?.CEP ?? ''),
    x: linha2[2].x + 1.5,
    y: yLinha(1) + offLinha2.campo,
    largura: linha2[2].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'DATA DA SAÍDA',
    x: linha2[3].x + 1.5,
    y: yLinha(1) + offLinha2.titulo,
    largura: linha2[3].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: ide.dhSaiEnt !== undefined ? formatDate(ide.dhSaiEnt) : '',
    x: linha2[3].x + 1.5,
    y: yLinha(1) + offLinha2.campo,
    largura: linha2[3].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'MUNICÍPIO',
    x: linha3[0].x + 1.5,
    y: yLinha(2) + offLinha1.titulo,
    largura: linha3[0].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: dest.enderDest?.xMun ?? '',
    x: linha3[0].x + 1.5,
    y: yLinha(2) + offLinha1.campo,
    largura: linha3[0].largura - 3,
    alinhamento: 'left',
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'UF',
    x: linha3[1].x + 1.5,
    y: yLinha(2) + offLinha1.titulo,
    largura: linha3[1].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: dest.enderDest?.UF ?? '',
    x: linha3[1].x + 1.5,
    y: yLinha(2) + offLinha1.campo,
    largura: linha3[1].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'FONE / FAX',
    x: linha3[2].x + 1.5,
    y: yLinha(2) + offLinha1.titulo,
    largura: linha3[2].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatPhone(dest.enderDest?.fone ?? ''),
    x: linha3[2].x + 1.5,
    y: yLinha(2) + offLinha1.campo,
    largura: linha3[2].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'INSCRIÇÃO ESTADUAL',
    x: linha3[3].x + 1.5,
    y: yLinha(2) + offLinha1.titulo,
    largura: linha3[3].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatStateRegistration(dest?.IE ?? ''),
    x: linha3[3].x + 1.5,
    y: yLinha(2) + offLinha1.campo,
    largura: linha3[3].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  titulo({
    value: 'HORA DA SAÍDA',
    x: linha3[4].x + 1.5,
    y: yLinha(2) + offLinha1.titulo,
    largura: linha3[4].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: ide.dhSaiEnt !== undefined ? formatTime(ide.dhSaiEnt) : '',
    x: linha3[4].x + 1.5,
    y: yLinha(2) + offLinha1.campo,
    largura: linha3[4].largura - 3,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  doc.y = margemTopo + ajusteY + y + 9 + alturaLinha * 3;
  return doc.y;
}
