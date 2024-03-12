/// <reference types="pdfkit" />
import { type NFeProc } from '@/domain/contracts/repos';
export declare function pdfNFe(nf: NFeProc, pathLogo?: string): Promise<PDFKit.PDFDocument>;
