export declare namespace CertificateLoad {
    type Input = {
        buffer: string;
        password: string;
    };
    type Output = {
        pem: string;
        key: string;
        data: {
            validade: Date;
            nome: string;
            cnpj: string;
        };
    };
}
export declare namespace CertificateFromPathLoad {
    type Input = {
        path: string;
        password: string;
    };
    type Output = CertificateLoad.Output;
}
export declare namespace CertificateFromBase64Load {
    type Input = {
        base64: string;
        password: string;
    };
    type Output = CertificateLoad.Output;
}