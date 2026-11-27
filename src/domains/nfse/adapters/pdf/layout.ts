/**
 * Constantes de layout do DANFSe v2.0 conforme NT 008 v1.0 (05/05/2026).
 *
 * Todas as medidas estao em milimetros (mm). Os valores de posicao seguem a
 * tabela da secao 2.4.5 do documento oficial, convertidos de cm para mm.
 */
export const LAYOUT_CONSTANTS = {
  pageWidthMm: 210,
  pageHeightMm: 297,
  margin: 3.0,

  // Posicoes das 4 colunas conforme NT 008 secao 2.4.5 (em mm; tabela em cm)
  columns: {
    col1X: 3.0,
    col2X: 54.1,
    col3X: 105.1,
    col4X: 156.2,
    col1W: 50.9,
    col2W: 50.9,
    col3W: 50.9,
    col4W: 50.9
  },

  contentWidthMm: 204.0,

  qrCode: {
    xMm: 174.8,
    yMm: 16.7,
    sideMm: 15.2
  },

  fontSizes: {
    blockLabel: 7,
    fieldLabel: 6,
    identLabel: 7,
    content: 7,
    headerCenter: 9,
    headerMunicipality: 8,
    headerAmbiente: 6,
    complementaryQr: 6,
    watermark: 50,
    semValidade: 9
  },

  lineWidthsMm: {
    divider: 0.18,
    border: 0.35
  },

  colors: {
    shaded: '#F2F2F2',
    red: '#FF0000',
    watermark: '#9E9E9E',
    line: '#000000'
  },

  watermarkOpacity: 0.35
} as const;

export const MM_PER_INCH = 25.4;
export const POINTS_PER_INCH = 72;
export const PT_PER_MM = POINTS_PER_INCH / MM_PER_INCH;
