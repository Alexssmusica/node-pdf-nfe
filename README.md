# @alexssmusica/node-pdf-nfe
Biblioteca para geração Danfe NF-e/NFC-e em aplicações node.js

## Instalação
basta instalar através do comando
```npm install @alexssmusica/node-pdf-nfe```
```yarn add @alexssmusica/node-pdf-nfe```



## Exemplo
```javascript
import { gerarPDF } from '@alexssmusica/node-pdf-nfe';
import fs from 'fs';

const xml = fs.readFileSync('/path/to/file.xml').toString();
const logo = '/path/to/logo'
const doc = await gerarPDF(xml, logo);
doc.pipe(fs.createWriteStream('/path/to/file.pdf')); 
doc.end();
```
