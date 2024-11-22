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
