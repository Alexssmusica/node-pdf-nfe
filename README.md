# @alexssmusica/node-pdf-nfe
Biblioteca para geração Danfe NF-e/NFC-e em aplicações node.js

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
