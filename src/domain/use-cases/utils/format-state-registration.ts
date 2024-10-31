/**
 * Retorna <valor> especificado com máscara do Inscrição Estadual.
 *
 * @param      {string}  stateRegistration
 * @return     {string}
 */
export function formatStateRegistration(stateRegistration: string): string {
  if (!stateRegistration) return '';
  const cleanInscricao = stateRegistration.replace(/\D/g, '');
  const formats: { [key: number]: string } = {
    8: '$1.$2-$3',
    9: '$1.$2.$3-$4',
    10: '$1.$2.$3-$4',
    11: '$1.$2.$3-$4',
    12: '$1.$2.$3.$4-$5',
    13: '$1.$2.$3-$4',
    14: '$1.$2.$3.$4-$5'
  };
  const length = cleanInscricao.length;
  const format = formats[length];
  if (!format) {
    return '';
  }
  let regexPattern = new RegExp('');
  if (length === 8) {
    regexPattern = /(\d{3})(\d{3})(\d{2})/;
  } else if (length === 9) {
    regexPattern = /(\d{2})(\d{3})(\d{3})(\d{1})/;
  } else if (length === 10) {
    regexPattern = /(\d{2})(\d{3})(\d{3})(\d{2})/;
  } else if (length === 11) {
    regexPattern = /(\d{3})(\d{3})(\d{3})(\d{2})/;
  } else if (length === 12) {
    regexPattern = /(\d{2})(\d{3})(\d{3})(\d{3})(\d{1})/;
  } else if (length === 13) {
    regexPattern = /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/;
  } else if (length === 14) {
    regexPattern = /(\d{3})(\d{3})(\d{3})(\d{3})(\d{2})/;
  }
  const match = cleanInscricao.match(regexPattern);
  if (!match) {
    return '';
  }
  return format.replace(/\$(\d+)/g, (_, index) => match[parseInt(index)] || '');
}
