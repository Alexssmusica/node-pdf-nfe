"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSoapEnvelope = void 0;
const xml_1 = require("../xml");
function buildSoapEnvelope(xml, soapMethod) {
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
    const soapEnvXml = (0, xml_1.serializeXml)(soapEnvelopeObj, 'soap:Envelope');
    return soapEnvXml.replace('[XML]', xml);
}
exports.buildSoapEnvelope = buildSoapEnvelope;
//# sourceMappingURL=build-soap-envelope.js.map