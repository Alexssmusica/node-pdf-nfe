import type { GeneratePdf } from '../../../../types';
import { DEFAULT_NFE } from './default';
import { getDadosAdicionais } from './get-dados-adicionais';
import { getDadosEmitente } from './get-dados-emitente';
import { getDestinatarioRemetente } from './get-destinatario-remetente';
import { getFaturaDuplicata } from './get-fatura-duplicata';
import { getHomologacao } from './get-homologacao';
import { getImposto } from './get-imposto';
import { getIss } from './get-iss';
import { getMenuItens } from './get-menu-itens';
import { getRecibo } from './get-recibo';
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
  folha
}: GeneratePdf.InputCriaLayout): Promise<void> {
  const { dest, emit, ide, infAdic, total, transp, cobr } = nf.NFe.infNFe;
  let y = 0;
  const finalEspacoDet = folha === 0 ? DEFAULT_NFE.finalTamanhoDet1 : DEFAULT_NFE.finalTamanhoDetDemais;

  if (ide.tpAmb === '2') {
    getHomologacao({
      ajusteX,
      ajusteY,
      doc,
      margemEsquerda,
      margemTopo,
      larguraDoFormulario,
      protNFe: nf.protNFe
    });
  }

  if (folha === 0) {
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
      total,
      ide
    });
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
    y: doc.y,
    ide
  });

  if (folha === 0) {
    y = getFaturaDuplicata({
      ajusteX,
      ajusteY,
      doc,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      cobr,
      y
    });

    y = getImposto({
      ajusteX,
      ajusteY,
      doc,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
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
      transp,
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
      total,
      y
    });

    getDadosAdicionais({
      ajusteX,
      ajusteY,
      doc,
      infAdic,
      larguraDoFormulario,
      margemDireita,
      margemEsquerda,
      margemTopo,
      finalEspacoDet
    });
  }

  y = getMenuItens({
    ajusteX,
    ajusteY,
    doc,
    margemEsquerda,
    margemTopo,
    y,
    margemDireita,
    finalEspacoDet,
    larguraDoFormulario
  });
}
