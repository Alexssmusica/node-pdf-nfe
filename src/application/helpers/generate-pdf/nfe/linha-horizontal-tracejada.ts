import { type GeneratePdf } from '../../../../domain/contracts/repos';
import { linhaHorizontal } from './linha-horizontal';

export function linhaHorizontalTracejada(input: GeneratePdf.InputLinhaHorizontal): void {
  linhaHorizontal({ ...input, tracejada: false });
}
