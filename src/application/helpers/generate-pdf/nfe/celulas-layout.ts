export type CelulaLayout = {
  x: number;
  largura: number;
};

export function celulasComPeso(larguraTotal: number, pesos: number[]): CelulaLayout[] {
  const soma = pesos.reduce((total, peso) => total + peso, 0);
  let cursor = 0;
  return pesos.map((peso, indice) => {
    const ultima = indice === pesos.length - 1;
    const largura = ultima ? larguraTotal - cursor : (peso / soma) * larguraTotal;
    const celula = { x: cursor, largura };
    cursor += largura;
    return celula;
  });
}

export function celulasLinha(larguraTotal: number, pesos: number[]): CelulaLayout[] {
  return celulasComPeso(larguraTotal, pesos);
}
