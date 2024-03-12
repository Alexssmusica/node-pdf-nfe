"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nfce = exports.ide = exports.configuracoes = exports.emit = exports.empresa = void 0;
require("../../main/config/module-alias");
const load_certificate_1 = require("../../domain/use-cases/load-certificate");
const env_1 = require("../../main/config/env");
const utils_1 = require("@/domain/use-cases/utils");
const load = (0, load_certificate_1.setupLoadCertificate)();
const keypem = load({ path: env_1.env.CERTIFICATE_PATH, password: env_1.env.CERTIFICATE_PASSWORD });
exports.empresa = {
    pem: keypem.pem,
    key: keypem.key,
    password: env_1.env.CERTIFICATE_PASSWORD,
    idCSC: '1',
    CSC: '884b95a6-cf1f-4568-9b95-b3acbf7664ab'
};
exports.emit = {
    CNPJ: '34337001000148',
    xNome: 'R M COMERCIO DE SALGADOS',
    xFant: 'JUBERNAL SALGADOS',
    enderEmit: {
        xLgr: 'Rua Teste',
        nro: '123',
        xCpl: undefined,
        xBairro: 'Bairro Teste',
        cMun: '3504602',
        xMun: 'BADY BASSITT',
        UF: 'SP',
        CEP: '15115000',
        cPais: '1058',
        xPais: 'BRASIL',
        fone: undefined
    },
    IE: '195032740110',
    IM: '000711419',
    CRT: '1',
    iEST: undefined,
    CNAE: undefined
};
exports.configuracoes = {
    empresa: exports.empresa,
    geral: {
        versao: '4.00',
        ambiente: '2',
        modelo: '65'
    }
};
const dest = {
    idEstrangeiro: undefined,
    CNPJ: undefined,
    CPF: '41267310324',
    xNome: 'DESTINATARIO TESTE',
    enderDest: {
        xLgr: 'RUA DOS PALMARES',
        nro: '1231',
        xBairro: 'NOME DO BAIRRO',
        cMun: '4303103',
        xMun: 'CACHOEIRINHA',
        UF: 'RS',
        CEP: '15025120',
        cPais: '1058',
        xPais: 'BRASIL'
    },
    indIEDest: '9',
    email: 'test@test.com',
    IE: undefined,
    IM: undefined,
    ISUF: undefined
};
const transp = {
    modFrete: '9'
};
const infAdic = {
    infCpl: 'INFORMACAO COMPLEMENTAR TESTTESTETSTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
    infAdFisco: undefined,
    obsCont: [],
    obsFisco: [],
    procRef: []
};
const det_list = [];
const valorProduto = 31.80;
let valorTotalProdutos = 0;
for (let i = 1; i <= 1; i++) {
    valorTotalProdutos += valorProduto;
    det_list.push({
        $: { nItem: String(i) },
        prod: {
            cProd: '84233',
            cEAN: '7898221456293',
            xProd: 'PRODUTO TESTE',
            NCM: '85164000',
            CEST: undefined,
            cNPJFab: undefined,
            cBenef: undefined,
            eXTIPI: undefined,
            CFOP: '5102',
            uCom: 'SAC',
            qCom: '1.0000',
            vUnCom: valorProduto.toFixed(2),
            vProd: valorProduto.toFixed(2),
            cEANTrib: '7898221456293',
            uTrib: 'SAC',
            qTrib: '1.0000',
            vUnTrib: valorProduto.toFixed(2),
            vFrete: '',
            vSeg: '',
            vDesc: '',
            vOutro: '',
            indTot: '1',
            xPed: '',
            nItemPed: ''
        },
        imposto: {
            vTotTrib: 0,
            ICMS: {
                ICMSSN102: {
                    orig: '0',
                    CSOSN: '102'
                }
            },
            PIS: {
                PISOutr: {
                    CST: '99',
                    vBC: 0,
                    pPIS: 0,
                    vPIS: 0
                }
            },
            COFINS: {
                COFINSOutr: {
                    CST: '99',
                    vBC: 0,
                    pCOFINS: 0,
                    vCOFINS: 0
                }
            }
        }
    });
}
const detPag = [];
const pagItem = {
    indPag: '0',
    tPag: '01',
    vPag: valorTotalProdutos.toFixed(2),
    xPag: undefined,
    card: undefined
};
detPag.push(pagItem);
const pag = {
    detPag,
    vTroco: '0'
};
const ICMSTot = {
    vBC: '0.00',
    vICMS: '0.00',
    vICMSDeson: '0.00',
    vFCP: '0.00',
    vBCST: '0.00',
    vST: '0.00',
    vFCPST: '0.00',
    vFCPSTRet: '0.00',
    vProd: valorTotalProdutos.toFixed(2),
    vFrete: '0.00',
    vSeg: '0.00',
    vDesc: '0.00',
    vII: '0.00',
    vIPI: '0.00',
    vIPIDevol: '0.00',
    vPIS: '0.00',
    vCOFINS: '0.00',
    vOutro: '0.00',
    vNF: valorTotalProdutos.toFixed(2)
};
exports.ide = {
    cUF: '35',
    natOp: 'VENDA',
    serie: '20',
    nNF: '51',
    dhEmi: (0, utils_1.getDataAtual)(),
    tpNF: '1',
    idDest: '1',
    cMunFG: '3504602',
    tpImp: '4',
    tpEmis: '1',
    finNFe: '1',
    indFinal: '1',
    indPres: '1',
    procEmi: '0',
    verProc: 'NODE-NFE TEST 1.0',
    dhSaiEnt: undefined,
    dhCont: undefined,
    xJust: undefined
};
exports.nfce = {
    ide: exports.ide,
    emit: exports.emit,
    dest,
    det_list,
    total: { ICMSTot },
    transp,
    pag,
    infAdic
};
//# sourceMappingURL=dados.js.map