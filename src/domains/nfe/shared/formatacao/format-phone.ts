/**
 * Retorna <valor> especificado com máscara do Telefone.
 *
 * @param      {string}  phone
 * @return     {string}
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 12) {
    cleaned = cleaned.substring(2, cleaned.length);
  }
  const areaCode = cleaned.slice(0, 2);
  const mainNumber = cleaned.slice(2);
  if (mainNumber.length === 9) {
    return `(${areaCode}) ${mainNumber.slice(0, 5)}-${mainNumber.slice(5)}`;
  } else if (mainNumber.length === 8) {
    return `(${areaCode}) ${mainNumber.slice(0, 4)}-${mainNumber.slice(4)}`;
  }
  return '';
}
