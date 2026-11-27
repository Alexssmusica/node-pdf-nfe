import type { FracoesColunaItem } from './geometria-nfe';

export type NomeColunaItem = 'descricao' | 'cstCfop' | 'qtdUn' | 'vlrUnit' | 'vlrTotal' | 'bases' | 'aliquotas' | 'tributos';

export type ColunaItem = {
  x: number;
  largura: number;
};

export type ColunasItem = Record<NomeColunaItem, ColunaItem>;

export const TITULOS_COLUNA_ITEM: Record<NomeColunaItem, string> = {
  descricao: 'DESCRIÇÃO DO PRODUTO / SERVIÇO',
  cstCfop: 'CST / CFOP',
  qtdUn: 'QTD / UN',
  vlrUnit: 'VLR UNIT.',
  vlrTotal: 'VLR TOTAL',
  bases: 'BASES DE CÁLCULO',
  aliquotas: 'ALÍQUOTAS',
  tributos: 'VALOR DOS TRIBUTOS'
};

const ORDEM_COLUNAS: NomeColunaItem[] = ['descricao', 'cstCfop', 'qtdUn', 'vlrUnit', 'vlrTotal', 'bases', 'aliquotas', 'tributos'];

export function colunasItem(larguraFormulario: number, fracoes: FracoesColunaItem): { colunas: ColunasItem; divisorias: number[] } {
  const divisorias: number[] = [];
  const colunas = {} as ColunasItem;
  let cursor = 0;

  ORDEM_COLUNAS.forEach((nome, indice) => {
    const ultima = indice === ORDEM_COLUNAS.length - 1;
    const fracao = fracoes[nome];
    const largura = ultima ? larguraFormulario - cursor : Math.round(larguraFormulario * fracao * 100) / 100;
    colunas[nome] = { x: cursor + 1.5, largura: Math.max(largura - 3, 8) };
    cursor += largura;
    if (!ultima) divisorias.push(cursor);
  });

  return { colunas, divisorias };
}
