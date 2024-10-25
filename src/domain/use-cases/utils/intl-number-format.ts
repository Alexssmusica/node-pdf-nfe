export function formatMoney(valor: number | string, decimalDigits: number): string {
  return Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimalDigits }).format(Number(valor));
}
