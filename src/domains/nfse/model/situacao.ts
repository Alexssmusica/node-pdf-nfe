/** Situações da NFS-e que exigem marca d'água (NT 008, seções 2.5.1 e 2.5.2). */
export function isCancelada(codigo: string): boolean {
  return ['102'].includes(String(codigo ?? '').trim());
}

export function isSubstituida(codigo: string, chSubstda: string): boolean {
  if (chSubstda && String(chSubstda).trim()) return true;
  return ['103'].includes(String(codigo ?? '').trim());
}
