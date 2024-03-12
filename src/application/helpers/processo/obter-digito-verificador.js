"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obterDigitoVerificador = void 0;
function obterDigitoVerificador(chave) {
    let soma = 0;
    let mod = -1;
    let dv = -1;
    let peso = 2;
    const chaveArr = chave.split('');
    for (let i = chaveArr.length - 1; i !== -1; i--) {
        const ch = Number(chaveArr[i].toString());
        soma += ch * peso;
        if (peso < 9) {
            peso += 1;
        }
        else {
            peso = 2;
        }
    }
    mod = soma % 11;
    if (mod === 0 || mod === 1) {
        dv = 0;
    }
    else {
        dv = 11 - mod;
    }
    return dv.toString();
}
exports.obterDigitoVerificador = obterDigitoVerificador;
//# sourceMappingURL=obter-digito-verificador.js.map