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
exports.SoapAbsctract = void 0;
const repos_1 = require("../../domain/contracts/repos");
const utils_1 = require("../../application/helpers/utils");
const servicos = __importStar(require("../../application/helpers/urls/servicos.json"));
const functions_1 = require("../../main/webservices/functions");
class SoapAbsctract {
    static getAutorizadorByUF(uf) {
        return undefined;
    }
    static getAutorizadorContingenciaByUF(uf) {
        return undefined;
    }
    static getInfoQRCodeByUF({ uf, amb }) {
        return undefined;
    }
    static getSoapInfo({ uf, amb, modelo, servicoSefaz, isContingencia = false }) {
        if (isContingencia && modelo === '65') {
            throw new Error('Contingencia não desenvolvida para NFCE');
        }
        const autorizador = isContingencia ? this.getAutorizadorContingenciaByUF(uf) : this.getAutorizadorByUF(uf);
        const url = amb === '1'
            ? (0, utils_1.validaUrlWsdl)(autorizador.servicos[servicoSefaz].url_producao)
            : (0, utils_1.validaUrlWsdl)(autorizador.servicos[servicoSefaz].url_homologacao);
        let soap = {
            url,
            contentType: (0, functions_1.getContentType)(uf),
            method: servicos[servicoSefaz].method,
            action: servicos[servicoSefaz].action
        };
        if (servicoSefaz === repos_1.ServicosSefaz.autorizacao && modelo === '65') {
            const infoQRCode = this.getInfoQRCodeByUF({ uf, amb });
            soap = {
                ...soap,
                urlQRCode: infoQRCode.urlQRCode,
                urlChave: infoQRCode.urlChave
            };
        }
        return soap;
    }
}
exports.SoapAbsctract = SoapAbsctract;
//# sourceMappingURL=soap-info.js.map