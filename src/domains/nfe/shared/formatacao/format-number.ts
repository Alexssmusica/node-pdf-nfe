/**
 * Retorna o valor formatado de acordo com  <number>  e <decimals> especificados..
 *
 * @param      {number | string}  number
 * @param      {number}  decimals
 * @return     {string}
 */
export function formatNumber(number: number | string, decimals: number): string {
  return Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimals }).format(Number(number));
}
