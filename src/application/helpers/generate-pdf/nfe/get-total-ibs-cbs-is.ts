import type { GeneratePdf } from '../../../../types';
import { desenharBlocoTotais, moeda } from './bloco-totais';

export function getTotalIbsCbsIs(input: GeneratePdf.InputImposto): number {
  const ibsCbs = input.total.IBSCBSTot;
  const mono = ibsCbs?.gMono;
  return desenharBlocoTotais({
    ...input,
    tituloSecao: 'TOTAL DO IBS / CBS / IS',
    tamanhoTitulo: 5.5,
    alturaLinha: 22,
    linhas: [
      [
        { titulo: 'VALOR DA CBS', valor: moeda(ibsCbs?.gCBS?.vCBS) },
        { titulo: 'VALOR DO IBS UF', valor: moeda(ibsCbs?.gIBS?.gIBSUF?.vIBSUF) },
        { titulo: 'VALOR DO IBS MUNICÍPIO', valor: moeda(ibsCbs?.gIBS?.gIBSMun?.vIBSMun) },
        { titulo: 'VALOR DO IMPOSTO SELETIVO', valor: moeda(input.total.ISTot?.vIS) }
      ],
      [
        { titulo: 'VALOR DO IBS MONOFÁSICO', valor: moeda(mono?.vIBSMono) },
        { titulo: 'VALOR DA CBS MONOFÁSICA', valor: moeda(mono?.vCBSMono) },
        { titulo: 'VALOR DO IBS MONOFÁSICO POR RETENÇÃO', valor: moeda(mono?.vIBSMonoReten) },
        { titulo: 'VALOR DA CBS MONOFÁSICA POR RETENÇÃO', valor: moeda(mono?.vCBSMonoReten) }
      ]
    ]
  });
}
