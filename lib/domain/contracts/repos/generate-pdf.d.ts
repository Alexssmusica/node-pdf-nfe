/// <reference types="pdfkit" />
import { type NFeProc } from './nfe-proc';
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
}
