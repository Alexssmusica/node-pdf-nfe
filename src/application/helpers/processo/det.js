"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDet = void 0;
function getDet(produtos, ambiente, modelo) {
    const det_list = [];
    for (let i = 0; i < produtos.length; i++) {
        if (ambiente === '2' && i === 0) {
            produtos[i].prod.xProd = 'NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL';
        }
        det_list.push({
            $: { nItem: produtos[i].$.nItem },
            prod: produtos[i].prod,
            imposto: produtos[i].imposto,
            infAdProd: produtos[i].infAdProd,
            impostoDevol: undefined
        });
    }
    return det_list;
}
exports.getDet = getDet;
//# sourceMappingURL=det.js.map