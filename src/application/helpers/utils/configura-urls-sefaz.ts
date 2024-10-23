"use strict";
import { SefazNFCe } from "../../../main/webservices/sefazNfce";
import { SefazNFe } from "../../../main/webservices/sefazNfe";
import { getUf } from "../../../domain/use-cases/utils/ibge-code-to-uf";
import { type Configuracoes, type SoapInfo, type ServicosSefaz } from '../../../domain/contracts/repos';

export function configuraUrlsSefaz(
    cUf: string,
    configuracoes: Configuracoes,
    servicoSefaz: ServicosSefaz
): SoapInfo.Output {
    const { geral: { modelo, ambiente } } = configuracoes;
    const uf = getUf(cUf);
    
    const input = {
        uf,
        amb: ambiente,
        modelo,
        isContingencia: false,
        servicoSefaz
    };

    if (modelo === '65') {
        return SefazNFCe.getSoapInfo(input);
    } else {
        return SefazNFe.getSoapInfo(input);
    }
}
