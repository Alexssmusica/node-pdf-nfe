import { type TInfRespTec } from '../../../domain/contracts/repos';

export function getResponsavelTecnico(responsavel?: TInfRespTec): TInfRespTec | undefined {
    if (responsavel === undefined) {
        return undefined;
    }
    return {
        CNPJ: responsavel.CNPJ,
        xContato: responsavel.xContato,
        email: responsavel.email,
        fone: responsavel.fone,
        idCSRT: responsavel.idCSRT,
        hashCSRT: responsavel.hashCSRT
    };
}
