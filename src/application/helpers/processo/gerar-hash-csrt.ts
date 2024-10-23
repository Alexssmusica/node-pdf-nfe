import sha1 from 'sha1';

export function gerarHashCSRT(chave: string, CSRT: string): string {
    return Buffer.from(sha1(CSRT + chave), 'hex').toString('base64');
}
