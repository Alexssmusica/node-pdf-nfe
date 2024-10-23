import { type Configuracoes, type Inutilizar } from '../../../domain/contracts/repos';
import { type RetornoInutNFe } from '../../../domain/contracts/repos/retorno';
import { signXmlX509 } from '../signature';
import { configuraUrlsSefaz, removeSelfClosedFields } from '../../../application/helpers/utils';
import { makeSoapRequest } from '../../../application/helpers/web-service';
import { serializeXml, deserializeXml } from '../../../application/helpers/xml';
import { ServicosSefaz } from '../../../domain/contracts/repos';

type Inutiliza = {
    configuracao: Configuracoes;
    dados: Inutilizar;
};

export async function inutilizar(input: Inutiliza): Promise<RetornoInutNFe> {
    const xml = gerarXML(input);
    const response = await request(xml, input);
    return await builderResponse(response);
}

async function builderResponse(soapResponse: any): Promise<any> {
    const xmlObj = await deserializeXml(soapResponse.xml_enviado, { explicitArray: false });
    const procInutNFe = {
        $: { versao: '4.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        inutNFe: Object(xmlObj).inutNFe,
        retInutNFe: Object(soapResponse.data.retInutNFe)
    };
    removeSelfClosedFields(procInutNFe);
    const xml_completo = serializeXml(procInutNFe, 'procInutNFe');
    return {
        xml_enviado: soapResponse.xml_enviado,
        xml_recebido: soapResponse.xml_recebido,
        procInutNFe,
        success: soapResponse.data.retInutNFe.infInut.cStat === '102',
        xml_completo,
        mensagem: soapResponse.data.retInutNFe.infInut.xMotivo
    };
}

async function request(xml: string, { configuracao, dados: { cUf } }: { configuracao: Configuracoes; dados: Inutilizar }): Promise<any> {
    const soap = configuraUrlsSefaz(cUf, configuracao, ServicosSefaz.inutilizacao);
    return await makeSoapRequest({ xml, empresa: configuracao.empresa, soap, webProxy: configuracao.webProxy });
}

function gerarXML({ configuracao, dados }: Inutiliza): string {
    if (dados.ano > 2000) {
        dados.ano -= 2000;
    }
    if (dados.numeroInicial > dados.numeroFinal) {
        throw new Error('O numero final não pode ser menor que o inicial.');
    }

    const infInut = gerarInfInut({ configuracao, dados });
    const inutNFe = {
        $: { versao: configuracao.geral.versao, xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        infInut
    };
    removeSelfClosedFields(inutNFe);
    const xml = serializeXml(inutNFe, 'inutNFe');
    const xmlAssinado = signXmlX509(xml, 'infInut', configuracao.empresa);
    return xmlAssinado;
}

function gerarInfInut({ configuracao, dados: { cUf, ano, modelo, serie, numeroFinal, numeroInicial, xJustificativa, cnpj } }: { configuracao: Configuracoes; dados: Inutilizar }): any {
    const _ID = `ID${cUf}${ano}${cnpj}${(`00${modelo}`).slice(-2)}${(`000${serie}`).slice(-3)}${(`000000000${numeroInicial}`).slice(-9)}${(`000000000${numeroFinal}`).slice(-9)}`;
    if (_ID.length < 43) {
        throw new Error('ID de Inutilização inválido');
    }

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
