import { type Configuracoes, type TCodUfIbge } from '../../../domain/contracts/repos';
import { type RetornoStatusServico } from '../../../domain/contracts/repos/retorno';
import { serializeXml } from '../../../application/helpers/xml';
import { configuraUrlsSefaz } from '../../../application/helpers/utils';
import { makeSoapRequest } from '../../../application/helpers/web-service';
import { ServicosSefaz } from '../../../domain/contracts/repos';

export async function statusServico(configuracoes: Configuracoes, cUf: TCodUfIbge): Promise<RetornoStatusServico> {
    const xml = gerarXML('4.00', configuracoes.geral.ambiente, cUf);
    return await solicitaStatus({ configuracoes, xml, cUf });
}

function gerarXML(versao: string, ambiente: string, cUf: TCodUfIbge) {
    const status = {
        $: {
            versao,
            xmlns: 'http://www.portalfiscal.inf.br/nfe'
        },
        tpAmb: ambiente,
        cUF: cUf,
        xServ: 'STATUS'
    };
    return serializeXml(status, 'consStatServ');
}

async function solicitaStatus({ configuracoes, xml, cUf }: { configuracoes: Configuracoes; xml: string; cUf: TCodUfIbge }) {
    const soap = configuraUrlsSefaz(cUf, configuracoes, ServicosSefaz.consultarStatusServico);
    const soapResponse = await makeSoapRequest({ xml, empresa: configuracoes.empresa, soap, webProxy: configuracoes.webProxy });
    return {
        xml_enviado: soapResponse.xml_enviado,
        xml_recebido: soapResponse.xml_recebido,
        status: soapResponse.data.retConsStatServ.cStat,
        mensagem: soapResponse.data.retConsStatServ.xMotivo
    };
}
