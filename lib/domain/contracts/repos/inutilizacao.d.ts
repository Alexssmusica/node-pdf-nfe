import { type TCodUfIbge } from '.';
export interface Inutilizar {
    ano: number;
    modelo: string;
    serie: number;
    numeroInicial: number;
    numeroFinal: number;
    xJustificativa: string;
    cUf: TCodUfIbge;
    cnpj: string;
}
