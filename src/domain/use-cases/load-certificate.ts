import { type CertificateLoad } from '../../domain/contracts/repos';
import { CertificateNotFoundError, CertificatePasswordError } from '../../domain/errors';
import nodeForge from 'node-forge';
import fs from 'fs';

type Setup = () => LoadCertificate;
type Input = CertificateLoad.Input;
type Output = CertificateLoad.Output;
export type LoadCertificate = (input: Input) => Output;

export const setupLoadCertificate: Setup = () => input => {
    if (!fs.existsSync(input.path)) {
        throw new CertificateNotFoundError();
    }
    
    const pfx = fs.readFileSync(input.path);
    const p12buffer = pfx.toString('base64');
    const asn = nodeForge.asn1.fromDer(nodeForge.util.decode64(p12buffer));
    let p12: nodeForge.pkcs12.Pkcs12Pfx;

    try {
        p12 = nodeForge.pkcs12.pkcs12FromAsn1(asn, true, input.password);
    } catch (err) {
        throw new CertificatePasswordError();
    }

    const pem = getPem(p12);
    const data = getData(pem);

    return {
        pem,
        key: getKey(p12),
        data,
    };
};

function getKey(p12: any): string {
    const keyData = p12
        .getBags({ bagType: nodeForge.pki.oids.pkcs8ShroudedKeyBag })[nodeForge.pki.oids.pkcs8ShroudedKeyBag]
        .concat(p12.getBags({ bagType: nodeForge.pki.oids.keyBag })[nodeForge.pki.oids.keyBag]);

    const rsaPrivateKey = nodeForge.pki.privateKeyToAsn1(keyData[0].key);
    const privateKeyInfo = nodeForge.pki.wrapRsaPrivateKey(rsaPrivateKey);
    const key = nodeForge.pki.privateKeyInfoToPem(privateKeyInfo);
    
    return key;
}

function getPem(p12: any): string {
    const certBags = p12.getBags({ bagType: nodeForge.pki.oids.certBag })[nodeForge.pki.oids.certBag];
    const pem = nodeForge.pki.certificateToPem(certBags[0].cert);
    
    return pem;
}

function getData(pem: string): { validade: Date; nome: string; cnpj: string } {
    const pki = nodeForge.pki;
    const certificate = pki.certificateFromPem(pem);
    const values = certificate.subject.getField({ name: 'commonName' }).value.toString().split(':');
    
    return {
        validade: certificate.validity.notAfter,
        nome: values[0],
        cnpj: values[1],
    };
}
