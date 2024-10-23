import { type CertificateFromBase64Load } from "../contracts/repos";
import { setupLoadCertificate } from "./load-certificate";

type Setup = () => LoadCertificate;
type Input = CertificateFromBase64Load.Input;
type Output = CertificateFromBase64Load.Output;
export type LoadCertificate = (input: Input) => Output;

export const setupLoadCertificateFromBase64: Setup = () => (input) => {
    const load = setupLoadCertificate();
    return load({ password: input.password, buffer: input.base64 });
};
