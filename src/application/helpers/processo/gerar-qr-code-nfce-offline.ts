import sha1 from 'sha1';

export function gerarQRCodeNFCeOffline(
    urlQRCode: string,
    chave: string,
    versaoQRCode: string,
    ambiente: string,
    diaEmissao: string,
    valorTotal: string,
    digestValue: string,
    idCSC: string,
    CSC: string
): string {
    const s = '|';
    const hexDigestValue = Buffer.from(digestValue).toString('hex');
    const concat = [chave, versaoQRCode, ambiente, diaEmissao, valorTotal, hexDigestValue, Number(idCSC)].join(s);
    const hash = sha1(concat + CSC).toUpperCase();
    return `${urlQRCode}?p=${concat}${s}${hash}`;
}
