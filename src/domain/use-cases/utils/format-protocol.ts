/**
 * Retorna <valor> especificado com máscara do Protocolo.
 *
 * @param      {string}  protocol
 * @return     {string}
 */
export function formatProtocol(protocol: string): string {
  if (!protocol) return '';
  return protocol.replace(/(.{3})(?=.)/g, '$1 ');
}
