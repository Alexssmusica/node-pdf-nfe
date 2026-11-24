import type { GeneratePdf } from '../../../../types';
import { optionsDocFromGeometria } from './geometria-nfe';
import { criaLayout } from './cria-layout';
import { DEFAULT_NFE } from './default';
import { getDadosAdicionais } from './get-dados-adicionais';
import { getHomologacao } from './get-homologacao';
import { getNotaCancelada } from './get-nota-cancelada';
import { desenharItem, medirItem } from './item-danfe';
import { linhaHorizontal } from './linha-horizontal';

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
  geometria,
  pathLogo,
  cancelada
}: GeneratePdf.InputCriaMargem): Promise<void> {
  let folha = 0;
  const qrCode = nf.NFe.infNFeSupl?.qrCode;
  const det = nf.NFe.infNFe.det;
  const alturasItens = det.map((item) => ESPACO_ITEM + medirItem(doc, item, larguraDoFormulario, geometria) + ESPACO_ITEM);

  let overflowTextAdicionais = await criaLayout({
    ajusteX,
    ajusteY,
    nf,
    doc,
    larguraDoFormulario,
    margemDireita,
    margemEsquerda,
    margemTopo,
    geometria,
    pathLogo,
    folha,
    cancelada
  });
  let dadosAdicionaisProcessado = !overflowTextAdicionais;
  let maiorY = doc.y;
  let itensNaFolha = 0;

  const { ide } = nf.NFe.infNFe;
  function deveMarcar(folhaAtual: number): boolean {
    return folhaAtual > 0 || geometria.marcaDaguaAposConteudo;
  }
  function desenharMarcas(folhaAtual: number): void {
    if (ide.tpAmb === '2') {
      getHomologacao({
        ajusteX,
        ajusteY,
        doc,
        margemEsquerda,
        margemTopo,
        larguraDoFormulario,
        geometria,
        protNFe: nf.protNFe,
        cancelada,
        folha: folhaAtual
      });
    } else if (ide.tpAmb === '1' && cancelada) {
      getNotaCancelada({ ajusteX, ajusteY, doc, margemEsquerda, margemTopo, larguraDoFormulario, geometria, folha: folhaAtual });
    }
  }

  function limiteGrade(): number {
    if (folha === 0) return geometria.finalTamanhoDet1;
    if (!dadosAdicionaisProcessado) return geometria.fundoDaPagina - geometria.reservaDadosAdicionais;
    return geometria.finalTamanhoDetDemais;
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
        geometria,
        finalEspacoDet: maiorY,
        fecharAposConteudo: true,
        qrCode
      });
      if (restante !== overflowTextAdicionais) {
        overflowTextAdicionais = restante;
        dadosAdicionaisProcessado = !restante;
      }
    }
    if (deveMarcar(folha)) desenharMarcas(folha);
    doc.addPage(optionsDocFromGeometria(geometria));
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
      geometria,
      pathLogo,
      folha,
      cancelada
    });
    maiorY = doc.y;
  }

  const ctx = { doc, ajusteX, ajusteY, margemEsquerda, margemTopo, larguraDoFormulario, geometria };
  for (let i = 0; i < det.length; i++) {
    const item = det[i];
    const ocupacao = alturasItens[i];
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
    const cabeNaFolha = folha > 0 && maiorY <= geometria.fundoDaPagina - geometria.reservaDadosAdicionais;
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
        geometria,
        finalEspacoDet: maiorY,
        fecharAposConteudo: true,
        qrCode
      });
      if (restante !== overflowTextAdicionais) {
        overflowTextAdicionais = restante;
        dadosAdicionaisProcessado = !restante;
        maiorY = geometria.fundoDaPagina;
        continue;
      }
    }
    if (deveMarcar(folha)) desenharMarcas(folha);
    doc.addPage(optionsDocFromGeometria(geometria));
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
      geometria,
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

  if (deveMarcar(folha)) desenharMarcas(folha);
}
