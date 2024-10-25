/// <reference types="pdfkit" />
import type {
  TNFeInfNFeCobr,
  TNFeInfNFeDest,
  TNFeInfNFeEmit,
  TNFeInfNFeIde,
  TNFeInfNFeInfAdic,
  TNFeInfNFeTotal,
  TNFeInfNFeTransp
} from '.';
import type { NFeProc, ProtNFe } from './nfe-proc';

export declare namespace GeneratePdf {
  type InputLinhaHorizontal = {
    x1: number;
    x2: number;
    y: number;
    doc: PDFKit.PDFDocument;
    ajusteY: number;
    ajusteX: number;
    margemTopo: number;
    margemEsquerda: number;
    margemDireita: number;
    tracejada?: boolean;
  };
  type InputLinhaVertical = {
    x: number;
    y1: number;
    y2: number;
    doc: PDFKit.PDFDocument;
    ajusteY: number;
    ajusteX: number;
    margemTopo: number;
    margemEsquerda: number;
  };
  type InputCriaMargem = {
    doc: PDFKit.PDFDocument;
    ajusteY: number;
    ajusteX: number;
    margemTopo: number;
    margemEsquerda: number;
    margemDireita: number;
    larguraDoFormulario: number;
    nf: NFeProc;
    pathLogo?: string;
  };
  type InputCriaLayout = {
    doc: PDFKit.PDFDocument;
    ajusteY: number;
    ajusteX: number;
    margemTopo: number;
    margemEsquerda: number;
    margemDireita: number;
    larguraDoFormulario: number;
    nf: NFeProc;
    folha: number;
    pathLogo?: string;
  };
  type InputTitulo = {
    x: number;
    y: number;
    value: string;
    doc: PDFKit.PDFDocument;
    largura: number;
    margemEsquerda: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    alinhamento?: string;
    tamanho?: number;
  };
  type InputNormal = {
    x: number;
    y: number;
    value: string;
    doc: PDFKit.PDFDocument;
    largura: number;
    margemEsquerda: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    alinhamento?: string;
    tamanho?: number;
  };
  type InputCampo = {
    x: number;
    y: number;
    value: string;
    doc: PDFKit.PDFDocument;
    largura: number;
    margemEsquerda: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    alinhamento?: string;
    tamanho?: number;
  };
  type InputNegrito = {
    x: number;
    y: number;
    value: string;
    doc: PDFKit.PDFDocument;
    largura: number;
    margemEsquerda: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    alinhamento?: string;
    tamanho?: number;
  };
  type InputItalico = {
    x: number;
    y: number;
    value: string;
    doc: PDFKit.PDFDocument;
    largura: number;
    margemEsquerda: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    alinhamento?: string;
    tamanho?: number;
  };
  type InputSecao = {
    x: number;
    y: number;
    value: string;
    doc: PDFKit.PDFDocument;
    largura: number;
    margemEsquerda: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    tamanho?: number;
  };
  type InputHomologacao = {
    doc: PDFKit.PDFDocument;
    margemEsquerda: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    larguraDoFormulario: number;
    protNFe: ProtNFe;
  };
  type InputRecibo = {
    y: number;
    doc: PDFKit.PDFDocument;
    margemEsquerda: number;
    margemDireita: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    larguraDoFormulario: number;
    dest: TNFeInfNFeDest;
    emit: TNFeInfNFeEmit;
    total: TNFeInfNFeTotal;
    ide: TNFeInfNFeIde;
  };
  type InputDadosEmitente = {
    y: number;
    doc: PDFKit.PDFDocument;
    margemEsquerda: number;
    margemDireita: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    larguraDoFormulario: number;
    emit: TNFeInfNFeEmit;
    ide: TNFeInfNFeIde;
    protNFe: ProtNFe;
    pathLogo?: string;
    folha?: number;
  };
  type InputRemetenteDestinatario = {
    y: number;
    doc: PDFKit.PDFDocument;
    margemEsquerda: number;
    margemDireita: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    larguraDoFormulario: number;
    dest: TNFeInfNFeDest;
    ide: TNFeInfNFeIde;
  };
  type InputImposto = {
    y: number;
    doc: PDFKit.PDFDocument;
    margemEsquerda: number;
    margemDireita: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    larguraDoFormulario: number;
    total: TNFeInfNFeTotal;
  };
  type InputFaturaDuplicata = {
    y: number;
    doc: PDFKit.PDFDocument;
    margemEsquerda: number;
    margemDireita: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    larguraDoFormulario: number;
    cobr?: TNFeInfNFeCobr;
  };
  type InputTransporte = {
    y: number;
    doc: PDFKit.PDFDocument;
    margemEsquerda: number;
    margemDireita: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    larguraDoFormulario: number;
    transp: TNFeInfNFeTransp;
  };
  type InputISS = {
    y: number;
    doc: PDFKit.PDFDocument;
    margemEsquerda: number;
    margemDireita: number;
    margemTopo: number;
    ajusteX: number;
    ajusteY: number;
    larguraDoFormulario: number;
    emit: TNFeInfNFeEmit;
    total: TNFeInfNFeTotal;
  };
  type InputMenuItens = {
    y: number;
    doc: PDFKit.PDFDocument;
    ajusteX: number;
    ajusteY: number;
    margemEsquerda: number;
    margemTopo: number;
    margemDireita: number;
    finalEspacoDet: number;
    larguraDoFormulario: number;
  };
  type InputDadosAdicionais = {
    doc: PDFKit.PDFDocument;
    ajusteX: number;
    ajusteY: number;
    margemEsquerda: number;
    margemDireita: number;
    margemTopo: number;
    larguraDoFormulario: number;
    infAdic: TNFeInfNFeInfAdic;
    finalEspacoDet: number;
  };
}
