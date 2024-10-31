/**
 * Retorna <valor> especificado com máscara do CPF.
 *
 * @param      {string}  cpf
 * @return     {string}
 */
export function formatCpf(cpf: string): string {
  if (!cpf) return '';
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
