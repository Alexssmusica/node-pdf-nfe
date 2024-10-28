import fs from 'fs';
import path from 'path';
import { gerarPDF } from '../src';

async function init(): Promise<void> {
  const pathDoArquivoPdf = path.join(process.cwd(), 'danfe.pdf');
  const pathDoArquivoXml = path.join(__dirname, 'arquivos', 'arquivo-xml.xml');
  const pathDaLogo = path.join(__dirname, 'arquivos', 'logo.png');
  const xmlNFe = fs.readFileSync(pathDoArquivoXml).toString();

  const pdf = await gerarPDF(xmlNFe, pathDaLogo);
  pdf.pipe(fs.createWriteStream(pathDoArquivoPdf));
}
init();
