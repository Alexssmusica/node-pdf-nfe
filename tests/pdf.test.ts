import fs from 'fs';
import path from 'path';
import { gerarPDF, gerarPDFNFSe } from '../src';

async function init(): Promise<void> {
  const pathLogo = path.join(__dirname, 'arquivos', 'logo.png');

  const xmlNFe = fs.readFileSync(path.join(__dirname, 'arquivos', 'arquivo-xml.xml')).toString();
  const danfe = await gerarPDF(xmlNFe, { pathLogo, cancelada: true });
  danfe.pipe(fs.createWriteStream(path.join(process.cwd(), 'danfe.pdf')));

  const xmlNFSe = fs.readFileSync(path.join(__dirname, 'arquivos', 'nfse.xml')).toString();
  const danfse = await gerarPDFNFSe(xmlNFSe, { municipio: { nome: 'Prefeitura Municipal', departamento: 'Secretaria da Fazenda' } });
  danfse.pipe(fs.createWriteStream(path.join(process.cwd(), 'danfse.pdf')));
}
init();
