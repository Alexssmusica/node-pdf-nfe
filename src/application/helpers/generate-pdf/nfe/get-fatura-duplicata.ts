import { format, parseISO } from 'date-fns';
import { formatMoney } from '../../../../domain/use-cases/utils';
import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';

export function getFaturaDuplicata({
  y,
  doc,
  ajusteX,
  ajusteY,
  margemDireita,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  cobr
}: GeneratePdf.InputFaturaDuplicata): number {
  if (cobr !== undefined && Object.keys(cobr).length > 0) {
    secao({ doc, value: 'FATURA / DUPLICATA', x: 1.5, y: y + 12, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });

    if (cobr.fat !== undefined) {
      doc
        .font('negrito')
        .fillColor(DEFAULT_NFE.corDoTitulo)
        .fontSize(8)
        .text('Número da Fatura:', 5, y + 24, {
          width: larguraDoFormulario - 5,
          align: 'justify',
          lineGap: -1.5,
          continued: true
        })
        .font('normal')
        .text(cobr.fat.nFat, { continued: true })
        .font('negrito')
        .text(' Valor Original:', { continued: true })
        .font('normal')
        .text(` ${formatMoney(cobr.fat.vOrig, 2)}`, { continued: true })
        .font('negrito')
        .text(' Valor Desconto:', { continued: true })
        .font('normal')
        .text(` ${formatMoney(cobr.fat.vDesc, 2)}`, { continued: true })
        .font('negrito')
        .text(' Valor Líquido:', { continued: true })
        .font('normal')
        .text(` ${formatMoney(cobr.fat.vLiq, 2)}.`, { continued: true });
    }

    if (cobr.dup !== undefined) {
      cobr.dup.forEach((dup, index) => {
        doc.font('negrito').text(' Duplicata:', { continued: true }).font('normal').text(` ${dup.nDup}`, { continued: true });
        doc
          .font('negrito')
          .text(' Valor:', { continued: true })
          .font('normal')
          .text(` ${formatMoney(dup.vDup, 2)}`, { continued: true });
        doc
          .font('negrito')
          .text(' Vencimento:', { continued: true })
          .font('normal')
          .text(` ${format(parseISO(dup.dVenc), 'dd/MM/yyyy')}`, { continued: true });

        if (index === cobr.dup.length - 1) {
          doc.text('');
        }
      });
    }

    linhaHorizontal({ x1: 0, x2: 0, y: y + 20, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    linhaHorizontal({ x1: 0, x2: 0, y: doc.y + 6, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    linhaVertical({ y1: y + 20, y2: doc.y + 6, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    linhaVertical({ y1: y + 20, y2: doc.y + 6, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  }

  return doc.y;
}
