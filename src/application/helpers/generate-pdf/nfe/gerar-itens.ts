import { formatNumber } from '../../../../domain/use-cases/utils';
import type { GeneratePdf } from '../../../../types';
import { criaLayout } from './cria-layout';
import { DEFAULT_NFE } from './default';
import { getDadosAdicionais } from './get-dados-adicionais';
import { getHomologacao } from './get-homologacao';
import { getNotaCancelada } from './get-nota-cancelada';
import { linhaHorizontal } from './linha-horizontal';
import { normal } from './normal';
import { optionsDocNFe } from './options-doc';

export async function gerarItens({
  nf,
  ajusteX,
  ajusteY,
  doc,
  margemEsquerda,
  margemTopo,
  margemDireita,
  larguraDoFormulario,
  pathLogo,
  cancelada
}: GeneratePdf.InputCriaMargem): Promise<void> {
  let folha = 0;
  const overflowTextAdicionais = await criaLayout({
    ajusteX,
    ajusteY,
    nf,
    doc,
    larguraDoFormulario,
    margemDireita,
    margemEsquerda,
    margemTopo,
    pathLogo,
    folha,
    cancelada
  });

  let dadosAdicionaisProcessado = !overflowTextAdicionais;

  const { ide } = nf.NFe.infNFe;
  function desenharMarcas(folhaAtual: number): void {
    if (ide.tpAmb === '2') {
      getHomologacao({
        ajusteX,
        ajusteY,
        doc,
        margemEsquerda,
        margemTopo,
        larguraDoFormulario,
        protNFe: nf.protNFe,
        cancelada,
        folha: folhaAtual
      });
    } else if (ide.tpAmb === '1' && cancelada) {
      getNotaCancelada({ ajusteX, ajusteY, doc, margemEsquerda, margemTopo, larguraDoFormulario, folha: folhaAtual });
    }
  }

  function fecharAreaItens(yRel: number): void {
    doc
      .rect(margemEsquerda + ajusteX - 1, margemTopo + ajusteY + yRel, larguraDoFormulario + 2, 823 - yRel)
      .fillColor('white')
      .fill();
    linhaHorizontal({ x1: 0, x2: 0, y: yRel, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  }

  let maiorY = doc.y;
  for (let i = 0; i < nf.NFe.infNFe.det.length; i++) {
    const item = nf.NFe.infNFe.det[i];

    function renderizarLinha(pdf: any): number {
      const y = maiorY + 3;
      normal({
        doc,
        value: item.prod.cProd,
        x: 1.5,
        y,
        largura: 51,
        alinhamento: 'center',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      normal({
        doc,
        value: item.prod.xProd,
        x: 55.5,
        y,
        largura: 178,
        alinhamento: 'justify',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      maiorY = Math.max(maiorY, pdf.y);
      normal({
        doc,
        value: item.prod.NCM,
        x: 235.5,
        y,
        largura: 32.5,
        alinhamento: 'center',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      maiorY = Math.max(maiorY, pdf.y);
      normal({
        doc,
        value: item.prod.CFOP,
        x: 293.5,
        y,
        largura: 21,
        alinhamento: 'center',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      maiorY = Math.max(maiorY, pdf.y);
      normal({
        doc,
        value: item.prod.uCom,
        x: 315.5,
        y,
        largura: 16.5,
        alinhamento: 'center',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      maiorY = Math.max(maiorY, pdf.y);
      normal({
        doc,
        value: formatNumber(item.prod.qCom, 4),
        x: 335,
        y,
        largura: 37,
        alinhamento: 'center',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      maiorY = Math.max(maiorY, pdf.y);
      normal({
        doc,
        value: formatNumber(item.prod.vUnCom, 2),
        x: 375,
        y,
        largura: 32.5,
        alinhamento: 'center',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      maiorY = Math.max(maiorY, pdf.y);
      normal({
        doc,
        value: formatNumber(item.prod.vProd, 2),
        x: 409.5,
        y,
        largura: 31,
        alinhamento: 'center',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      maiorY = Math.max(maiorY, pdf.y);

      const keys = Object.keys(item.imposto);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].includes('ICMS') && !keys[i].includes('UFDest')) {
          const newKeys = Object.keys(item.imposto[keys[i]]);
          normal({
            doc,
            value: item.imposto[keys[i]][newKeys[0]].CST
              ? `${item.imposto[keys[i]][newKeys[0]].orig}/${item.imposto[keys[i]][newKeys[0]].CST}`
              : '',
            x: 270,
            y,
            largura: 21,
            alinhamento: 'center',
            tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
            ajusteX,
            ajusteY,
            margemEsquerda,
            margemTopo
          });
          normal({
            doc,
            value: item.imposto[keys[i]][newKeys[0]].CSOSN
              ? `${item.imposto[keys[i]][newKeys[0]].orig}/${item.imposto[keys[i]][newKeys[0]].CSOSN}`
              : '',
            x: 270,
            y,
            largura: 21,
            alinhamento: 'center',
            tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
            ajusteX,
            ajusteY,
            margemEsquerda,
            margemTopo
          });
          maiorY = Math.max(maiorY, pdf.y);
          normal({
            doc,
            value: formatNumber(item.imposto[keys[i]][newKeys[0]].vBC ?? 0, 2),
            x: 443,
            y,
            largura: 32.5,
            alinhamento: 'center',
            tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
            ajusteX,
            ajusteY,
            margemEsquerda,
            margemTopo
          });
          maiorY = Math.max(maiorY, pdf.y);
          normal({
            doc,
            value: formatNumber(item.imposto[keys[i]][newKeys[0]].vICMS ?? 0, 2),
            x: 476,
            y,
            largura: 32,
            alinhamento: 'center',
            tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
            ajusteX,
            ajusteY,
            margemEsquerda,
            margemTopo
          });
          maiorY = Math.max(maiorY, pdf.y);
          normal({
            doc,
            value: formatNumber(item.imposto[keys[i]][newKeys[0]].pICMS ?? 0, 2),
            x: 532,
            y: y + 0.65,
            largura: 28,
            alinhamento: 'center',
            tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
            ajusteX,
            ajusteY,
            margemEsquerda,
            margemTopo
          });
          maiorY = Math.max(maiorY, pdf.y);
        }
      }

      normal({
        doc,
        value: formatNumber(item.imposto.IPI?.IPITrib?.vIPI ?? 0, 2),
        x: 507.5,
        y,
        largura: 26,
        alinhamento: 'center',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      maiorY = Math.max(maiorY, pdf.y);
      normal({
        doc,
        value: formatNumber(item.imposto.IPI?.IPITrib?.pIPI ?? 0, 2),
        x: 557.75,
        y,
        largura: 29,
        alinhamento: 'center',
        tamanho: DEFAULT_NFE.tamanhoDaFonteDosItens,
        ajusteX,
        ajusteY,
        margemEsquerda,
        margemTopo
      });
      maiorY = Math.max(maiorY, pdf.y);
      return Number(maiorY) + (DEFAULT_NFE.separadorDeItens !== undefined ? 3 : 0);
    }

    maiorY = renderizarLinha(doc);
    const limiarDePagina = folha === 0 ? DEFAULT_NFE.finalTamanhoDet1 - 26 : !dadosAdicionaisProcessado ? 740 : 800;

    if (doc.y > limiarDePagina) {
      if (!dadosAdicionaisProcessado && folha > 0) {
        getDadosAdicionais({
          ajusteX,
          ajusteY,
          doc,
          infAdic: { infCpl: overflowTextAdicionais, obsCont: [], obsFisco: [], procRef: [] },
          larguraDoFormulario,
          margemDireita,
          margemEsquerda,
          margemTopo,
          finalEspacoDet: maiorY - margemTopo - ajusteY,
          fecharAposConteudo: true
        });
        dadosAdicionaisProcessado = true;
      }
      if (folha > 0) desenharMarcas(folha);
      doc.addPage(optionsDocNFe);
      doc.y = 0;
      folha++;
      await criaLayout({
        ajusteX,
        ajusteY,
        nf,
        doc,
        larguraDoFormulario,
        margemDireita,
        margemEsquerda,
        margemTopo,
        pathLogo,
        folha,
        cancelada
      });
      maiorY = doc.y;
    } else {
      if (DEFAULT_NFE.separadorDeItens !== undefined) {
        linhaHorizontal({ x1: 0, x2: 0, y: maiorY, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
      }
    }
  }

  if (overflowTextAdicionais && !dadosAdicionaisProcessado) {
    const renderOnCurrentPage = folha > 0 && maiorY <= 821.8 - 60;

    if (renderOnCurrentPage) {
      getDadosAdicionais({
        ajusteX,
        ajusteY,
        doc,
        infAdic: { infCpl: overflowTextAdicionais, obsCont: [], obsFisco: [], procRef: [] },
        larguraDoFormulario,
        margemDireita,
        margemEsquerda,
        margemTopo,
        finalEspacoDet: maiorY - margemTopo - ajusteY,
        fecharAposConteudo: true
      });
    } else {
      if (folha > 0) desenharMarcas(folha);
      doc.addPage(optionsDocNFe);
      doc.y = 0;
      folha++;
      await criaLayout({
        ajusteX,
        ajusteY,
        nf,
        doc,
        larguraDoFormulario,
        margemDireita,
        margemEsquerda,
        margemTopo,
        pathLogo,
        folha,
        cancelada,
        overflowTextAdicionais
      });
    }
  } else if (folha > 0 && maiorY < 821.8) {
    fecharAreaItens(maiorY - margemTopo - ajusteY);
  }

  if (folha > 0) desenharMarcas(folha);
}
