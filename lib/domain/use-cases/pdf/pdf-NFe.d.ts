/// <reference types="pdfkit" />
import type { NFeProc } from '../../../types';
export declare function pdfNFe(nf: NFeProc, pathLogo?: string): Promise<PDFKit.PDFDocument>;
