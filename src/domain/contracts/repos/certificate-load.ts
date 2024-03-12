export declare namespace CertificateLoad {
    type Input = {
        path: string;
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