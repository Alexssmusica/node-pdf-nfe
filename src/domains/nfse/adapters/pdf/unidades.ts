/** Conversão entre milímetros (medidas da NT 008) e pontos do PDF. */
export function mm(valueMm: number): number {
  return (valueMm / 25.4) * 72;
}

export function pxToMm(px: number): number {
  return (px / 72) * 25.4;
}
