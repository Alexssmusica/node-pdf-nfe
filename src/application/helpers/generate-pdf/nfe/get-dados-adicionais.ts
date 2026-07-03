import type { GeneratePdf } from '../../../../types';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';
import { titulo } from './titulo';

export function getDadosAdicionais({
  doc,
  ajusteX,
  ajusteY,
  margemEsquerda,
  margemTopo,
  margemDireita,
  larguraDoFormulario,
  infAdic,
  finalEspacoDet,
  earlyClose,
  fecharAposConteudo
}: GeneratePdf.InputDadosAdicionais): string {
  const maxBottom = 821.8;
  const text = infAdic?.infCpl ?? '';
  const textWidth = 386;
  const textOpts = { width: textWidth, lineGap: -1.5 };
  const availableHeight = maxBottom - finalEspacoDet - 17.5;

  doc.font('normal').fillColor('black').fontSize(6);
  const fullHeight = doc.heightOfString(text, textOpts);

  const hasOverflow = fullHeight > availableHeight;

  const fecharCedo = (earlyClose || fecharAposConteudo) && !hasOverflow;
  const sectionBottom = fecharCedo ? Math.min(maxBottom, finalEspacoDet + 17.5 + fullHeight + 5) : maxBottom;

  if (!earlyClose) {
    doc
      .rect(margemEsquerda + ajusteX - 1, margemTopo + ajusteY + finalEspacoDet, larguraDoFormulario + 2, maxBottom + 1.5 - finalEspacoDet)
      .fillColor('white')
      .fill();
  }

  linhaHorizontal({ x1: 0, x2: 0, y: finalEspacoDet, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: finalEspacoDet + 8, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaHorizontal({ x1: 0, x2: 0, y: sectionBottom, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  linhaVertical({ y1: finalEspacoDet + 8, y2: sectionBottom, x: 0, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: finalEspacoDet + 8, y2: sectionBottom, x: 388.25, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  linhaVertical({ y1: finalEspacoDet + 8, y2: sectionBottom, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

  secao({ doc, value: 'DADOS ADICIONAIS', x: 1.5, y: finalEspacoDet, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
  titulo({
    value: 'INFORMAÇÕES COMPLEMENTARES',
    x: 1.5,
    y: finalEspacoDet + 10,
    largura: 385.5,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'RESERVADO AO FISCO',
    x: 390,
    y: finalEspacoDet + 10,
    largura: 195,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });

  const textX = margemEsquerda + ajusteX + 1;
  const textY = margemTopo + ajusteY + finalEspacoDet + 17.5;

  if (!hasOverflow) {
    doc.text(text, textX, textY, { ...textOpts, align: 'justify' });
    return '';
  }

  const heightForText = availableHeight - 9;

  let lo = 0;
  let hi = text.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2);
    if (doc.heightOfString(text.slice(0, mid), textOpts) <= heightForText) {
      lo = mid;
    } else {
      hi = mid - 1;
    }
  }

  const lastSpace = text.lastIndexOf(' ', lo);
  const splitAt = lastSpace > 0 ? lastSpace : lo;

  const page1Text = text.slice(0, splitAt).trimEnd();
  const remainingText = text.slice(splitAt).trimStart();

  doc.text(page1Text, textX, textY, { ...textOpts, height: heightForText, align: 'justify' });

  doc
    .font('normal')
    .fillColor('black')
    .fontSize(6)
    .text('Continua no verso', textX, margemTopo + ajusteY + maxBottom - 8, { width: textWidth, align: 'right' });

  return remainingText;
}
