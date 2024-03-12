import * as fs from 'fs';
import * as forge from 'node-forge';
import { CertificateNotFoundError, CertificatePasswordError } from '../../domain/errors';

export type Input = {
  path: string;
  password: string;
};

export type Output = {
  pem: string;
  key: string;
  data: {
    validade: Date;
    nome: string;
    cnpj: string;
  };
};

export const setupLoadCertificate = () => (input: Input): Output => {
  if (!fs.existsSync(input.path)) {
    throw new CertificateNotFoundError();
  }

  const pfx = fs.readFileSync(input.path);
  const p12buffer = pfx.toString('base64');
  const asn = forge.asn1.fromDer(forge.util.decode64(p12buffer));

  let p12: forge.pkcs12.Pkcs12Pfx;

  try {
    p12 = forge.pkcs12.pkcs12FromAsn1(asn, true, input.password);
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

function getKey(p12: any) {
  const keyData = [
    ...p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag],
    ...p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag],
  ];

  const rsaPrivateKey = forge.pki.privateKeyToAsn1(keyData[0].key);
  const privateKeyInfo = forge.pki.wrapRsaPrivateKey(rsaPrivateKey);
  const key = forge.pki.privateKeyInfoToPem(privateKeyInfo);

  return key;
}

function getPem(p12: any) {
  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];
  const pem = forge.pki.certificateToPem(certBags[0].cert);

  return pem;
}

function getData(pem: string): GetDataOutput {
  const certificate = forge.pki.certificateFromPem(pem);
  const values = certificate.subject.getField({ name: 'commonName' }).value.toString().split(':');

  return {
    validade: certificate.validity.notAfter,
    nome: values[0],
    cnpj: values[1],
  };
}

export type GetDataOutput = {
  validade: Date
  nome: string
  cnpj: string
}
