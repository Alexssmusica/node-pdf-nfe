import { NfseCoreData } from '../../../model/nfse';
import { optanteSimplesNacional, regimeApuracaoTributariaSN } from '../../../model/descricoes-codigos';
import { drawBlockHeaderBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { mm, pxToMm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

export function renderEmitente(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } = LAYOUT_CONSTANTS.columns;
  const { blockLabel, fieldLabel, content } = LAYOUT_CONSTANTS.fontSizes;

  const emit = data.emitente;
  const y0 = pxToMm(pdf.y - 8);

  drawBlockHeaderBackground(pdf, y0);

  pdf.font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.fillColor('black');
  pdf.text('PRESTADOR / FORNECEDOR', mm(col1X), mm(y0), { width: mm(col1W) });
  pdf.fontSize(fieldLabel);
  pdf.text('CNPJ / CPF / NIF', mm(col2X), mm(y0), { width: mm(col2W) });
  pdf.text('Inscricao Municipal', mm(col3X), mm(y0), { width: mm(col3W) });
  pdf.text('Telefone', mm(col4X), mm(y0), { width: mm(col4W) });

  const y1 = y0 + 3.5;
  pdf.font(font).fontSize(content);
  pdf.text('Prestador do Servico', mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text(emit.cnpj || '-', mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text(emit.inscricaoMunicipal || '-', mm(col3X), mm(y1), { width: mm(col3W) });
  pdf.text(emit.fone || '-', mm(col4X), mm(y1), { width: mm(col4W) });

  const y2 = y1 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Nome / Nome Empresarial', mm(col1X), mm(y2), { width: mm(col1W + col2W) });
  pdf.text('E-mail', mm(col3X), mm(y2), { width: mm(col3W + col4W) });

  const y3 = y2 + 2.5;
  pdf.font(font).fontSize(content);
  pdf.text(emit.nome || '-', mm(col1X), mm(y3), { width: mm(col1W + col2W) });
  pdf.text(emit.email || '-', mm(col3X), mm(y3), { width: mm(col3W + col4W) });

  const y4 = y3 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Endereco', mm(col1X), mm(y4), { width: mm(col1W + col2W) });
  pdf.text('Municipio / Sigla UF', mm(col3X), mm(y4), { width: mm(col3W) });
  pdf.text('Codigo IBGE / CEP', mm(col4X), mm(y4), { width: mm(col4W) });

  const endereco = [emit.logradouro, emit.numero, emit.bairro].filter(Boolean).join(', ') || '-';

  const y5 = y4 + 2.5;
  pdf.font(font).fontSize(content);
  pdf.text(endereco, mm(col1X), mm(y5), { width: mm(col1W + col2W) });
  pdf.text(`${data.localEmissao || '-'} / ${emit.uf || '-'}`, mm(col3X), mm(y5), { width: mm(col3W) });
  pdf.text(`${emit.ibgeMunicipio || '-'} / ${emit.cep || '-'}`, mm(col4X), mm(y5), { width: mm(col4W) });

  const y6 = y5 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Simples Nacional na Data de Competencia', mm(col1X), mm(y6), { width: mm(col1W + col2W) });
  pdf.text('Regime de Apuracao Tributaria pelo SN', mm(col3X), mm(y6), { width: mm(col3W + col4W) });

  const y7 = y6 + 2.5;
  pdf.font(font).fontSize(content);
  pdf.text(optanteSimplesNacional(emit.optanteSimplesNacional), mm(col1X), mm(y7), { width: mm(col1W + col2W) });
  pdf.text(regimeApuracaoTributariaSN(emit.regimeApuracaoTributariaSN), mm(col3X), mm(y7), { width: mm(col3W + col4W) });

  pdf.y = mm(y7 + 7);
}
