import { type Empresa } from '../../../domain/contracts/repos';
import { type FileKeyInfo, SignedXml } from 'xml-crypto';

export function signXmlX509(xml: string, tag: string, empresa: Empresa): string {
    const transforms = [
        'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
        'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
    ];

    const infoProvider = (pem: string) => {
        return {
            getKeyInfo() {
                //@ts-ignore
                const cert = this.getCert();
                return `<X509Data><X509Certificate>${cert}</X509Certificate></X509Data>`;
            },
            getCert() {
                const certLines = pem.toString().split('\n');
                return certLines.filter((e, i) => i && e && e.indexOf('-----') !== 0).join('');
            }
        } as unknown as FileKeyInfo
    };

    const sig = new SignedXml();
    sig.addReference("//*[local-name(.)='" + tag + "']", transforms, '', '', '', '', false);
    sig.signingKey = empresa.key;
    sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';
    sig.keyInfoProvider = infoProvider(empresa.pem) ;
    sig.computeSignature(xml);
    
    return sig.getSignedXml();
}
