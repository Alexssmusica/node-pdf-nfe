const FRACOES_COLUNA = [
  ['descricao', 0.22],
  ['cstCfop', 0.068],
  ['qtdUn', 0.082],
  ['vlrUnit', 0.078],
  ['vlrTotal', 0.078],
  ['bases', 0.13],
  ['aliquotas', 0.145],
  ['tributos', 0.199]
] as const;

export type NomeColunaItem = (typeof FRACOES_COLUNA)[number][0];

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

export const ALTURA_CABECALHO_ITENS = 16;

export function colunasItem(larguraFormulario: number): { colunas: ColunasItem; divisorias: number[] } {
  const divisorias: number[] = [];
  const colunas = {} as ColunasItem;
  let cursor = 0;

  FRACOES_COLUNA.forEach(([nome, fracao], indice) => {
    const ultima = indice === FRACOES_COLUNA.length - 1;
    const largura = ultima ? larguraFormulario - cursor : Math.round(larguraFormulario * fracao * 100) / 100;
    colunas[nome] = { x: cursor + 1.5, largura: Math.max(largura - 3, 8) };
    cursor += largura;
    if (!ultima) divisorias.push(cursor);
  });

  return { colunas, divisorias };
}
