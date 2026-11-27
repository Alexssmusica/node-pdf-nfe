import { formatDate } from './format-date';
import { formatTime } from './format-time';

/**
 * Formata data de acordo com <dt> especificado.
 * <dt> é no formato UTC, YYYY-MM-DDThh:mm:ssTZD (https://www.w3.org/TR/NOTE-datetime)
 *
 * @param      {string}  date 2022-11-03T16:20:52-03:00
 * @return     {string}
 */
export function formatDateTime(date: string): string {
  if (!date) return '';
  return `${formatDate(date)} ${formatTime(date)}`;
}
