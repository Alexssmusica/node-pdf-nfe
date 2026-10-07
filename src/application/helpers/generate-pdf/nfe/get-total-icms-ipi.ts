import type { GeneratePdf } from '../../../../types';
import { desenharBlocoTotais, moeda } from './bloco-totais';

export function getTotalIcmsIpi(input: GeneratePdf.InputImposto): number {
  const icms = input.total.ICMSTot;
  return desenharBlocoTotais({
    ...input,
    tituloSecao: 'TOTAL DO ICMS / IPI',
    tamanhoTitulo: 5,
    alturaLinha: 24,
    linhas: [
      [
        { titulo: 'BASE DE CÁLCULO DO ICMS', valor: moeda(icms.vBC) },
        { titulo: 'VALOR DO ICMS', valor: moeda(icms.vICMS) },
        { titulo: 'BASE DE CÁLCULO DO ICMS ST', valor: moeda(icms.vBCST) },
        { titulo: 'VALOR DO ICMS ST', valor: moeda(icms.vST) },
        { titulo: 'VALOR DO IPI', valor: moeda(icms.vIPI) },
        { titulo: 'VALOR DO FCP', valor: moeda(icms.vFCP) },
        { titulo: 'VALOR DO FCP RETIDO POR ST', valor: moeda(icms.vFCPST) }
      ],
      [
        { titulo: 'VALOR DO DIFAL NA UF DE DESTINO', valor: moeda(icms.vICMSUFDest) },
        { titulo: 'VALOR DO FCP NA UF DE DESTINO', valor: moeda(icms.vFCPUFDest) },
        { titulo: 'BC DO ICMS MONOFÁSICO', valor: moeda(icms.qBCMono) },
        { titulo: 'VALOR DO ICMS MONOFÁSICO', valor: moeda(icms.vICMSMono) },
        { titulo: 'BC DO ICMS MONOFÁSICO POR RETENÇÃO', valor: moeda(icms.qBCMonoReten) },
        { titulo: 'VALOR DO ICMS MONOFÁSICO POR RETENÇÃO', valor: moeda(icms.vICMSMonoReten) }
      ]
    ]
  });
}
