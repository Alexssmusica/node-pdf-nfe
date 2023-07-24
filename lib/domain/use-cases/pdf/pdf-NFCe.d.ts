/// <reference types="pdfkit" />
import { type NFeProc } from '@/domain/contracts/repos';
export declare function pdfNFCe(nf: NFeProc, pathLogo?: string): Promise<PDFKit.PDFDocument>;
