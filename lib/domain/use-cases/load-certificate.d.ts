import { type CertificateLoad } from '../../domain/contracts/repos';
type Setup = () => LoadCertificate;
type Input = CertificateLoad.Input;
type Output = CertificateLoad.Output;
export type LoadCertificate = (input: Input) => Output;
export declare const setupLoadCertificate: Setup;
export {};
