import {
  formatCnpj,
  formatCpf,
  formatLicensePlate,
  formatNumber,
  formatStateRegistration,
  returnFontSizeCarrier
} from '../../../shared/formatacao';
import type { GeneratePdf } from './tipos-layout';
import { celulasComPeso } from './celulas-layout';
import type { CelulaLayout } from './celulas-layout';
import { campo } from './campo';
import { DEFAULT_NFE } from './default';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { offsetsLinha } from './linha-campos';
import { secao } from './secao';
import { titulo } from './titulo';

const LARGURA_FORMULARIO_RETRATO = 586.65;

function caixaCelula(celula: CelulaLayout): { x: number; largura: number } {
  return { x: celula.x + 1.5, largura: celula.largura - 3 };
}

function caixaEntre(inicio: number, fim: number): { x: number; largura: number } {
  return { x: inicio + 1.5, largura: Math.max(fim - inicio - 3, 4) };
}

export function getTransporte({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  geometria,
  transp
}: GeneratePdf.InputTransporte): number {
  const h = geometria.alturaLinhaTransporte;
  const yBase = y + 8;
  const yFim = yBase + h * 3;
  const tamanhoTitulo = geometria.tamanhoDaFonteDoTitulo;
  const tamanhoCampo = geometria.tamanhoDaFonteDoCampo;
  const linhaUnica = geometria.orientacao === 'PAISAGEM';
  const offLinha0 = offsetsLinha(geometria, h, tamanhoTitulo, tamanhoCampo, { titulo: 1.5, campo: h * 0.475 });
  const offDemais = offsetsLinha(geometria, h, tamanhoTitulo, tamanhoCampo, { titulo: 2, campo: 10.5 });
  const offs = [offLinha0, offDemais, offDemais];
  const yTitulo = (linha: number) => yBase + linha * h + offs[linha].titulo;
  const yCampo = (linha: number) => yBase + linha * h + offs[linha].campo;
  const fatorX = larguraDoFormulario / LARGURA_FORMULARIO_RETRATO;
  const px = (valor: number) => valor * fatorX;

  const linha1 = celulasComPeso(larguraDoFormulario, [170, 176, 88, 22.65, 130]);
  const linha2 = celulasComPeso(larguraDoFormulario, [258, 176, 19.5, 22.65, 130]);
  const linha3 = celulasComPeso(larguraDoFormulario, [59.6, 97, 97, 116, 113, 104]);
  const c1 = linha1;
  const c2 = linha2;
  const c3 = linha3;

  linhaHorizontal({ x1: 0, x2: 0, y: yBase, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: yBase + h, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: yBase + h * 2, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: yFim, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase, y2: yFim, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase, y2: yBase + h, x: c1[1].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase, y2: yBase + h, x: px(259.5), doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase, y2: yBase + h, x: c1[2].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase, y2: yBase + h * 2, x: c1[3].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase, y2: yBase + h * 2, x: c1[4].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase, y2: yFim, x: c2[0].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase + h, y2: yBase + h * 2, x: c2[1].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase + h * 2, y2: yFim, x: c3[1].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase + h * 2, y2: yFim, x: c3[2].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase + h * 2, y2: yFim, x: c3[3].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase + h * 2, y2: yFim, x: c3[4].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase + h * 2, y2: yFim, x: c3[5].x, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: yBase, y2: yFim, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  secao({ doc, value: 'TRANSPORTADOR / VOLUMES TRANSPORTADOS', x: 1.5, y, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
  titulo({
    value: 'NOME / RAZÃO SOCIAL',
    x: c1[0].x + 1.5,
    y: yTitulo(0),
    largura: c1[0].largura - 3,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: transp.transporta?.xNome ?? '',
    x: c1[0].x + 1.5,
    y: yCampo(0),
    largura: c1[0].largura - 3,
    alinhamento: 'left',
    tamanho: returnFontSizeCarrier(transp.transporta?.xNome ?? ''),
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  function ModFrete(value: string) {
    if (value === '0') {
      return '0 - Por conta do Remet';
    } else if (value === '1') {
      return '1 - Por conta do Dest';
    } else if (value === '2') {
      return '2 - Por conta de Terc';
    } else if (value === '3') {
      return '3 - Por conta do Remet';
    } else if (value === '4') {
      return '4 - Por conta do Dest';
    } else if (value === '9') {
      return '9 - Sem Ocorr de Transp';
    }
    return '';
  }
  titulo({
    value: 'FRETE POR CONTA',
    x: px(171.5),
    y: yTitulo(0),
    largura: px(85),
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: ModFrete(transp.modFrete),
    x: px(164),
    y: yCampo(0),
    largura: px(100),
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo,
    tamanho: geometria.orientacao === 'PAISAGEM' ? tamanhoCampo : 8.4
  });
  const caixaAntt = caixaEntre(px(259.5), c1[2].x);
  titulo({
    value: 'CÓDIGO ANTT',
    x: caixaAntt.x,
    y: yTitulo(0),
    largura: caixaAntt.largura,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: transp.veicTransp?.RNTC ?? '',
    x: caixaAntt.x,
    y: yCampo(0),
    largura: caixaAntt.largura,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'PLACA DO VEÍCULO',
    x: px(347.5),
    y: yTitulo(0),
    largura: px(84),
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatLicensePlate(transp.veicTransp?.placa ?? ''),
    x: px(347.5),
    y: yCampo(0),
    largura: px(84),
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'UF',
    x: px(435.5),
    y: yTitulo(0),
    largura: px(19.5),
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: transp.veicTransp?.UF ?? '',
    x: px(435.5),
    y: yCampo(0),
    largura: px(19.5),
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'CNPJ / CPF',
    x: px(458),
    y: yTitulo(0),
    largura: px(126.5),
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatCnpj(transp.transporta?.CNPJ ?? ''),
    x: px(458),
    y: yCampo(0),
    largura: px(126.5),
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatCpf(transp.transporta?.CPF ?? ''),
    x: px(458),
    y: yCampo(0),
    largura: px(126.5),
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'ENDEREÇO',
    x: 1.5,
    y: yTitulo(1),
    largura: px(254),
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: transp.transporta?.xEnder ?? '',
    x: 1.5,
    y: yCampo(1),
    largura: px(254),
    alinhamento: 'left',
    tamanho: geometria.orientacao === 'PAISAGEM' ? tamanhoCampo : DEFAULT_NFE.tamanhoDaFonteDoCampo - 0.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  const caixaMunicipio = caixaCelula(c2[1]);
  titulo({
    value: 'MUNICÍPIO',
    x: caixaMunicipio.x,
    y: yTitulo(1),
    largura: caixaMunicipio.largura,
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: transp.transporta?.xMun ?? '',
    x: caixaMunicipio.x,
    y: yCampo(1),
    largura: caixaMunicipio.largura,
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'UF',
    x: px(435.5),
    y: yTitulo(1),
    largura: px(19.5),
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: transp.transporta?.UF ?? '',
    x: px(435.5),
    y: yCampo(1),
    largura: px(19.5),
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'INSCRIÇÃO ESTADUAL',
    x: px(458),
    y: yTitulo(1),
    largura: px(126.5),
    tamanho: tamanhoTitulo,
    linhaUnica,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatStateRegistration(transp.transporta?.IE ?? ''),
    x: px(458),
    y: yCampo(1),
    largura: px(126.5),
    tamanho: tamanhoCampo,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  const volumes: Array<{ titulo: string; valor: string; celula: CelulaLayout }> = [
    { titulo: 'QUANTIDADE', valor: transp.vol?.qVol ?? '', celula: c3[0] },
    { titulo: 'ESPÉCIE', valor: transp.vol?.esp ?? '', celula: c3[1] },
    { titulo: 'MARCA', valor: transp.vol?.marca ?? '', celula: c3[2] },
    { titulo: 'NUMERAÇÃO', valor: transp.vol?.nVol ?? '', celula: c3[3] },
    { titulo: 'PESO BRUTO', valor: transp.vol?.pesoB ? formatNumber(transp.vol.pesoB, 3) : '', celula: c3[4] },
    { titulo: 'PESO LÍQUIDO', valor: transp.vol?.pesoL ? formatNumber(transp.vol.pesoL, 3) : '', celula: c3[5] }
  ];
  volumes.forEach(({ titulo: rotulo, valor, celula }) => {
    const caixa = caixaCelula(celula);
    titulo({
      value: rotulo,
      x: caixa.x,
      y: yTitulo(2),
      largura: caixa.largura,
      tamanho: tamanhoTitulo,
      linhaUnica,
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo
    });
    campo({
      value: valor,
      x: caixa.x,
      y: yCampo(2),
      largura: caixa.largura,
      tamanho: tamanhoCampo,
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo
    });
  });
  doc.y = margemTopo + ajusteY + yFim;
  return doc.y;
}
