import {
  formatCnpj,
  formatCpf,
  formatLicensePlate,
  formatNumber,
  formatStateRegistration,
  returnFontSizeCarrier
} from '../../../../domain/use-cases/utils';
import type { GeneratePdf } from '../../../../types';
import { campo } from './campo';
import { DEFAULT_NFE } from './default';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';
import { titulo } from './titulo';

export function getTransporte({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  transp
}: GeneratePdf.InputTransporte): number {
  linhaHorizontal({ x1: 0, x2: 0, y: y + 8, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 28, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 48, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: y + 68, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 8, y2: y + 68, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 8, y2: y + 28, x: 170, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 8, y2: y + 28, x: 346, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 8, y2: y + 48, x: 434, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 8, y2: y + 48, x: 456.65, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 8, y2: y + 68, x: 258, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 48, y2: y + 68, x: 59.6, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 48, y2: y + 68, x: 156.6, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 48, y2: y + 68, x: 357, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 48, y2: y + 68, x: 473.3, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: y + 8, y2: y + 68, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  secao({ doc, value: 'TRANSPORTADOR / VOLUMES TRANSPORTADOS', x: 1.5, y, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
  titulo({ value: 'NOME / RAZÃO SOCIAL', x: 1.5, y: y + 9.5, largura: 166.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: transp.transporta?.xNome ?? '',
    x: 1.5,
    y: y + 17.5,
    largura: 166.5,
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
  titulo({ value: 'FRETE POR CONTA', x: 171.5, y: y + 9.5, largura: 85, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: ModFrete(transp.modFrete),
    x: 164,
    y: y + 17.5,
    largura: 100,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo,
    tamanho: 8.4
  });
  titulo({ value: 'CÓDIGO ANTT', x: 259.5, y: y + 9.5, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: transp.veicTransp?.RNTC ?? '', x: 259.5, y: y + 17.5, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'PLACA DO VEÍCULO', x: 347.5, y: y + 9.5, largura: 84, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatLicensePlate(transp.veicTransp?.placa ?? ''),
    x: 347.5,
    y: y + 17.5,
    largura: 84,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'UF', x: 435.5, y: y + 9.5, largura: 19.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: transp.veicTransp?.UF ?? '', x: 435.5, y: y + 17.5, largura: 19.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'CNPJ / CPF', x: 458, y: y + 9.5, largura: 126.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatCnpj(transp.transporta?.CNPJ ?? ''),
    x: 458,
    y: y + 17.5,
    largura: 126.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  campo({
    value: formatCpf(transp.transporta?.CPF ?? ''),
    x: 458,
    y: y + 17.5,
    largura: 126.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'ENDEREÇO', x: 1.5, y: y + 30, largura: 254, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: transp.transporta?.xEnder ?? '',
    x: 1.5,
    y: y + 38.5,
    largura: 254,
    alinhamento: 'left',
    tamanho: DEFAULT_NFE.tamanhoDaFonteDoCampo - 0.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'MUNICÍPIO', x: 259.5, y: y + 30, largura: 172, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: transp.transporta?.xMun ?? '', x: 259.5, y: y + 38.5, largura: 172, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'UF', x: 435.5, y: y + 30, largura: 19.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: transp.transporta?.uf ?? '', x: 435.5, y: y + 38.5, largura: 19.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'INSCRIÇÃO ESTADUAL', x: 458, y: y + 30, largura: 126.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: formatStateRegistration(transp.transporta?.ie ?? ''),
    x: 458,
    y: y + 38.5,
    largura: 126.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'QUANTIDADE', x: 1.5, y: y + 50, largura: 56.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: transp.vol?.qVol ?? '', x: 1.5, y: y + 58, largura: 56.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'ESPÉCIE', x: 60.8, y: y + 50, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: transp.vol?.esp ?? '', x: 60.8, y: y + 58, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'MARCA', x: 160, y: y + 50, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: transp.vol?.marca ?? '', x: 160, y: y + 58, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'NUMERAÇÃO', x: 259.5, y: y + 50, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({ value: transp.vol?.nVol ?? '', x: 259.5, y: y + 58, largura: 96, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  titulo({ value: 'PESO BRUTO', x: 358.5, y: y + 50, largura: 112.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: transp.vol?.pesoB ? formatNumber(transp.vol?.pesoB, 3) : '',
    x: 358.5,
    y: y + 58,
    largura: 112.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({ value: 'PESO LÍQUIDO', x: 474.5, y: y + 50, largura: 110.5, ajusteX, ajusteY, doc, margemEsquerda, margemTopo });
  campo({
    value: transp.vol?.pesoL ? formatNumber(transp.vol?.pesoL, 3) : '',
    x: 474.5,
    y: y + 58,
    largura: 110.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  return doc.y;
}
