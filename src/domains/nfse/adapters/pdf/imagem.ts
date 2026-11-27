/** Aceita data URI (repassado ao PDFKit como está) ou base64 puro (convertido em Buffer). */
export function imagemDeBase64(base64: string): string | Buffer {
  if (base64.startsWith('data:image/')) return base64;
  return Buffer.from(base64, 'base64');
}
