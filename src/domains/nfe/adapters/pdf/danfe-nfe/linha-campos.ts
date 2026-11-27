import type { GeometriaDanfe } from './geometria-nfe';

export function offsetsLinha(
  geometria: GeometriaDanfe,
  alturaLinha: number,
  tamanhoTitulo: number,
  tamanhoCampo: number,
  legado: { titulo: number; campo: number }
): { titulo: number; campo: number } {
  if (geometria.orientacao !== 'PAISAGEM') return legado;
  const padding = Math.min(1.2, alturaLinha * 0.09);
  const alturaTitulo = tamanhoTitulo * 1.18;
  const alturaCampo = tamanhoCampo * 1.18;
  return { titulo: padding, campo: Math.max(padding + alturaTitulo, alturaLinha - alturaCampo - padding) };
}
