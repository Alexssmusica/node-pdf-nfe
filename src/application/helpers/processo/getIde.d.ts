import { type Geral, type IdeInput, type TNFeInfNFeIde } from '../../../domain/contracts/repos';
export declare function getIde(geral: Geral, ide: IdeInput, dadosChave: {
    chave: string;
    dv: string;
    cnf: string;
}): TNFeInfNFeIde;
