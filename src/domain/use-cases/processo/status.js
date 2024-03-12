"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusServico = void 0;
require("../../../main/config/module-alias");
const utils_1 = require("../../../application/helpers/utils");
const web_service_1 = require("../../../application/helpers/web-service");
const xml_1 = require("../../../application/helpers/xml");
const repos_1 = require("../../../domain/contracts/repos");
async function statusServico(configuracoes, cUf) {
    const xml = gerarXML('4.00', configuracoes.geral.ambiente, cUf);
    return await solicitaStatus({ configuracoes, xml, cUf });
}
exports.statusServico = statusServico;
function gerarXML(versao, ambiente, cUf) {
    const status = {
        $: {
            versao,
            xmlns: 'http://www.portalfiscal.inf.br/nfe'
        },
        tpAmb: ambiente,
        cUF: cUf,
        xServ: 'STATUS'
    };
    return (0, xml_1.serializeXml)(status, 'consStatServ');
}
async function solicitaStatus({ configuracoes, xml, cUf }) {
    const soap = (0, utils_1.configuraUrlsSefaz)(cUf, configuracoes, repos_1.ServicosSefaz.consultarStatusServico);
    const soapResponse = await (0, web_service_1.makeSoapRequest)({ xml, empresa: configuracoes.empresa, soap, webProxy: configuracoes.webProxy });
    return {
        xml_enviado: soapResponse.xml_enviado,
        xml_recebido: soapResponse.xml_recebido,
        status: soapResponse.data.retConsStatServ.cStat,
        mensagem: soapResponse.data.retConsStatServ.xMotivo
    };
}
//# sourceMappingURL=status.js.map