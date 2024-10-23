import { type Configuracoes, type SolicitaEvento, type TCodUfIbge } from '../../../domain/contracts/repos';
import { type RetornoEvento } from '../../../domain/contracts/repos/retorno';
import { signXmlX509 } from '../signature';
import { getUf } from '../utils';
import { makeSoapRequest } from '../../../application/helpers/web-service';
import { validateCancelNfe, validateCartaCorrecaoNfe } from '../../../application/helpers/xsd';
import { serializeXml, deserializeXml } from '../../../application/helpers/xml';
import { randomInt } from 'crypto';
import { ServicosSefaz } from '../../../domain/contracts/repos';
import { SefazNFCe } from '../../../main/webservices/sefazNfce';
import { SefazNFe } from '../../../main/webservices/sefazNfe';
import { removeSelfClosedFields } from '../../../application/helpers/utils';

export async function gerarEvento(cuf: TCodUfIbge, cnpj: string, evento: SolicitaEvento, configuracoes: Configuracoes): Promise<RetornoEvento> {
    switch (evento.tpEvento) {
        case '110111':
            evento.detEvento.descEvento = 'Cancelamento';
            break;
        case '110110':
            evento.detEvento.descEvento = 'Carta de Correcao';
            evento.detEvento.xCondUso = 'A Carta de Correcao e disciplinada pelo paragrafo 1o-A do art. 7o do Convenio S/N, de 15 de dezembro de 1970 e pode ser utilizada para regularizacao de erro ocorrido na emissao de documento fiscal, desde que o erro nao esteja relacionado com: I - as variaveis que determinam o valor do imposto tais como: base de calculo, aliquota, diferenca de preco, quantidade, valor da operacao ou da prestacao; II - a correcao de dados cadastrais que implique mudanca do remetente ou do destinatario; III - a data de emissao ou de saida.';
            break;
        case '210200':
            evento.detEvento.descEvento = 'Confirmacao da Operacao';
            break;
        case '210210':
            evento.detEvento.descEvento = 'Ciencia da Operacao';
            break;
        case '210220':
            evento.detEvento.descEvento = 'Desconhecimento da Operacao';
            break;
        case '210240':
            evento.detEvento.descEvento = 'Operacao nao Realizada';
            break;
        case '110140':
            evento.detEvento.descEvento = 'EPEC';
            break;
    }

    const xml = gerarXml(cuf, cnpj, evento, configuracoes);
    const xmlAssinado = signXmlX509(xml, 'infEvento', configuracoes.empresa);
    const xmlLote = gerarXmlLote(xmlAssinado);

    if (evento.tpEvento === '110111') {
        await validateCancelNfe(xmlLote);
    } else if (evento.tpEvento === '110110') {
        await validateCartaCorrecaoNfe(xmlLote);
    }

    const soapResponse = await transmitirXml(cuf, xmlLote, configuracoes);
    const xmlObj = await deserializeXml(soapResponse.xml_enviado, { explicitArray: false });

    const procEventoNFe = {
        $: { versao: '1.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        evento: Object(xmlObj).envEvento.evento,
        retEvento: Object(soapResponse.data.retEnvEvento.retEvento)
    };

    removeSelfClosedFields(procEventoNFe);

    const xml_completo = serializeXml(procEventoNFe, 'procEventoNFe');

    return {
        xml_enviado: soapResponse.xml_enviado,
        xml_recebido: soapResponse.xml_recebido,
        procEventoNFe,
        success: soapResponse.data.retEnvEvento.retEvento.infEvento.cStat === '135',
        xml_completo,
        mensagem: soapResponse.data.retEnvEvento.retEvento.infEvento.xMotivo
    };
}

async function transmitirXml(cuf: TCodUfIbge, xml: string, configuracoes: Configuracoes) {
    const { geral: { modelo, ambiente }, webProxy, empresa } = configuracoes;
    const input = {
        uf: getUf(cuf),
        amb: ambiente,
        modelo,
        servicoSefaz: ServicosSefaz.evento,
        isContingencia: false
    };

    const soap = modelo === '65' ? SefazNFCe.getSoapInfo(input) : SefazNFe.getSoapInfo(input);

    return await makeSoapRequest({ xml, empresa, soap, webProxy });
}

function getInfEvento(cuf: TCodUfIbge, cnpj: string, evento: SolicitaEvento, configuracoes: Configuracoes) {
    const { geral: { ambiente } } = configuracoes;
    const _ID = `ID${evento.tpEvento}${evento.chNFe}${('00' + evento.nSeqEvento).slice(-2)}`;

    if (_ID.length < 54) {
        throw new Error('ID de Evento inválido');
    }

    return {
        $: { Id: _ID },
        cOrgao: cuf,
        tpAmb: ambiente,
        CNPJ: cnpj,
        chNFe: evento.chNFe,
        dhEvento: evento.dhEvento,
        tpEvento: evento.tpEvento,
        nSeqEvento: evento.nSeqEvento,
        verEvento: '1.00',
        detEvento: getDetEvento(evento)
    };
}

function getDetEvento(evento: SolicitaEvento) {
    const result: any = {
        $: { versao: '1.00' },
        descEvento: evento.detEvento.descEvento
    };

    if (evento.tpEvento === '110110') {
        result.xCorrecao = evento.detEvento.xCorrecao;
        result.xCondUso = evento.detEvento.xCondUso;
    }

    if (evento.tpEvento === '110111') {
        result.nProt = evento.detEvento.nProt;
        result.xJust = evento.detEvento.xJust;
    }

    if (evento.tpEvento === 'cancSubst') {
        result.cOrgaoAutor = evento.detEvento.cOrgaoAutor;
        result.tpAutor = '001';
        result.verAplic = evento.detEvento.verAplic;
        result.nProt = evento.detEvento.nProt;
        result.xJust = evento.detEvento.xJust;
        result.chNFeRef = evento.detEvento.chNFeRef;
    }

    if (evento.tpEvento === 'manifDestOperNaoRealizada') {
        result.xJust = evento.detEvento.xJust;
    }

    return result;
}

function gerarXml(cuf: TCodUfIbge, cnpj: string, evento: SolicitaEvento, configuracoes: Configuracoes) {
    const xmlEvento = {
        $: {
            versao: '1.00',
            xmlns: 'http://www.portalfiscal.inf.br/nfe'
        },
        infEvento: getInfEvento(cuf, cnpj, evento, configuracoes)
    };

    removeSelfClosedFields(xmlEvento);
    return serializeXml(xmlEvento, 'evento');
}

function gerarXmlLote(xml: string) {
    const loteId = randomInt(1, 281474976710655).toString();
    const envEvento = {
        $: { versao: '1.00', xmlns: 'http://www.portalfiscal.inf.br/nfe' },
        idLote: loteId,
        _: '[XMLS]'
    };

    const xmlLote = serializeXml(envEvento, 'envEvento');
    return xmlLote.replace('[XMLS]', xml);
}
