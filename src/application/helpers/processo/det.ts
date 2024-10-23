import { type TNFeInfNFeDet } from '../../../domain/contracts/repos';

export function getDet(produtos: TNFeInfNFeDet[], ambiente: string, modelo: string): TNFeInfNFeDet[] {
    const det_list: TNFeInfNFeDet[] = [];
    
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
