import type { GeneratePdf } from '../../../../types';
import { criaLayout } from './cria-layout';
import { DEFAULT_NFE } from './default';
import { getDadosAdicionais } from './get-dados-adicionais';
import { getHomologacao } from './get-homologacao';
import { getNotaCancelada } from './get-nota-cancelada';
import { desenharItem, medirItem } from './item-danfe';
import { linhaHorizontal } from './linha-horizontal';
import { optionsDocNFe } from './options-doc';

const ESPACO_ITEM = 2;

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
  const qrCode = nf.NFe.infNFeSupl?.qrCode;
  let overflowTextAdicionais = await criaLayout({
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
  let maiorY = doc.y;
  let itensNaFolha = 0;

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
      .rect(margemEsquerda + ajusteX - 1, margemTopo + ajusteY + yRel, larguraDoFormulario + 2, DEFAULT_NFE.fundoDaPagina + 1.5 - yRel)
      .fillColor('white')
      .fill();
    linhaHorizontal({ x1: 0, x2: 0, y: yRel, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
  }

  function limiteGrade(): number {
    if (folha === 0) return DEFAULT_NFE.finalTamanhoDet1;
    if (!dadosAdicionaisProcessado) return DEFAULT_NFE.fundoDaPagina - DEFAULT_NFE.reservaDadosAdicionais;
    return DEFAULT_NFE.finalTamanhoDetDemais;
  }

  async function quebrarPagina(): Promise<void> {
    if (!dadosAdicionaisProcessado && folha > 0 && overflowTextAdicionais) {
      const restante = await getDadosAdicionais({
        ajusteX,
        ajusteY,
        doc,
        infAdic: { infCpl: overflowTextAdicionais, obsCont: [], obsFisco: [], procRef: [] },
        larguraDoFormulario,
        margemDireita,
        margemEsquerda,
        margemTopo,
        finalEspacoDet: maiorY,
        fecharAposConteudo: true,
        qrCode
      });
      if (restante !== overflowTextAdicionais) {
        overflowTextAdicionais = restante;
        dadosAdicionaisProcessado = !restante;
      }
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
  }

  const ctx = { doc, ajusteX, ajusteY, margemEsquerda, margemTopo, larguraDoFormulario };
  for (let i = 0; i < nf.NFe.infNFe.det.length; i++) {
    const item = nf.NFe.infNFe.det[i];
    const altura = medirItem(doc, item, larguraDoFormulario);
    const ocupacao = ESPACO_ITEM + altura + ESPACO_ITEM;
    if (itensNaFolha > 0 && maiorY + ocupacao > limiteGrade()) {
      await quebrarPagina();
      itensNaFolha = 0;
    }

    maiorY = desenharItem(ctx, item, maiorY + ESPACO_ITEM) + ESPACO_ITEM;
    if (DEFAULT_NFE.separadorDeItens) {
      linhaHorizontal({ x1: 0, x2: 0, y: maiorY, doc, ajusteX, ajusteY, margemDireita, margemEsquerda, margemTopo });
    }
    itensNaFolha++;
  }

  let guardAdicionais = 0;
  while (overflowTextAdicionais && !dadosAdicionaisProcessado && guardAdicionais < 8) {
    guardAdicionais++;
    const cabeNaFolha = folha > 0 && maiorY <= DEFAULT_NFE.fundoDaPagina - DEFAULT_NFE.reservaDadosAdicionais;
    if (cabeNaFolha) {
      const restante = await getDadosAdicionais({
        ajusteX,
        ajusteY,
        doc,
        infAdic: { infCpl: overflowTextAdicionais, obsCont: [], obsFisco: [], procRef: [] },
        larguraDoFormulario,
        margemDireita,
        margemEsquerda,
        margemTopo,
        finalEspacoDet: maiorY,
        fecharAposConteudo: true,
        qrCode
      });
      if (restante !== overflowTextAdicionais) {
        overflowTextAdicionais = restante;
        dadosAdicionaisProcessado = !restante;
        maiorY = DEFAULT_NFE.fundoDaPagina;
        continue;
      }
    }
    if (folha > 0) desenharMarcas(folha);
    doc.addPage(optionsDocNFe);
    doc.y = 0;
    folha++;
    itensNaFolha = 0;
    const restante = await criaLayout({
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
    if (restante === overflowTextAdicionais) break;
    overflowTextAdicionais = restante;
    dadosAdicionaisProcessado = !restante;
    maiorY = doc.y;
  }
  if (dadosAdicionaisProcessado && folha > 0 && itensNaFolha > 0 && maiorY < DEFAULT_NFE.fundoDaPagina) {
    fecharAreaItens(maiorY);
  }

  if (folha > 0) desenharMarcas(folha);
}
