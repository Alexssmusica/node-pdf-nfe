import { type Configuracoes, type SoapRequest } from '../../../domain/contracts/repos';
import { type RetornoNF } from '../../../domain/contracts/repos/retorno';
import { timeout } from '../../../application/helpers/utils';
import { makeSoapRequest } from '../../../application/helpers/web-service';
import { serializeXml } from '../../../application/helpers/xml';
import { ServicosSefaz } from '../../../domain/contracts/repos';
import { SefazNFCe } from '../../../main/webservices/sefazNfce';
import { SefazNFe } from '../../../main/webservices/sefazNfe';
import { gerarRetornoEmissao } from '../../../application/helpers/processo/gerar-retorno-emissao';

export async function consultaRecibo(response: SoapRequest.Output, uf: string, configuracoes: Configuracoes): Promise<RetornoNF> {
    try {
        const xmlConRecNFe = gerarXmlConsultaProc(response.data.retEnviNFe.infRec.nRec, configuracoes);
        let retornoConsulta: RetornoNF | undefined = undefined;
        let _tentativa = 0;
        const tentativas = 3;
        const aguardarConsultaRetorno = 1000;

        do {
            await timeout(aguardarConsultaRetorno);
            const responseProtocolo = await consultarProc(xmlConRecNFe, uf, configuracoes);
            retornoConsulta = await gerarRetornoEmissao({
                protNFe: Object(responseProtocolo.data.retConsReciNFe.protNFe),
                success: responseProtocolo.data.retConsReciNFe.cStat === '104' && responseProtocolo.data.retConsReciNFe.protNFe.infProt.cStat === '100',
                xml_enviado: response.xml_enviado,
                xml_recebido: responseProtocolo.xml_recebido,
                xMotivo: responseProtocolo.data.retConsReciNFe.protNFe.infProt.xMotivo
            });
            _tentativa++;
        } while (retornoConsulta === undefined && (_tentativa < tentativas));

        return retornoConsulta;
    } catch (ex) {
        throw new Error(ex.message);
    }
}

async function consultarProc(xml: string, uf: string, configuracoes: Configuracoes) {
    const { geral: { ambiente, modelo }, webProxy, empresa } = configuracoes;
    const input = {
        uf,
        amb: ambiente,
        modelo,
        servicoSefaz: ServicosSefaz.retAutorizacao,
        isContingencia: false
    };

    const soapRetAutorizacao = modelo === '65' ? SefazNFCe.getSoapInfo(input) : SefazNFe.getSoapInfo(input);
    
    return await makeSoapRequest({
        xml,
        empresa,
        soap: soapRetAutorizacao,
        webProxy
    });
}

function gerarXmlConsultaProc(recibo: string, configuracoes: Configuracoes) {
    const { versao, ambiente } = configuracoes.geral;
    const consulta = {
        $: { versao, xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        tpAmb: ambiente,
        nRec: recibo
    };

    return serializeXml(consulta, 'consReciNFe');
}
