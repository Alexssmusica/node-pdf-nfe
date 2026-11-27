import { formatCnpj } from '../../../shared/formatacao/format-cnpj';
import { formatCpf } from '../../../shared/formatacao/format-cpf';

export function formatDate(value: string): string {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return value;
  return `${m[3]}/${m[2]}/${m[1]}`;
}

export function formatDateTime(value: string): string {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!m) return value;
  return `${m[3]}/${m[2]}/${m[1]} ${m[4]}:${m[5]}:${m[6]}`;
}

/**
 * Documentos com menos dígitos que o esperado recebem zeros à esquerda antes da máscara.
 * NIF sem dígitos e documentos com mais de 14 dígitos permanecem sem máscara.
 */
export function formatCnpjCpf(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits || digits.length > 14) return value;
  if (digits.length <= 11) return formatCpf(digits.padStart(11, '0'));
  return formatCnpj(digits.padStart(14, '0'));
}

export function formatCep(value: string): string {
  const clean = value.replace(/\D/g, '');
  if (clean.length === 8) {
    return `${clean.slice(0, 5)}-${clean.slice(5, 8)}`;
  }
  return value;
}

export function formatPhone(value: string): string {
  const clean = value.replace(/\D/g, '');
  if (clean.length === 13) {
    return `+${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4, 9)}-${clean.slice(9, 13)}`;
  } else if (clean.length === 12) {
    return `+${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4, 8)}-${clean.slice(8, 12)}`;
  } else if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  } else if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6, 10)}`;
  } else if (clean.length === 9) {
    return `${clean.slice(0, 5)}-${clean.slice(5, 9)}`;
  } else if (clean.length === 8) {
    return `${clean.slice(0, 4)}-${clean.slice(4, 8)}`;
  }
  return value || '-';
}

export function formatCodTribNac(value: string): string {
  const clean = value.replace(/\D/g, '');
  if (clean.length === 6) {
    return `${clean.slice(0, 2)}.${clean.slice(2, 4)}.${clean.slice(4, 6)}`;
  }
  return value;
}

/**
 * Formata o codigo NBS no padrao n.nnnn.nn.nn (9 digitos).
 */
export function formatCodNbs(value: string): string {
  const clean = (value || '').replace(/\D/g, '');
  if (clean.length === 9) {
    return `${clean.slice(0, 1)}.${clean.slice(1, 5)}.${clean.slice(5, 7)}.${clean.slice(7, 9)}`;
  }
  return value || '-';
}

export function formatMoney(val: number | string, decimals = 2, percentual = false): string {
  if (typeof val === 'string' && val === '-') return '-';
  const numVal = typeof val === 'number' ? val : parseFloat(val);
  if (isNaN(numVal)) return val.toString();

  const formatted = numVal.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return `${percentual ? '' : 'R$ '}${formatted}${percentual ? ' %' : ''}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}
