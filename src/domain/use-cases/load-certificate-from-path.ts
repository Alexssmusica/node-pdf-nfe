import { type CertificateFromPathLoad } from "../contracts/repos";
import { CertificateNotFoundError } from "../errors";
import fs from "fs";
import { setupLoadCertificate } from "./load-certificate";

type Setup = () => LoadCertificate;
type Input = CertificateFromPathLoad.Input;
type Output = CertificateFromPathLoad.Output;
export type LoadCertificate = (input: Input) => Output;

export const setupLoadCertificateFromPath: Setup = () => (input) => {
    if (!fs.existsSync(input.path)) {
        throw new CertificateNotFoundError();
    }

    const pfx = fs.readFileSync(input.path);
    const p12buffer = pfx.toString("base64");
    const load = setupLoadCertificate();

    return load({ password: input.password, buffer: p12buffer });
};
