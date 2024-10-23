import type { TNFeInfNFeDest, TUfEmi } from '../../../domain/contracts/repos';

export function getDest(dest: TNFeInfNFeDest, ambiente: '1' | '2'): TNFeInfNFeDest | undefined {
    if (dest === undefined) {
        return undefined;
    }
    
    return {
        CNPJ: dest.CNPJ,
        CPF: dest.CPF,
        idEstrangeiro: dest.idEstrangeiro,
        xNome: ambiente === '2' ? 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL' : dest.xNome,
        enderDest: {
            xLgr: dest.enderDest?.xLgr ?? '',
            nro: dest.enderDest?.nro ?? '',
            xCpl: dest.enderDest?.xCpl,
            xBairro: dest.enderDest?.xBairro ?? '',
            cMun: dest.enderDest?.cMun ?? '',
            xMun: dest.enderDest?.xMun ?? '',
            UF: dest.enderDest?.UF as TUfEmi,
            CEP: dest.enderDest?.CEP ?? '',
            cPais: dest.enderDest?.cPais ?? '1058',
            cPaisSpecified: dest.enderDest?.cPaisSpecified,
            xPais: dest.enderDest?.xPais ?? 'BRASIL',
            xPaisSpecified: dest.enderDest?.cPaisSpecified,
            fone: dest.enderDest?.fone
        },
        indIEDest: dest.indIEDest,
        IE: dest.IE,
        ISUF: dest.ISUF,
        IM: dest.IM,
        email: dest.email
    };
}
