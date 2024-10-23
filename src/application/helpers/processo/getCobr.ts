import type { TNFeInfNFeCobr } from '../../../domain/contracts/repos';

export function getCobr(cobr?: TNFeInfNFeCobr): TNFeInfNFeCobr | undefined {
    if (cobr === undefined) {
        return undefined;
    }
    
    const listDup = cobr.dup.map(element => ({
        nDup: element.nDup,
        dVenc: element.dVenc,
        vDup: element.vDup
    }));

    return {
        fat: {
            nFat: cobr.fat.nFat,
            vOrig: cobr.fat.vOrig,
            vDesc: cobr.fat.vDesc,
            vLiq: cobr.fat.vLiq
        },
        dup: listDup
    };
}
