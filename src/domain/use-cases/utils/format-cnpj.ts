/**
 * Retorna <valor> especificado com máscara do CNPJ.
 *
 * @param      {string}  cnpj
 * @return     {string}
 */
export function formatCnpj(cnpj: string): string {
  if (!cnpj) return '';
  const numbers = cleanedCnpj(cnpj).split('');
  return numbers.reduce((cnpj, num, index) => {
    const dot = [2, 5].includes(index) ? '.' : '';
    const slash = index === 8 ? '/' : '';
    const dash = index === 12 ? '-' : '';
    return `${cnpj}${dot}${slash}${dash}${num}`;
  }, '');
}

function cleanedCnpj(cnpj: string): string {
  return cnpj.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}
