/**
 * Retorna <valor> especificado com máscara do Telefone.
 *
 * @param      {string}  phone
 * @return     {string}
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  return phone.length > 10 ? phone.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3') : phone.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
}
