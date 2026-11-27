import { PessoaData } from '../../../model/nfse';
import { drawBlockHeaderBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { mm, pxToMm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

export type PessoaBlockOptions = {
  blockTitle: string;
  showInscricaoMunicipal?: boolean;
};

/**
 * Renderiza o bloco padrao de identificacao de pessoa (Tomador,
 * Destinatario, Intermediario) conforme NT 008 secoes 2.1.4-2.1.6.
 */
export function renderPessoaBlock(pdf: PDFKit.PDFDocument, pessoa: PessoaData, options: PessoaBlockOptions, font: string): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } = LAYOUT_CONSTANTS.columns;
  const { blockLabel, fieldLabel, content } = LAYOUT_CONSTANTS.fontSizes;

  const showIM = options.showInscricaoMunicipal !== false;
  const y0 = pxToMm(pdf.y - 8);

  drawBlockHeaderBackground(pdf, y0);

  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.text(options.blockTitle, mm(col1X), mm(y0), { width: mm(col1W) });

  pdf.fontSize(fieldLabel);
  pdf.text('CNPJ / CPF / NIF', mm(col2X), mm(y0), { width: mm(col2W) });
  if (showIM) {
    pdf.text('Inscricao Municipal', mm(col3X), mm(y0), { width: mm(col3W) });
    pdf.text('Telefone', mm(col4X), mm(y0), { width: mm(col4W) });
  } else {
    pdf.text('Telefone', mm(col4X), mm(y0), { width: mm(col4W) });
  }

  const y1 = y0 + 3.5;
  pdf.font(font).fontSize(content);
  pdf.text('', mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text(pessoa.doc || '-', mm(col2X), mm(y1), { width: mm(col2W) });
  if (showIM) {
    pdf.text(pessoa.inscricaoMunicipal || '-', mm(col3X), mm(y1), { width: mm(col3W) });
  }
  pdf.text(pessoa.fone || '-', mm(col4X), mm(y1), { width: mm(col4W) });

  const y2 = y1 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Nome / Nome Empresarial', mm(col1X), mm(y2), { width: mm(col1W + col2W) });
  pdf.text('E-mail', mm(col3X), mm(y2), { width: mm(col3W + col4W) });

  const y3 = y2 + 2.5;
  pdf.font(font).fontSize(content);
  pdf.text(pessoa.nome || '-', mm(col1X), mm(y3), { width: mm(col1W + col2W) });
  pdf.text(pessoa.email || '-', mm(col3X), mm(y3), { width: mm(col3W + col4W) });

  const y4 = y3 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Endereco', mm(col1X), mm(y4), { width: mm(col1W + col2W) });
  pdf.text('Municipio / Sigla UF', mm(col3X), mm(y4), { width: mm(col3W) });
  pdf.text('Codigo IBGE / CEP', mm(col4X), mm(y4), { width: mm(col4W) });

  const partes: string[] = [];
  if (pessoa.logradouro) partes.push(pessoa.logradouro);
  if (pessoa.numero) partes.push(pessoa.numero);
  if (pessoa.complemento) partes.push(pessoa.complemento);
  if (pessoa.bairro) partes.push(pessoa.bairro);
  const endereco = partes.join(', ') || '-';

  const municipioUf = [pessoa.municipio || '', pessoa.uf || ''].filter(Boolean).join(' / ') || '-';
  const ibgeCep = [pessoa.ibgeMunicipio || '', pessoa.cep || ''].filter(Boolean).join(' / ') || '-';

  const y5 = y4 + 2.5;
  pdf.font(font).fontSize(content);
  pdf.text(endereco, mm(col1X), mm(y5), { width: mm(col1W + col2W) });
  pdf.text(municipioUf, mm(col3X), mm(y5), { width: mm(col3W) });
  pdf.text(ibgeCep, mm(col4X), mm(y5), { width: mm(col4W) });

  pdf.y = mm(y5 + 7);
}

/**
 * Renderiza o bloco com texto unico de supressao (Nota 2 / 3).
 */
export function renderPessoaSuppressed(pdf: PDFKit.PDFDocument, blockTitle: string, message: string): void {
  const { col1X, col1W, col2W, col3W, col4W } = LAYOUT_CONSTANTS.columns;
  const { blockLabel } = LAYOUT_CONSTANTS.fontSizes;
  const y0 = pxToMm(pdf.y - 8);

  drawBlockHeaderBackground(pdf, y0);

  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.text(blockTitle, mm(col1X), mm(y0), { width: mm(col1W) });
  pdf.text(message, mm(col1X + col1W), mm(y0), {
    width: mm(col2W + col3W + col4W),
    align: 'left'
  });

  pdf.y = mm(y0 + 6);
}
