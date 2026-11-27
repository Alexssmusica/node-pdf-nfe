# @alexssmusica/node-pdf-nfe
Biblioteca para geração da DANFE da NF-e/NFC-e e da DANFSe da NFS-e em aplicações node.js

## Instalação
Basta instalar através dos comandos
```bash
npm install @alexssmusica/node-pdf-nfe
```
```bash
yarn add @alexssmusica/node-pdf-nfe
```

## Exemplo
```javascript
import { gerarPDF } from '@alexssmusica/node-pdf-nfe';
import fs from 'fs';

const xml = fs.readFileSync('/path/to/file.xml').toString();
const pathLogo = '/path/to/logo';
const doc = await gerarPDF(xml, { pathLogo, cancelada: false });
doc.pipe(fs.createWriteStream('/path/to/file.pdf'));
```

### Orientação da página
Por padrão, a DANFE da NF-e é gerada em retrato. Para gerar em paisagem, use a opção `orientacao`:
```javascript
const doc = await gerarPDF(xml, { pathLogo, orientacao: 'PAISAGEM' });
```

| Valor | Resultado |
|---|---|
| `'RETRATO'` | A4 em pé (padrão) |
| `'PAISAGEM'` | A4 deitado |

A opção vale apenas para NF-e (modelo 55). Na NFC-e (modelo 65) ela é ignorada.

## NFS-e (DANFSe)
Gera a DANFSe v2.0 (NT 008) a partir do XML autorizado da NFS-e do padrão nacional, com a DPS embutida.
```javascript
import { gerarPDFNFSe } from '@alexssmusica/node-pdf-nfe';
import fs from 'fs';

const xml = fs.readFileSync('/path/to/nfse.xml').toString();
const doc = await gerarPDFNFSe(xml, {
  municipio: {
    nome: 'Prefeitura Municipal',
    departamento: 'Secretaria da Fazenda',
    telefone: '(11) 3333-0000',
    email: 'nfse@prefeitura.gov.br',
    logoBase64: fs.readFileSync('/path/to/brasao.png').toString('base64')
  }
});
doc.pipe(fs.createWriteStream('/path/to/danfse.pdf'));
```

| Opção | Descrição |
|---|---|
| `municipio` | Dados da prefeitura no cabeçalho. Todos os campos são opcionais. `logoBase64` aceita base64 puro ou data URI. |
| `incluirCanhoto` | Imprime o canhoto no rodapé. Padrão: `true`. |
| `notEndDocument` | Não finaliza o documento, para você continuar escrevendo nele. |

As marcas d'água `CANCELADA` e `SUBSTITUIDA` e o aviso de homologação saem automaticamente, conforme o XML.
