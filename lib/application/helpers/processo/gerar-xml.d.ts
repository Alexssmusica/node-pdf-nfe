import { type NFeBase, type Geral } from '../../../domain/contracts/repos';
export declare function gerarXml(documento: NFeBase, geral: Geral): {
    nfe: any;
    xml: string;
};
