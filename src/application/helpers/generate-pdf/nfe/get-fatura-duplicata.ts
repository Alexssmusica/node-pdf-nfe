import { format, parseISO } from 'date-fns';
import { formatNumber } from '../../../../domain/use-cases/utils';
import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';

const BOXES_PER_ROW = 8;
const BOX_HEIGHT = 27;
const BOX_PADDING = 4;
const BOX_GAP = 3;
const BOX_RADIUS = 2;
const BOX_LINE_HEIGHT = 7.5;

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
    const baseY = y + 9;
    secao({ doc, value: 'FATURA / DUPLICATA', x: 1.5, y: y + 0.9, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });

    linhaHorizontal({ x1: 0, x2: 0, y: baseY, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });

    const availableWidth = larguraDoFormulario - BOX_PADDING * 2;
    const boxWidth = (availableWidth - (BOXES_PER_ROW - 1) * BOX_GAP) / BOXES_PER_ROW;

    let currentY = baseY + BOX_PADDING;
    let currentX = BOX_PADDING;
    let maxBottom = currentY;

    if (cobr.fat !== undefined) {
      const fatX = margemEsquerda + ajusteX + BOX_PADDING;
      const fatY = margemTopo + ajusteY + currentY;
      doc
        .font('normal')
        .fillColor(DEFAULT_NFE.corDoTitulo)
        .fontSize(7)
        .text(
          `Nº Fatura: ${cobr.fat.nFat} | Orig: ${formatNumber(cobr.fat.vOrig, 2)} | Liq: ${formatNumber(cobr.fat.vLiq, 2)}`,
          fatX,
          fatY,
          {
            width: larguraDoFormulario - BOX_PADDING * 2
          }
        );
      currentY += 10;
      maxBottom = currentY;
      currentX = BOX_PADDING;
    }

    if (cobr.dup !== undefined) {
      doc.save();
      cobr.dup.forEach((dup) => {
        const boxRealX = margemEsquerda + ajusteX + currentX;
        const boxRealY = margemTopo + ajusteY + currentY;

        doc.lineWidth(0.5).strokeColor(DEFAULT_NFE.corDoLayout).roundedRect(boxRealX, boxRealY, boxWidth, BOX_HEIGHT, BOX_RADIUS).stroke();

        const textX = boxRealX + BOX_PADDING;
        const textWidth = boxWidth - BOX_PADDING * 2;
        const labelWidth = 22;
        const valueWidth = textWidth - labelWidth;
        const lineY = boxRealY + BOX_PADDING;

        doc.font('normal').fillColor(DEFAULT_NFE.corDoTitulo).fontSize(7).text('Num.', textX, lineY);
        doc.font('negrito').text(dup.nDup, textX + textWidth - valueWidth, lineY, { width: valueWidth, align: 'right' });

        doc.font('normal').text('Venc.', textX, lineY + BOX_LINE_HEIGHT);
        doc.font('negrito').text(format(parseISO(dup.dVenc), 'dd/MM/yyyy'), textX + textWidth - valueWidth, lineY + BOX_LINE_HEIGHT, {
          width: valueWidth,
          align: 'right'
        });

        doc.font('normal').text('Valor', textX, lineY + BOX_LINE_HEIGHT * 2);
        doc
          .font('negrito')
          .fontSize(6)
          .text(`R$ ${formatNumber(dup.vDup, 2)}`, textX + textWidth - valueWidth, lineY + BOX_LINE_HEIGHT * 2, {
            width: valueWidth,
            align: 'right',
            height: BOX_LINE_HEIGHT,
            ellipsis: true
          });
        doc.fontSize(7);

        const boxBottom = currentY + BOX_HEIGHT;
        if (boxBottom > maxBottom) maxBottom = boxBottom;

        currentX += boxWidth + BOX_GAP;
        if (currentX + boxWidth > larguraDoFormulario - BOX_PADDING) {
          currentX = BOX_PADDING;
          currentY = maxBottom + BOX_GAP;
        }
      });
      doc.restore();
    }

    const finalY = maxBottom + BOX_PADDING + 6;
    linhaHorizontal({ x1: 0, x2: 0, y: finalY, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    linhaVertical({ y1: baseY, y2: finalY, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
    linhaVertical({ y1: baseY, y2: finalY, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

    doc.y = margemTopo + ajusteY + finalY;
  }

  return doc.y;
}
