import { type SoapRequest } from '../../../domain/contracts/repos';
export declare function makeSoapRequest({ empresa, soap, xml, webProxy }: SoapRequest.Input): Promise<SoapRequest.Output>;
