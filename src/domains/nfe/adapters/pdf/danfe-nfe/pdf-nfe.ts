import PDFKit from 'pdfkit';
import { gerarItens } from './gerar-itens';
import { getGeometria, normalizarOrientacaoDanfe, optionsDocFromGeometria } from './geometria-nfe';
import { italico } from './italico';
import { loadFonts } from './load-fontes';
import type { NFeProc, OpcoesPDF } from '../../../contracts';

export async function pdfNFe(nf: NFeProc, opcoes?: OpcoesPDF): Promise<PDFKit.PDFDocument> {
  const geometria = getGeometria(normalizarOrientacaoDanfe(opcoes?.orientacao));
  const ajusteY = 0;
  const ajusteX = 0;
  const doc = new PDFKit(optionsDocFromGeometria(geometria));
  loadFonts(doc);

  const margemTopo = geometria.margemTopo;
  const margemEsquerda = geometria.margemEsquerda;
  const margemDireita = geometria.margemDireitaConteudo;
  const larguraDoFormulario = geometria.larguraDoFormulario;

  await gerarItens({
    ajusteX,
    ajusteY,
    nf,
    doc,
    larguraDoFormulario,
    margemDireita,
    margemEsquerda,
    margemTopo,
    geometria,
    pathLogo: opcoes?.pathLogo,
    cancelada: opcoes?.cancelada
  });

  const paginas = doc.bufferedPageRange();
  for (let i = paginas.start; i < paginas.start + paginas.count; i++) {
    doc.switchToPage(i);
    const yFolha = i === 0 ? geometria.folhaIndicadorYPrimeiraPagina : geometria.folhaIndicadorYDemaisPaginas;
    italico({
      doc,
      value: `FOLHA ${i + 1}/${paginas.start + paginas.count}`,
      x: geometria.folhaIndicadorX,
      y: yFolha,
      largura: geometria.folhaIndicadorLargura,
      alinhamento: 'center',
      tamanho: geometria.folhaIndicadorTamanho,
      ajusteX,
      ajusteY,
      margemEsquerda,
      margemTopo
    });
  }
  doc.flushPages();
  if (!opcoes || !opcoes.notEndDocument) doc.end();
  return doc;
}
