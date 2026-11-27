import { XMLParser, XMLValidator } from 'fast-xml-parser';

export type OpcoesLeituraXml = {
  /** Mantém atributos com o prefixo `@_` (ex.: `@_Id`). Por padrão são ignorados. */
  manterAtributos?: boolean;
  /** Remove prefixos de namespace das tags (`ns2:infNFSe` → `infNFSe`). */
  removerPrefixoNamespace?: boolean;
};

/**
 * Converte o XML em objeto. Valores de tag sempre chegam como texto, para não perder zeros à esquerda
 * de CNPJ, CPF, CEP e códigos; tags repetidas viram array e tags únicas viram valor simples.
 */
export function lerXml(xml: string, opcoes: OpcoesLeituraXml = {}): any {
  const validacao = XMLValidator.validate(xml);
  if (validacao !== true) {
    const { msg, line, col } = validacao.err;
    throw new Error(`XML inválido: ${msg} (linha ${line}, coluna ${col})`);
  }
  const parser = new XMLParser({
    ignoreAttributes: !opcoes.manterAtributos,
    attributeNamePrefix: '@_',
    removeNSPrefix: opcoes.removerPrefixoNamespace ?? false,
    parseTagValue: false,
    parseAttributeValue: false,
    trimValues: true,
    ignoreDeclaration: true,
    ignorePiTags: true
  });
  return parser.parse(xml);
}
