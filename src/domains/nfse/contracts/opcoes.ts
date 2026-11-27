/// <reference types="pdfkit" />

/** Dados da prefeitura exibidos no cabeçalho da DANFSe. */
export type MunicipioCabecalho = {
  nome?: string;
  departamento?: string;
  telefone?: string;
  email?: string;
  /** Brasão/logo da prefeitura: base64 puro ou data URI (`data:image/png;base64,...`). */
  logoBase64?: string;
};

export type OpcoesPDFNFSe = {
  municipio?: MunicipioCabecalho;
  /** Imprime o canhoto no rodapé. Padrão: `true`. */
  incluirCanhoto?: boolean;
  /** Não chama `doc.end()`, para o chamador continuar escrevendo no documento. */
  notEndDocument?: boolean;
};
