export declare function gerarChaveNF(cnpj: string, docFiscal: {
    dhEmi: string;
    cUF: string;
    mod: string;
    serie: string;
    nNF: string;
    tpEmis: string;
}): {
    chave: string;
    dv: string;
    cnf: string;
};
