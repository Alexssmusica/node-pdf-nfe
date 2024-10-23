import { type TNFeInfNFeTotal } from '../../../domain/contracts/repos';

export function getTotal(total: TNFeInfNFeTotal): TNFeInfNFeTotal {
    return {
        ICMSTot: {
            vBC: Number(total.ICMSTot.vBC).toFixed(2),
            vICMS: Number(total.ICMSTot.vICMS).toFixed(2),
            vICMSDeson: Number(total.ICMSTot.vICMSDeson).toFixed(2),
            vFCPUFDest: total.ICMSTot.vFCPUFDest === undefined ? undefined : Number(total.ICMSTot.vFCPUFDest).toFixed(2),
            vICMSUFDest: total.ICMSTot.vICMSUFDest === undefined ? undefined : Number(total.ICMSTot.vICMSUFDest).toFixed(2),
            vICMSUFRemet: total.ICMSTot.vICMSUFRemet === undefined ? undefined : Number(total.ICMSTot.vICMSUFRemet).toFixed(2),
            vFCP: Number(total.ICMSTot.vFCP).toFixed(2),
            vBCST: Number(total.ICMSTot.vBCST).toFixed(2),
            vST: Number(total.ICMSTot.vST).toFixed(2),
            vFCPST: Number(total.ICMSTot.vFCPST).toFixed(2),
            vFCPSTRet: Number(total.ICMSTot.vFCPSTRet).toFixed(2),
            vProd: Number(total.ICMSTot.vProd).toFixed(2),
            vFrete: Number(total.ICMSTot.vFrete).toFixed(2),
            vSeg: Number(total.ICMSTot.vSeg).toFixed(2),
            vDesc: Number(total.ICMSTot.vDesc).toFixed(2),
            vII: Number(total.ICMSTot.vII).toFixed(2),
            vIPI: Number(total.ICMSTot.vIPI).toFixed(2),
            vIPIDevol: Number(total.ICMSTot.vIPIDevol).toFixed(2),
            vPIS: Number(total.ICMSTot.vPIS).toFixed(2),
            vCOFINS: Number(total.ICMSTot.vCOFINS).toFixed(2),
            vOutro: Number(total.ICMSTot.vOutro).toFixed(2),
            vNF: Number(total.ICMSTot.vNF).toFixed(2),
            vTotTrib: total.ICMSTot.vTotTrib === undefined ? undefined : Number(total.ICMSTot.vTotTrib).toFixed(2)
        },
        ISSQNtot: total.ISSQNtot === undefined
            ? undefined
            : {
                vServ: total.ISSQNtot.vServ,
                vBC: total.ISSQNtot.vBC,
                vISS: total.ISSQNtot.vISS,
                vPIS: total.ISSQNtot.vPIS,
                vCOFINS: total.ISSQNtot.vCOFINS,
                dCompet: total.ISSQNtot.dCompet,
                vDeducao: total.ISSQNtot.vDeducao,
                vOutro: total.ISSQNtot.vOutro,
                vDescIncond: total.ISSQNtot.vDescIncond,
                vDescCond: total.ISSQNtot.vDescCond,
                vISSRet: total.ISSQNtot.vISSRet,
                cRegTrib: total.ISSQNtot.cRegTrib,
                cRegTribSpecified: total.ISSQNtot.cRegTribSpecified
            },
        retTrib: total.retTrib === undefined
            ? undefined
            : {
                vRetPIS: total.retTrib.vRetPIS,
                vRetCOFINS: total.retTrib.vRetCOFINS,
                vRetCSLL: total.retTrib.vRetCSLL,
                vBCIRRF: total.retTrib.vBCIRRF,
                vIRRF: total.retTrib.vIRRF,
                vBCRetPrev: total.retTrib.vBCRetPrev,
                vRetPrev: total.retTrib.vRetPrev
            }
    };
}
