/**
 * Retorna <valor> especificado com máscara do CEP.
 *
 * @param      {string}  postalCode
 * @return     {string}
 */
export function formatPostalCode(postalCode: string): string {
  if (!postalCode) return '';
  const digitsOnly = String(postalCode).replace(/\D/g, '').slice(0, 8);
  if (digitsOnly.length > 5) {
    return digitsOnly.replace(/(\d{5})(\d{1,3})/, '$1-$2');
  }
  return digitsOnly;
}
