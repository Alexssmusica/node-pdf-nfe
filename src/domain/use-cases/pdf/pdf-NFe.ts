import PDFKit from 'pdfkit';
import { gerarItens } from '../../../application/helpers/generate-pdf/nfe/gerar-itens';
import { italico } from '../../../application/helpers/generate-pdf/nfe/italico';
import { loadFonts } from '../../../application/helpers/generate-pdf/nfe/load-fontes';
import { optionsDocNFe } from '../../../application/helpers/generate-pdf/nfe/options-doc';
import type { NFeProc } from '../../../types';

const margemTopo = 2.8;
const margemEsquerda = 3;
const margemDireita = 589.65;
const larguraDoFormulario = margemDireita - margemEsquerda;

export async function pdfNFe(nf: NFeProc, pathLogo?: string): Promise<PDFKit.PDFDocument> {
  const ajusteY = 0;
  const ajusteX = 0;
  const doc = new PDFKit(optionsDocNFe);

  loadFonts(doc);
  await gerarItens({ ajusteX, ajusteY, nf, doc, larguraDoFormulario, margemDireita, margemEsquerda, margemTopo, pathLogo });

  const paginas = doc.bufferedPageRange();
  for (let i = paginas.start; i < paginas.start + paginas.count; i++) {
    doc.switchToPage(i);
    italico({
      doc,
      value: `FOLHA ${i + 1}/${paginas.start + paginas.count}`,
      x: 241.2,
      y: i === 0 ? 141.2 : 97.4,
      largura: 98.5,
      alinhamento: 'center',
      tamanho: 8,
      ajusteX,
      ajusteY,
      margemEsquerda,
      margemTopo
    });
  }
  doc.flushPages();
  doc.end();
  return doc;
}
