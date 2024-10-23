import { type SoapRequest } from '../../../domain/contracts/repos';
import { deserializeXml } from '../xml';
import { buildSoapEnvelope } from './build-soap-envelope';
import * as https from 'https';
import fetch from 'node-fetch';

export async function makeSoapRequest({ empresa, soap, xml, webProxy }: SoapRequest.Input): Promise<SoapRequest.Output> {
    const body = buildSoapEnvelope(xml, soap.method);
    const options: { method: string; headers: Record<string, string>; agent: https.Agent; body: string } = {
        method: 'POST',
        headers: {
            'Content-Type': soap.contentType,
            SOAPAction: soap.action
        },
        agent: new https.Agent({
            rejectUnauthorized: false,
            cert: empresa.pem,
            key: empresa.key,
            passphrase: empresa.password
        }),
        body
    };

    const res = await fetch(soap.url, options);
    const xml_recebido = await res.text();
    const retorno = await deserializeXml(xml_recebido, { explicitArray: false });
    const data = Object(retorno)['soap:Envelope'] !== undefined
        ? Object(retorno)['soap:Envelope']['soap:Body'].nfeResultMsg
        : Object(retorno)['env:Envelope']['env:Body'].nfeResultMsg;

    return {
        xml_enviado: xml,
        xml_recebido,
        data
    };
}
