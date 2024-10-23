import { type SoapInfo, type TNFeInfNFeSupl, type Empresa, type NFeBase, type Geral } from '../../../domain/contracts/repos';
import { deserializeXml, serializeXml } from '../xml';
import { gerarQRCodeNFCeOffline } from './gerar-qr-code-nfce-offline';
import { gerarQRCodeNFCeOnline } from './gerar-qr-code-nfce-online';

export async function appendQRCodeXML(
    documento: NFeBase, xmlAssinado: string, empresa: Empresa, soapAutorizacao: SoapInfo.Output, geral: Geral
): Promise<{
    qrCode: TNFeInfNFeSupl;
    xml: string;
}> {
    let qrCode: string | null = null;
    const xmlAssinadoObj = await deserializeXml(xmlAssinado, { explicitArray: false });
    const chave = Object(xmlAssinadoObj).NFe.infNFe.$.Id.replace('NFe', '');

    if (documento.ide.tpEmis === '9') {
        const diaEmissao = documento.ide.dhEmi.substring(8, 10);
        const valorTotal = documento.total.ICMSTot.vNF;
        const digestValue = Object(xmlAssinadoObj).NFe.Signature.SignedInfo.Reference.DigestValue;
        
        qrCode = gerarQRCodeNFCeOffline(
            String(soapAutorizacao.urlQRCode),
            chave,
            '2',
            geral.ambiente,
            diaEmissao,
            valorTotal,
            digestValue,
            empresa.idCSC,
            empresa.CSC
        );
    } else {
        qrCode = gerarQRCodeNFCeOnline(
            String(soapAutorizacao.urlQRCode),
            chave,
            '2',
            geral.ambiente,
            empresa.idCSC,
            empresa.CSC
        );
    }

    const qrCodeObj = {
        qrCode: '<' + qrCode + '>',
        urlChave: soapAutorizacao.urlChave as string
    };

    const qrCodeXml = serializeXml(qrCodeObj, 'infNFeSupl')
        .replace('>]]>', ']]>')
        .replace('<![CDATA[<', '<![CDATA[');

    return {
        qrCode: qrCodeObj,
        xml: xmlAssinado.replace('</infNFe><Signature', '</infNFe>' + qrCodeXml + '<Signature')
    };
}
