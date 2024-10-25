import type {
    IdeInput,
    TAmb,
    TInfRespTec,
    Tmod,
    TNFeInfNFeCobr,
    TNFeInfNFeDest,
    TNFeInfNFeDet,
    TNFeInfNFeEmit,
    TNFeInfNFeInfAdic,
    TNFeInfNFePag,
    TNFeInfNFeTotal,
    TNFeInfNFeTransp,
    WebProxy
} from '.';
interface Method {
    $: {
        Algorithm: string;
    };
}
export interface Signature {
    $: {
        xmlns: string;
    };
    SignedInfo: {
        CanonicalizationMethod: Method;
        SignatureMethod: Method;
        Reference: {
            $: {
                URI: string;
            };
            Transforms: {
                Transform: Method[];
            };
            DigestMethod: Method;
            DigestValue: string;
        };
    };
    SignatureValue: string;
    KeyInfo: {
        X509Data: {
            X509Certificate: string;
        };
    };
}
export declare namespace NFeNFCe {
    type Input = {
        documento: NFeBase;
        geral: Geral;
    };
}

export enum ServicosSefaz {
    autorizacao = 'autorizacao',
    retAutorizacao = 'retAutorizacao',
    consultarStatusServico = 'consultarStatusServico',
    evento = 'recepcaoEvento',
    inutilizacao = 'inutilizacao',
    protocolo = 'consultarProtocolo',
    cadastro = 'consultarCadastro'
}

export interface RetornoContingenciaOffline {
    xml_gerado: string;
}
export interface NFeBase {
    ide: IdeInput;
    emit: TNFeInfNFeEmit;
    dest: TNFeInfNFeDest;
    det_list: TNFeInfNFeDet[];
    total: TNFeInfNFeTotal;
    transp: TNFeInfNFeTransp;
    infAdic: TNFeInfNFeInfAdic;
    cobr?: TNFeInfNFeCobr;
    pag: TNFeInfNFePag;
    infRespTec?: TInfRespTec;
}
export interface Empresa {
    idCSC: string;
    CSC: string;
    key: any;
    pem: any;
    password: string;
    opcoes?: OpcoesCertificado;
}
export interface ResponsavelTecnico {
    cnpj: string;
    contato: string;
    email: string;
    fone: string;
    idCSRT?: string;
    CSRT?: string;
}
export interface DadosChave {
    chave: string;
    dv: string;
    cnf: string;
}
export interface OpcoesCertificado {
    stringfyPassphrase?: boolean;
    removeRejectUnauthorized?: boolean;
}

export interface Geral {
    ambiente: TAmb;
    versao: string;
    modelo: Tmod;
}

export enum TipoEvento {
    cancelamento = '110111',
    cartaCorrecao = '110110',
    manifestacaoConfirmacaoOperacao = '210200',
    manifestacaoCienciaEmissao = '210210',
    manifestacaoDesconhecimentoOperacao = '210220',
    manifestacaoOperacaoNaoRealizada = '210240',
    epec = '110140'
}
export interface Configuracoes {
    empresa: Empresa;
    webProxy?: WebProxy;
    geral: Geral;
    responsavelTecnico?: ResponsavelTecnico;
}

export function fromJsonixObj<T>(json: any): T {
    return json;
}
