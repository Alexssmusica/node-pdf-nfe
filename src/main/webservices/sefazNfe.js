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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SefazNFe = void 0;
const autorizadores = __importStar(require("../../application/helpers/urls/autorizadoresNFe.json"));
const soap_info_1 = require("../../application/abstract/soap-info");
class SefazNFe extends soap_info_1.SoapAbsctract {
    static getAutorizadorByUF(uf) {
        switch (uf) {
            case 'AM':
                return autorizadores.AM;
            case 'BA':
                return autorizadores.BA;
            case 'CE':
                return autorizadores.CE;
            case 'GO':
                return autorizadores.GO;
            case 'MG':
                return autorizadores.MG;
            case 'MS':
                return autorizadores.MS;
            case 'MT':
                return autorizadores.MT;
            case 'PE':
                return autorizadores.PE;
            case 'PR':
                return autorizadores.PR;
            case 'RS':
                return autorizadores.RS;
            case 'SP':
                return autorizadores.SP;
            case 'MA':
            case 'PA':
                return autorizadores.SVAN;
            case 'AC':
            case 'AL':
            case 'AP':
            case 'DF':
            case 'ES':
            case 'PB':
            case 'PI':
            case 'RJ':
            case 'RN':
            case 'RO':
            case 'RR':
            case 'SC':
            case 'SE':
            case 'TO':
                return autorizadores.SVRS;
            default:
                throw new Error('Autorizador não encontrado!');
        }
    }
    static getAutorizadorContingenciaByUF(uf) {
        switch (uf) {
            case 'AC':
            case 'AL':
            case 'AP':
            case 'DF':
            case 'ES':
            case 'MG':
            case 'PB':
            case 'RJ':
            case 'RN':
            case 'RO':
            case 'RR':
            case 'RS':
            case 'SC':
            case 'SE':
            case 'SP':
            case 'TO':
                return autorizadores['SVC-AN'];
            case 'AM':
            case 'BA':
            case 'CE':
            case 'GO':
            case 'MA':
            case 'MS':
            case 'MT':
            case 'PA':
            case 'PE':
            case 'PI':
            case 'PR':
                return autorizadores['SVC-RS'];
            default:
                throw new Error('Autorizador de Contingência não encontrado!');
        }
    }
}
exports.SefazNFe = SefazNFe;
//# sourceMappingURL=sefazNfe.js.map