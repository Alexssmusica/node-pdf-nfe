"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUf = void 0;
function getUf(value) {
    if (value === '11')
        return 'RO';
    if (value === '12')
        return 'AC';
    if (value === '13')
        return 'AM';
    if (value === '14')
        return 'RR';
    if (value === '15')
        return 'PA';
    if (value === '16')
        return 'AP';
    if (value === '17')
        return 'TO';
    if (value === '21')
        return 'MA';
    if (value === '22')
        return 'PI';
    if (value === '23')
        return 'CE';
    if (value === '24')
        return 'RN';
    if (value === '25')
        return 'PB';
    if (value === '26')
        return 'PE';
    if (value === '27')
        return 'AL';
    if (value === '28')
        return 'SE';
    if (value === '29')
        return 'BA';
    if (value === '31')
        return 'MG';
    if (value === '32')
        return 'ES';
    if (value === '33')
        return 'RJ';
    if (value === '35')
        return 'SP';
    if (value === '41')
        return 'PR';
    if (value === '42')
        return 'SC';
    if (value === '43')
        return 'RS';
    if (value === '50')
        return 'MS';
    if (value === '51')
        return 'MT';
    if (value === '52')
        return 'GO';
    if (value === '53')
        return 'DF';
    throw new Error('cUF invlálido');
}
exports.getUf = getUf;
//# sourceMappingURL=ibge-code-to-uf.js.map