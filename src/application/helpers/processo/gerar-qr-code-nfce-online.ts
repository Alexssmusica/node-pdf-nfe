import sha1 from 'sha1';

export function gerarQRCodeNFCeOnline(
    urlQRCode: string,
    chave: string,
    versaoQRCode: string,
    ambiente: string,
    idCSC: string,
    CSC: string
): string {
    const s = '|';
    const concat = [chave, versaoQRCode, ambiente, Number(idCSC)].join(s);
    const hash = sha1(concat + CSC).toUpperCase();
    return `${urlQRCode}?p=${concat}${s}${hash}`;
}
