import type { GeneratePdf } from './tipos-layout';
import { linhaHorizontal } from './linha-horizontal';

export function linhaHorizontalTracejada(input: GeneratePdf.InputLinhaHorizontal): void {
  linhaHorizontal({ ...input, tracejada: true });
}
