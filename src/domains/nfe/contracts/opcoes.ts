/// <reference types="pdfkit" />

export type OrientacaoDanfe = 'RETRATO' | 'PAISAGEM';

export type OpcoesPDF = {
  pathLogo?: string;
  cancelada?: boolean;
  notEndDocument?: boolean;
  orientacao?: OrientacaoDanfe;
};
