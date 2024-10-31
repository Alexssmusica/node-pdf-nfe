import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function getCurrentDate(): string {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx", { locale: ptBR });
}
