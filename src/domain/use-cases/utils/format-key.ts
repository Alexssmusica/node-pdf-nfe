/**
 * Retorna a <cahve> da NFE formata.
 * Formatação: grupos de 4 números separados por espaço.
 * @param      {string}  key
 * @return     {string}
 */
export function formatKey(key: string): string {
  return key.replace(/(.{4})(?=.)/g, '$1 ');
}
