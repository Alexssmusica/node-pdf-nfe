# node-dfe
Biblioteca para geração/integração de NF-e/NFC-e em aplicações node.js

## Instalação
basta instalar através do comando
```npm install node-nfe-fce```
```yarn add node-nfe-fce```

## Requisitos
```Somente Certificado A1 é aceito```
```Ter instalado o JAVA pois percisa para fazer a validacao XSD```



## Exemplo
```javascript
import {carregaCertificado, statusServico, emitir, cancelar, inutilizar, cartaCorrecao, gerarPDF} from 'node-nfe-nfce'


const keypem = carregaCertificado({ path: env.CERTIFICATE_PATH, password: env.CERTIFICATE_PASSWORD })
const cert = {
  pfx: fs.readFileSync(env.CERTIFICATE_PATH),
  pem: keypem.pem,
  key: keypem.key,
  password: env.CERTIFICATE_PASSWORD
}

const emit: TNFeInfNFeEmit = {
  CNPJ: '00000000000000',
  xNome: 'NOME DA EMPRESA',
  xFant: 'NOME FANSASIA DA EMPRESA',
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
  IE: '195000888999',
  IM: '000888999',
  CRT: '1',
  iEST: undefined,
  CNAE: undefined
}

const empresa: Empresa = {
  certificado: cert,
  idCSC: env.DADOS_ID_CSC,
  CSC: env.DADOS_CSC
}

  const configuracoes = {
    empresa: {
      pem: cert.pem,
      key: cert.key,
      password: 'SUA SENHA',
      idCSC: 'SEU_ID_CSC',
      CSC: 'SEU CSC'
    },
    geral: {
      versao: '4.00',
      ambiente: '2',
      modelo: '55'
    }
  }

const dest: TNFeInfNFeDest = {
  idEstrangeiro: undefined,
  CNPJ: undefined,
  CPF: '00000000000',
  xNome: 'DESTINATARIO TESTE',
  enderDest: {
    xLgr: 'RUA DOS PALMARES',
    nro: '1231',
    xCpl: 'casa 5',
    xBairro: 'NOME DO BAIRRO',
    cMun: '4303103',
    xMun: 'CACHOEIRINHA',
    UF: 'RS',
    CEP: '15025120'
  },
  indIEDest: '9',
  email: 'test@test.com'
}

const transp: TNFeInfNFeTransp = {
  modFrete: '9'
}

const infAdic: TNFeInfNFeInfAdic = {
  infCpl: 'INFORMACAO COMPLEMENTAR FEITA PARA APARECER NA NFE/NFCE',
  infAdFisco: undefined,
  obsCont: [],
  obsFisco: [],
  procRef: []
}

const det_list: TNFeInfNFeDet[] = []
const valorProduto = 31.80
let valorTotalProdutos = 0
for (let i = 1; i <= 1; i++) {
  valorTotalProdutos += valorProduto
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
  })
}

const detPag: TNFeInfNFePagDetPag[] = []
const pagItem: TNFeInfNFePagDetPag = {
  indPag: '0',
  tPag: '01',
  vPag: valorTotalProdutos.toFixed(2),
  xPag: undefined,
  card: undefined
}
detPag.push(pagItem)

const pag: TNFeInfNFePag = {
  detPag,
  vTroco: '0'
}

const ICMSTot: TNFeInfNFeTotalICMSTot = {
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
}

const ide: IdeInput = {
  cUF: '35',
  natOp: 'VENDA',
  mod: '55',
  serie: '1',
  nNF: '16',
  dhEmi: '',
  tpNF: '1',
  idDest: '1',
  cMunFG: '3504602',
  tpImp: '1',
  tpEmis: '1',
  tpAmb: '2',
  finNFe: '1',
  indFinal: '1',
  indPres: '1',
  procEmi: '0',
  verProc: 'NODE-NFE TEST 1.0',
}


const pag: TNFeInfNFePag = {
  detPag,
  vTroco: '0'
}

const ICMSTot: TNFeInfNFeTotalICMSTot = {
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
}

const nfe: NFeBase = {
  ide,
  emit,
  dest,
  det_list,
  total: { ICMSTot },
  transp,
  pag,
  infAdic
}

const result = await emitir({ documento: nfe, configuracoes })
const response = inspect(result, false, null)
console.log('Resultado: \n\n' + response)

  const result = await cancelar({
    chNFe: '35230400000000000000550010000000071458222950',
    nProt: '135230009995798',
    xJust: 'TESTE DE CANCELAMENTO',
    configuracoes
  })
  const response = inspect(result, false, null)
  console.log('Resultado: \n\n' + response)

  const result = await cartaCorrecao({
    chNFe: '35230400000000000000550010000000071458222950',
    nProt: '135230009999798',
    xCorrecao: 'TESTE DE CARTA DE CORRECAO EM HOMOLOCAO',
    configuracoes
  })
  const response = inspect(result, false, null)
  console.log('Resultado Carta Correção NFC-e: \n\n' + response)

  const dados: Inutilizar = {
    ano: 2023,
    modelo: '55',
    numeroInicial: 5,
    numeroFinal: 5,
    serie: 1,
    xJustificativa: 'HOMOLOGACAO TESTE',
    cUf: '35',
    cnpj: '00000000000000'
  }
  const result = await inutilizar({ configuracao, dados })
  console.log(result)

  const result = await statusServico(configuracoes, '35')
  const response = inspect(result, false, null)
  console.log('Status: \n\n' + response)
```


## STATUS
Ainda estou organizando a biblioteca, fiz testes NFE/NFCE no estado de SP e tudo deu certo.

## O que acha de colaborar financeiramente com este projeto?


<a href='https://ko-fi.com/rodrigomarquigarcia' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>


