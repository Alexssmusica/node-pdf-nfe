import pdfkit from 'pdfkit';
import { NFeProc } from '../../contracts/repos';
import { loadFonts } from '../../../application/helpers/generate-pdf/nfe/load-fontes';
import { optionsDocNFe } from '../../../application/helpers/generate-pdf/nfe/options-doc';

const margemTopo = 2.8;
const margemEsquerda = 3;
const margemDireita = 589.65;
const larguraDoFormulario = margemDireita - margemEsquerda;

async function pdfNFe(nf: NFeProc, pathLogo: string): Promise<PDFKit.PDFDocument> {
  const ajusteY = 0;
  const ajusteX = 0;
  const doc = new pdfkit(optionsDocNFe);
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
      margemTopo,
    });
  }

  doc.flushPages();
  doc.end();
  return doc;
}

export { pdfNFe };
