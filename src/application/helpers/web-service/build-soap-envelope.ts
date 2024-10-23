import { serializeXml } from '../xml';

export function buildSoapEnvelope(xml: string, soapMethod: string): string {
    const soapEnvelopeObj = {
        $: {
            'xmlns:soap': 'http://www.w3.org/2003/05/soap-envelope',
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
        },
        'soap:Body': {
            nfeDadosMsg: {
                $: {
                    xmlns: soapMethod
                },
                _: '[XML]'
            }
        }
    };

    const soapEnvXml = serializeXml(soapEnvelopeObj, 'soap:Envelope');
    return soapEnvXml.replace('[XML]', xml);
}
