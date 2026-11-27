import path from 'path';

/** Raiz dos assets: src/assets em desenvolvimento e lib/assets no pacote publicado (copiado pelo build). */
const DIRETORIO_ASSETS = path.resolve(__dirname, '../../assets');

export function caminhoFonte(...partes: string[]): string {
  return path.join(DIRETORIO_ASSETS, 'fontes', ...partes);
}

export function caminhoImagem(...partes: string[]): string {
  return path.join(DIRETORIO_ASSETS, 'image', ...partes);
}
