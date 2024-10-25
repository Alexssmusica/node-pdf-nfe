import type { GeneratePdf } from '../../../../types';
import { linhaHorizontal } from './linha-horizontal';

export function linhaHorizontalTracejada(input: GeneratePdf.InputLinhaHorizontal): void {
  linhaHorizontal({ ...input, tracejada: false });
}
