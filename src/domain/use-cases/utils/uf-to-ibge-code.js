"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getcUf = void 0;
function getcUf(value) {
    if (value === 'RO')
        return '11';
    if (value === 'AC')
        return '12';
    if (value === 'AM')
        return '13';
    if (value === 'RR')
        return '14';
    if (value === 'PA')
        return '15';
    if (value === 'AP')
        return '16';
    if (value === 'TO')
        return '17';
    if (value === 'MA')
        return '21';
    if (value === 'PI')
        return '22';
    if (value === 'CE')
        return '23';
    if (value === 'RN')
        return '24';
    if (value === 'PB')
        return '25';
    if (value === 'PE')
        return '26';
    if (value === 'AL')
        return '27';
    if (value === 'SE')
        return '28';
    if (value === 'BA')
        return '29';
    if (value === 'MG')
        return '31';
    if (value === 'ES')
        return '32';
    if (value === 'RJ')
        return '33';
    if (value === 'SP')
        return '35';
    if (value === 'PR')
        return '41';
    if (value === 'SC')
        return '42';
    if (value === 'RS')
        return '43';
    if (value === 'MS')
        return '50';
    if (value === 'MT')
        return '51';
    if (value === 'GO')
        return '52';
    if (value === 'DF')
        return '53';
    throw new Error('UF inválido');
}
exports.getcUf = getcUf;
//# sourceMappingURL=uf-to-ibge-code.js.map