"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultaRecibo = void 0;
require("../../../main/config/module-alias");
const utils_1 = require("../../../application/helpers/utils");
const web_service_1 = require("../../../application/helpers/web-service");
const xml_1 = require("../../../application/helpers/xml");
const repos_1 = require("../../../domain/contracts/repos");
const sefazNfce_1 = require("../../../main/webservices/sefazNfce");
const sefazNfe_1 = require("../../../main/webservices/sefazNfe");
const gerar_retorno_emissao_1 = require("../../../application/helpers/processo/gerar-retorno-emissao");
async function consultaRecibo(response, uf, configuracoes) {
    try {
        const xmlConRecNFe = gerarXmlConsultaProc(response.data.retEnviNFe.infRec.nRec, configuracoes);
        let retornoConsulta;
        let _tentativa = 0;
        const tentativas = 3;
        const aguardarConsultaRetorno = 1000;
        do {
            await (0, utils_1.timeout)(aguardarConsultaRetorno);
            const responseProtocolo = await consultarProc(xmlConRecNFe, uf, configuracoes);
            retornoConsulta = await (0, gerar_retorno_emissao_1.gerarRetornoEmissao)({
                protNFe: Object(responseProtocolo.data.retConsReciNFe.protNFe),
                success: responseProtocolo.data.retConsReciNFe.cStat === '104' && responseProtocolo.data.retConsReciNFe.protNFe.infProt.cStat === '100',
                xml_enviado: response.xml_enviado,
                xml_recebido: responseProtocolo.xml_recebido,
                xMotivo: responseProtocolo.data.retConsReciNFe.protNFe.infProt.xMotivo
            });
            _tentativa++;
        } while (retornoConsulta === undefined && (_tentativa < tentativas));
        return retornoConsulta;
    }
    catch (ex) {
        throw new Error(ex.message);
    }
}
exports.consultaRecibo = consultaRecibo;
async function consultarProc(xml, uf, configuracoes) {
    const { geral: { ambiente, modelo }, webProxy, empresa } = configuracoes;
    const input = {
        uf,
        amb: ambiente,
        modelo,
        servicoSefaz: repos_1.ServicosSefaz.retAutorizacao,
        isContingencia: false
    };
    const soapRetAutorizacao = modelo === '65' ? sefazNfce_1.SefazNFCe.getSoapInfo(input) : sefazNfe_1.SefazNFe.getSoapInfo(input);
    return await (0, web_service_1.makeSoapRequest)({
        xml,
        empresa,
        soap: soapRetAutorizacao,
        webProxy
    });
}
function gerarXmlConsultaProc(recibo, configuracoes) {
    const { versao, ambiente } = configuracoes.geral;
    const consulta = {
        $: { versao, xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        tpAmb: ambiente,
        nRec: recibo
    };
    return (0, xml_1.serializeXml)(consulta, 'consReciNFe');
}
//# sourceMappingURL=consulta-recibo.js.map