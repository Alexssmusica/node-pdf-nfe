"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inutilizar = void 0;
require("../../../main/config/module-alias");
const utils_1 = require("../../../application/helpers/utils");
const web_service_1 = require("../../../application/helpers/web-service");
const xml_1 = require("../../../application/helpers/xml");
const repos_1 = require("../../../domain/contracts/repos");
const signature_1 = require("../signature");
async function inutilizar(input) {
    const xml = gerarXML(input);
    const response = await request(xml, input);
    return await builderResponse(response);
}
exports.inutilizar = inutilizar;
async function builderResponse(soapResponse) {
    const xmlObj = await (0, xml_1.deserializeXml)(soapResponse.xml_enviado, { explicitArray: false });
    const procInutNFe = {
        $: { versao: '4.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        inutNFe: Object(xmlObj).inutNFe,
        retInutNFe: Object(soapResponse.data.retInutNFe)
    };
    (0, utils_1.removeSelfClosedFields)(procInutNFe);
    const xml_completo = (0, xml_1.serializeXml)(procInutNFe, 'procInutNFe');
    return {
        xml_enviado: soapResponse.xml_enviado,
        xml_recebido: soapResponse.xml_recebido,
        procInutNFe,
        success: soapResponse.data.retInutNFe.infInut.cStat === '102',
        xml_completo,
        mensagem: soapResponse.data.retInutNFe.infInut.xMotivo
    };
}
async function request(xml, { configuracao, dados: { cUf } }) {
    const soap = (0, utils_1.configuraUrlsSefaz)(cUf, configuracao, repos_1.ServicosSefaz.inutilizacao);
    return await (0, web_service_1.makeSoapRequest)({ xml, empresa: configuracao.empresa, soap, webProxy: configuracao.webProxy });
}
function gerarXML({ configuracao, dados }) {
    if (dados.ano > 2000)
        dados.ano = dados.ano - 2000;
    if (dados.numeroInicial > dados.numeroFinal)
        throw new Error('O numero final não pode ser menor que o inicial.');
    const infInut = gerarInfInut({ configuracao, dados });
    const inutNFe = {
        $: { versao: configuracao.geral.versao, xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        infInut
    };
    (0, utils_1.removeSelfClosedFields)(inutNFe);
    const xml = (0, xml_1.serializeXml)(inutNFe, 'inutNFe');
    const xmlAssinado = (0, signature_1.signXmlX509)(xml, 'infInut', configuracao.empresa);
    return xmlAssinado;
}
function gerarInfInut({ configuracao, dados: { cUf, ano, modelo, serie, numeroFinal, numeroInicial, xJustificativa, cnpj } }) {
    const _ID = `ID${cUf}${ano}${cnpj}${(`00${modelo}`).slice(-2)}${(`000${serie}`).slice(-3)}${(`000000000${numeroInicial}`).slice(-9)}${(`000000000${numeroFinal}`).slice(-9)}`;
    if (_ID.length < 43)
        throw new Error('ID de Inutilização inválido');
    const infInut = {
        $: { Id: _ID },
        tpAmb: configuracao.geral.ambiente,
        xServ: 'INUTILIZAR',
        cUF: cUf,
        ano,
        CNPJ: cnpj,
        mod: modelo,
        serie,
        nNFIni: numeroInicial,
        nNFFin: numeroFinal,
        xJust: xJustificativa
    };
    return infInut;
}
//# sourceMappingURL=inutiliza.js.map