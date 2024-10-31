/**
 * Retorna <valor> especificado com máscara do CEP.
 *
 * @param      {string}  postalCode
 * @return     {string}
 */
export function formatPostalCode(postalCode: string): string {
  if (!postalCode) return '';
  return postalCode.replace(/^(\d{2})(\d{3})(\d{3})$/, '$1.$2-$3');
}
