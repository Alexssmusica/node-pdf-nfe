"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSoapRequest = void 0;
const xml_1 = require("../xml");
const build_soap_envelope_1 = require("./build-soap-envelope");
const https = __importStar(require("https"));
const node_fetch_1 = __importDefault(require("node-fetch"));
async function makeSoapRequest({ empresa, soap, xml, webProxy }) {
    const body = (0, build_soap_envelope_1.buildSoapEnvelope)(xml, soap.method);
    const options = {
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
    const res = await (0, node_fetch_1.default)(soap.url, options);
    const xml_recebido = await res.text();
    const retorno = await (0, xml_1.deserializeXml)(xml_recebido, { explicitArray: false });
    const data = Object(retorno)['soap:Envelope'] !== undefined
        ? Object(retorno)['soap:Envelope']['soap:Body'].nfeResultMsg
        : Object(retorno)['env:Envelope']['env:Body'].nfeResultMsg;
    return {
        xml_enviado: xml,
        xml_recebido,
        data
    };
}
exports.makeSoapRequest = makeSoapRequest;
//# sourceMappingURL=make-soap-request.js.map