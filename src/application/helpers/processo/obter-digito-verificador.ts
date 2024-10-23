export function obterDigitoVerificador(chave: string): string {
    let soma = 0;
    let mod = -1;
    let dv = -1;
    let peso = 2;
    const chaveArr = chave.split('');

    for (let i = chaveArr.length - 1; i !== -1; i--) {
        const ch = Number(chaveArr[i]);
        soma += ch * peso;

        if (peso < 9) {
            peso += 1;
        } else {
            peso = 2;
        }
    }

    mod = soma % 11;
    dv = (mod === 0 || mod === 1) ? 0 : 11 - mod;

    return dv.toString();
}
