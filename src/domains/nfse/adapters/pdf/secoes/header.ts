import { caminhoImagem } from '../../../../../shared/assets/caminhos';
import type { MunicipioCabecalho } from '../../../contracts/opcoes';
import type { NfseCoreData } from '../../../model/nfse';
import { tpAmbiente } from '../../../model/descricoes-codigos';
import { drawShadedBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { mm } from '../unidades';
import { imagemDeBase64 } from '../imagem';
import { LAYOUT_CONSTANTS } from '../layout';

const NFSE_LOGO_PATH = caminhoImagem('logo-nfse.png');
const DANFSE_VERSION_TEXT = 'DANFSe v2.0';
const TITLE_TEXT = 'Documento Auxiliar da NFS-e';
const SEM_VALIDADE_TEXT = 'NFS-e SEM VALIDADE JURIDICA';
const TAMANHO_MINIMO_FONTE = 4.5;

export function renderHeader(pdf: PDFKit.PDFDocument, municipio: MunicipioCabecalho, data: NfseCoreData | undefined, margin: number): void {
  const startYmm = margin + 0.2;
  const startXmm = margin + 0.8;
  const centerXmm = 64;
  const col4Xmm = 147;

  const headerHeight = 11.6;

  drawShadedBackground(pdf, margin, margin, LAYOUT_CONSTANTS.pageWidthMm - 2 * margin, headerHeight);

  pdf.image(NFSE_LOGO_PATH, mm(startXmm), mm(startYmm), {
    width: mm(40),
    height: mm(7.8)
  });

  pdf.fillColor('black');
  pdf
    .font(FONT_NAMES.labelBold)
    .fontSize(LAYOUT_CONSTANTS.fontSizes.headerCenter)
    .text(DANFSE_VERSION_TEXT, mm(centerXmm), mm(startYmm + 0.5), {
      width: mm(50),
      align: 'center'
    });

  pdf
    .font(FONT_NAMES.labelBold)
    .fontSize(LAYOUT_CONSTANTS.fontSizes.headerCenter)
    .text(TITLE_TEXT, mm(centerXmm), mm(startYmm + 4), {
      width: mm(50),
      align: 'center'
    });

  if (data?.tpAmb === '2') {
    pdf.save();
    pdf.fillColor(LAYOUT_CONSTANTS.colors.red);
    pdf
      .font(FONT_NAMES.labelBold)
      .fontSize(LAYOUT_CONSTANTS.fontSizes.semValidade)
      .text(SEM_VALIDADE_TEXT, mm(centerXmm), mm(startYmm + 7.8), {
        width: mm(50),
        align: 'center'
      });
    pdf.restore();
  }

  if (municipio.logoBase64) {
    try {
      pdf.image(imagemDeBase64(municipio.logoBase64), mm(col4Xmm - 15), mm(startYmm), {
        fit: [mm(14), mm(8)],
        align: 'center',
        valign: 'center'
      });
    } catch (erro) {
      throw new Error(`Logo do município inválido: ${(erro as Error).message}`, { cause: erro });
    }
  }

  // Uma linha por campo, com passo fixo: o texto longo reduz a fonte até caber na coluna, em vez de
  // quebrar linha e invadir o bloco de identificação logo abaixo.
  let rowYmm = startYmm;
  const larguraColuna = mm(27);
  const escreverLinha = (texto: string, fonte: string, tamanho: number, passoMm: number): void => {
    pdf.font(fonte).fontSize(tamanho);
    const largura = pdf.widthOfString(texto);
    if (largura > larguraColuna) pdf.fontSize(Math.max(TAMANHO_MINIMO_FONTE, (tamanho * larguraColuna) / largura));
    pdf.text(texto, mm(col4Xmm), mm(rowYmm), { width: larguraColuna, align: 'left', lineBreak: false });
    rowYmm += passoMm;
  };
  pdf.fillColor('black');

  const { headerMunicipality, headerAmbiente } = LAYOUT_CONSTANTS.fontSizes;
  if (municipio.nome) escreverLinha(municipio.nome, FONT_NAMES.labelBold, headerMunicipality, 3);
  const linhas = [
    data?.ambGer ? `Ambiente Gerador: ${data.ambGer}` : '',
    data?.tpAmb ? `Tipo de Ambiente: ${tpAmbiente(data.tpAmb)}` : '',
    municipio.departamento ?? '',
    municipio.telefone ?? '',
    municipio.email ?? ''
  ];
  for (const linha of linhas.filter(Boolean)) escreverLinha(linha, FONT_NAMES.labelRegular, headerAmbiente, 2.3);

  pdf.y = mm(startYmm + headerHeight + 3);
}
