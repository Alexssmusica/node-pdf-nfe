import { type RetornoNF } from '../../../domain/contracts/repos/retorno';// Assuming an interface file for types

import { configuraUrlsSefaz } from '../../../application/helpers/processo/utils';
import { gerarXml } from '../../../application/helpers/processo/gerar-xml';
import { gerarXmlLote } from '../../../application/helpers/processo/gerar-xml-lote';
import { validateEnvNfe } from '../../../application/helpers/xsd';
import { makeSoapRequest } from '../../../application/helpers/web-service';
import { signXmlX509 } from '../signature';
import { appendQRCodeXML } from '../../../application/helpers/processo/append-qrcode-xml';
import { consultaRecibo } from './consulta-recibo';
import { gerarRetornoEmissao } from '../../../application/helpers/processo/gerar-retorno-emissao';
import { ServicosSefaz, Repos, NFeBase, Configuracoes } from '../../../domain/contracts/repos'; // Assuming an enum and interface file

interface Response {
  data: any;
  xml_enviado: string;
  xml_recebido: string;
}

type Emissao = {
    documento: NFeBase;
    configuracoes: Configuracoes;
};

export async function emitir({ documento, configuracoes }: Emissao): Promise<RetornoNF> {
  const response = await request({ documento, configuracoes });
  return await builderResponse(configuracoes, documento.emit.enderEmit.UF, response);
}

async function request({ documento, configuracoes }: Emissao): Promise<Response> {
  const soap = configuraUrlsSefaz(documento.ide.cUF, configuracoes, ServicosSefaz.autorizacao);
  const doc = gerarXml(documento, configuracoes.geral);
  let xmlAssinado = signXmlX509(doc.xml, 'infNFe', configuracoes.empresa);
  if (configuracoes.geral.modelo === '65') {
    const appendQRCode = await appendQRCodeXML(documento, xmlAssinado, configuracoes.empresa, soap, configuracoes.geral);
    xmlAssinado = appendQRCode.xml;
  }
  const xml = gerarXmlLote(xmlAssinado, false);
  await validateEnvNfe(xml);
  const { webProxy, empresa } = configuracoes;
  return await makeSoapRequest({ xml, empresa, soap, webProxy });
}

async function builderResponse(configuracoes: Configuracoes , uf: string, response: Response): Promise<any> {
  let result;
  if (response.data.retEnviNFe !== undefined) {
    if (response.data.retEnviNFe.cStat === '103' && response.data.retEnviNFe.infRec.nRec !== undefined) {
      return await consultaRecibo(response, uf, configuracoes);
    } else if (response.data.retEnviNFe.cStat === '104' && response.data.retEnviNFe.protNFe.infProt.nProt !== undefined) {
      result = await gerarRetornoEmissao({
        protNFe: response.data.retEnviNFe.protNFe,
        success: response.data.retEnviNFe.cStat === '104' && response.data.retEnviNFe.protNFe.infProt.cStat === '100',
        xml_enviado: response.xml_enviado,
        xml_recebido: response.xml_recebido,
        xMotivo: response.data.retEnviNFe.protNFe.infProt.xMotivo
      });
    }
  }
  if (result !== undefined) {
    return result;
  }
  throw new Error(`Solicitação de Envio Falhou. Segue XML Retorno: ${response.xml_recebido}`);
}
