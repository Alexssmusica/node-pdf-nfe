import type { GeneratePdf } from './tipos-layout';
import { getDadosAdicionais } from './get-dados-adicionais';
import { getDadosEmitente } from './get-dados-emitente';
import { getDestinatarioRemetente } from './get-destinatario-remetente';
import { getFaturaDuplicata } from './get-fatura-duplicata';
import { getHomologacao } from './get-homologacao';
import { getIss } from './get-iss';
import { getMenuItens } from './get-menu-itens';
import { getNotaCancelada } from './get-nota-cancelada';
import { getRecibo } from './get-recibo';
import { getReciboPaisagem } from './get-recibo-paisagem';
import { getTotalIbsCbsIs } from './get-total-ibs-cbs-is';
import { getTotalIcmsIpi } from './get-total-icms-ipi';
import { getTotalProdutos } from './get-total-produtos';
import { getTransporte } from './get-transporte';

export async function criaLayout({
  pathLogo,
  nf,
  ajusteX,
  ajusteY,
  doc,
  margemEsquerda,
  margemTopo,
  larguraDoFormulario,
  margemDireita,
  geometria,
  folha,
  cancelada,
  overflowTextAdicionais
}: GeneratePdf.InputCriaLayout): Promise<string> {
  const { dest, emit, ide, infAdic, total, transp, cobr } = nf.NFe.infNFe;
  let y = 0;
  const finalEspacoDet = folha === 0 ? geometria.finalTamanhoDet1 : geometria.finalTamanhoDetDemais;
  const qrCode = nf.NFe.infNFeSupl?.qrCode;

  if (folha === 0 && !geometria.marcaDaguaAposConteudo) {
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
        folha
      });
    } else if (ide.tpAmb === '1' && cancelada) {
      getNotaCancelada({ ajusteX, ajusteY, doc, margemEsquerda, margemTopo, larguraDoFormulario, geometria, folha });
    }
  }

  if (folha === 0) {
    if (geometria.desenharCanhotoLateral) {
      getReciboPaisagem({
        y,
        ajusteX,
        ajusteY,
        dest,
        doc,
        emit,
        larguraDoFormulario,
        margemDireita,
        margemEsquerda,
        margemTopo,
        geometria,
        total,
        ide
      });
    } else {
      y = getRecibo({
        y,
        ajusteX,
        ajusteY,
        dest,
        doc,
        emit,
        larguraDoFormulario,
        margemDireita,
        margemEsquerda,
        margemTopo,
        geometria,
        total,
        ide
      });
    }
  }

  await getDadosEmitente({
    ajusteX,
    ajusteY,
    doc,
    emit,
    larguraDoFormulario,
    margemDireita,
    margemEsquerda,
    margemTopo,
    geometria,
    protNFe: nf.protNFe,
    y,
    pathLogo,
    ide,
    folha
  });

  y = getDestinatarioRemetente({
    ajusteX,
    ajusteY,
    dest,
    doc,
    larguraDoFormulario,
    margemDireita,
    margemEsquerda,
    margemTopo,
    geometria,
    y: doc.y,
    ide
  });

  if (overflowTextAdicionais) {
    return await getDadosAdicionais({
      ajusteX,
      ajusteY,
      doc,
      infAdic: { infCpl: overflowTextAdicionais, obsCont: [], obsFisco: [], procRef: [] },
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      geometria,
      finalEspacoDet: y - margemTopo - ajusteY,
      earlyClose: true,
      qrCode
    });
  }

  if (folha === 0) {
    y = getFaturaDuplicata({
      ajusteX,
      ajusteY,
      doc,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      geometria,
      cobr,
      y
    });

    y = getTotalProdutos({
      ajusteX,
      ajusteY,
      doc,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      geometria,
      total,
      y
    });

    y = getTotalIcmsIpi({
      ajusteX,
      ajusteY,
      doc,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      geometria,
      total,
      y
    });

    y = getTotalIbsCbsIs({
      ajusteX,
      ajusteY,
      doc,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      geometria,
      total,
      y
    });

    y = getIss({
      ajusteX,
      ajusteY,
      doc,
      emit,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      geometria,
      total,
      y
    });

    y = getTransporte({
      ajusteX,
      ajusteY,
      doc,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      geometria,
      transp,
      y
    });

    const overflowText = await getDadosAdicionais({
      ajusteX,
      ajusteY,
      doc,
      infAdic,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      geometria,
      finalEspacoDet,
      qrCode
    });

    getMenuItens({
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo,
      y,
      margemDireita,
      finalEspacoDet,
      larguraDoFormulario,
      geometria
    });

    return overflowText;
  }

  getMenuItens({
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo,
    y,
    margemDireita,
    finalEspacoDet,
    larguraDoFormulario,
    geometria
  });

  return '';
}
