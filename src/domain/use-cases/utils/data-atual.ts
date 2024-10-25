import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function getDataAtual(): string {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx", { locale: ptBR });
}
