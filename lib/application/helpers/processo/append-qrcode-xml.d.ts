import { type SoapInfo, type TNFeInfNFeSupl, type Empresa, type NFeBase, type Geral } from '../../../domain/contracts/repos';
export declare function appendQRCodeXML(documento: NFeBase, xmlAssinado: string, empresa: Empresa, soapAutorizacao: SoapInfo.Output, geral: Geral): Promise<{
    qrCode: TNFeInfNFeSupl;
    xml: string;
}>;
