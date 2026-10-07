import QRCode from 'qrcode';
import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';
import { linhaHorizontal } from './linha-horizontal';
import { linhaVertical } from './linha-vertical';
import { secao } from './secao';
import { titulo } from './titulo';

export async function getDadosAdicionais({
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
  fecharAposConteudo,
  qrCode
}: GeneratePdf.InputDadosAdicionais): Promise<string> {
  const maxBottom = DEFAULT_NFE.fundoDaPagina;
  const temQr = Boolean(qrCode);
  const larguraQr = 82;
  const xFisco = temQr ? 292 : 388.25;
  const xQr = larguraDoFormulario - larguraQr;
  const text = infAdic?.infCpl ?? '';
  const textWidth = xFisco - 6;
  const textOpts = { width: textWidth, lineGap: -1.5 };
  const availableHeight = maxBottom - finalEspacoDet - 17.5;
  const qrImage = qrCode ? await QRCode.toDataURL(qrCode) : '';

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
  linhaVertical({ y1: finalEspacoDet + 8, y2: sectionBottom, x: xFisco, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  if (temQr) {
    linhaVertical({ y1: finalEspacoDet + 8, y2: sectionBottom, x: xQr, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });
  }
  linhaVertical({ y1: finalEspacoDet + 8, y2: sectionBottom, x: larguraDoFormulario, doc, ajusteX, ajusteY, margemEsquerda, margemTopo });

  secao({ doc, value: 'DADOS ADICIONAIS', x: 1.5, y: finalEspacoDet, largura: 0, ajusteX, ajusteY, margemEsquerda, margemTopo });
  titulo({
    value: 'INFORMAÇÕES COMPLEMENTARES',
    x: 1.5,
    y: finalEspacoDet + 10,
    largura: textWidth,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  titulo({
    value: 'RESERVADO AO FISCO',
    x: xFisco + 2,
    y: finalEspacoDet + 10,
    largura: (temQr ? xQr : larguraDoFormulario) - xFisco - 4,
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo
  });
  if (temQr) {
    titulo({
      value: 'QR CODE',
      x: xQr + 2,
      y: finalEspacoDet + 10,
      largura: larguraQr - 4,
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo
    });
    const qrTop = margemTopo + ajusteY + finalEspacoDet + 18;
    const qrMax = margemTopo + ajusteY + sectionBottom - 2;
    const qrSize = Math.min(larguraQr - 8, Math.max(0, qrMax - qrTop));
    if (qrImage && qrSize >= 16) {
      doc.image(qrImage, margemEsquerda + ajusteX + xQr + 4, qrTop, { fit: [qrSize, qrSize] });
    }
  }

  const textX = margemEsquerda + ajusteX + 1;
  const textY = margemTopo + ajusteY + finalEspacoDet + 17.5;

  if (!hasOverflow) {
    doc
      .font('normal')
      .fillColor('black')
      .fontSize(6)
      .text(text, textX, textY, { ...textOpts, align: 'justify' });
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

  doc
    .font('normal')
    .fillColor('black')
    .fontSize(6)
    .text(page1Text, textX, textY, { ...textOpts, height: heightForText, align: 'justify' });
  doc
    .font('normal')
    .fillColor('black')
    .fontSize(6)
    .text('Continua no verso', textX, margemTopo + ajusteY + maxBottom - 8, { width: textWidth, align: 'right' });

  return remainingText;
}
