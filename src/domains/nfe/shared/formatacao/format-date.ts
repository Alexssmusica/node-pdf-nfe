/**
 * Formata data de acordo com <dt> especificado.
 * <dt> é no formato UTC, YYYY-MM-DDThh:mm:ssTZD (https://www.w3.org/TR/NOTE-datetime)
 *
 * @param      {string}  date 2022-11-03T16:20:52-03:00
 * @return     {string}
 */
export function formatDate(date: string): string {
  if (!date) return '';
  const [ano, mes, dia] = date.substring(0, 10).split('-');
  return dia.padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + ano;
}
