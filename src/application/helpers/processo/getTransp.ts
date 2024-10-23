import { type TNFeInfNFeTransp } from '../../../domain/contracts/repos';

export function getTransp(transp: TNFeInfNFeTransp): TNFeInfNFeTransp {
    return {
        modFrete: transp.modFrete,
        transporta: transp.transporta === undefined
            ? undefined
            : {
                CNPJ: transp.transporta.CNPJ,
                CPF: transp.transporta.CPF,
                item: transp.transporta.item,
                itemElementName: transp.transporta.itemElementName,
                xNome: transp.transporta.xNome,
                ie: transp.transporta.ie,
                xEnder: transp.transporta.xEnder,
                xMun: transp.transporta.xMun,
                uf: transp.transporta.uf,
                ufSpecified: transp.transporta.ufSpecified
            },
        retTransp: transp.retTransp === undefined
            ? undefined
            : {
                vServ: transp.retTransp.vServ,
                vBCRet: transp.retTransp.vBCRet,
                pICMSRet: transp.retTransp.pICMSRet,
                vICMSRet: transp.retTransp.vICMSRet,
                cFOP: transp.retTransp.cFOP,
                cMunFG: transp.retTransp.cMunFG
            },
        veicTransp: transp.veicTransp === undefined
            ? undefined
            : {
                placa: transp.veicTransp.placa,
                UF: transp.veicTransp.UF,
                RNTC: transp.veicTransp.RNTC
            },
        items: transp.items,
        itemsElementName: transp.itemsElementName,
        vol: transp.vol === undefined
            ? undefined
            : {
                qVol: transp.vol.qVol,
                esp: transp.vol.esp,
                marca: transp.vol.marca,
                nVol: transp.vol.nVol,
                pesoL: transp.vol.pesoL,
                pesoB: transp.vol.pesoB,
                lacres: transp.vol.lacres
            }
    };
}
