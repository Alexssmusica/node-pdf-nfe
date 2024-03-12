import { GeneratePdf } from '../../../../domain/contracts/repos/generate-pdf';
import { DEFAULT_NFE } from './default';



export function normal({
  ajusteX,
  ajusteY,
  doc,
  largura,
  margemEsquerda,
  margemTopo,
  value = '',
  x,
  y,
  alinhamento = 'center',
  tamanho = 8,
}: GeneratePdf.InputNormal) {
  doc.font('normal')
    .fillColor(DEFAULT_NFE.corDoTitulo)
    .fontSize(tamanho)
    .text(value, margemEsquerda + ajusteX + x, margemTopo + ajusteY + y, {
      width: largura,
      align: alinhamento,
      lineGap: -1.5,
    });
}
