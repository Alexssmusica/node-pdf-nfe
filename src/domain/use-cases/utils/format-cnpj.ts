/**
 * Retorna <valor> especificado com máscara do CNPJ.
 *
 * @param      {string}  cnpj
 * @return     {string}
 */
export function formatCnpj(cnpj: string): string {
  if (!cnpj) return '';
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}
