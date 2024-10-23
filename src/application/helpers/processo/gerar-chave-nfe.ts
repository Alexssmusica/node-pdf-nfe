import { randomInt } from '../utils';
import { obterDigitoVerificador } from './obter-digito-verificador';

export function gerarChaveNF(cnpj: string, docFiscal: {
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
} {
    let chave = '';
    const ano = docFiscal.dhEmi.substring(2, 4);
    const mes = docFiscal.dhEmi.substring(5, 7);
    
    chave += (docFiscal.cUF.padStart(2, '0'));
    chave += (ano + mes);
    chave += (cnpj.padStart(14, '0'));
    chave += (docFiscal.mod.padStart(2, '0'));
    chave += (docFiscal.serie.padStart(3, '0'));
    chave += (docFiscal.nNF.toString().padStart(9, '0'));
    chave += (docFiscal.tpEmis);
    
    const cnf = randomInt(10000000, 99999999).toString();
    chave += cnf;
    
    const digitoVerificador = obterDigitoVerificador(chave);
    chave += digitoVerificador;
    
    return {
        chave,
        cnf,
        dv: digitoVerificador
    };
}
