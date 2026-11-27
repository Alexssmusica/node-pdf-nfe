import { NfseCoreData } from '../../../model/nfse';
import {
  regimeEspecialTributacao,
  suspensaoExigibilidadeISSQN,
  tipoBeneficioMunicipal,
  tipoImunidade,
  tipoRetencaoISSQN,
  tributacaoISSQN
} from '../../../model/descricoes-codigos';
import { drawBlockHeaderBackground } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { mm, pxToMm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

const TITULO = 'TRIBUTACAO MUNICIPAL (ISSQN)';
const TEXTO_NAO_SUJEITA = 'TRIBUTACAO MUNICIPAL (ISSQN) - OPERACAO NAO SUJEITA AO ISSQN';

export function renderTributacaoMunicipal(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } = LAYOUT_CONSTANTS.columns;
  const { blockLabel, fieldLabel, content } = LAYOUT_CONSTANTS.fontSizes;

  const trib = data.tributacao;
  const val = data.valores;

  const tipoISSQN = String(trib.tipoTributacaoISSQN ?? '').trim();
  const naoSujeita = tipoISSQN === '4' || (!tipoISSQN && (val.ISSQN === '-' || !val.ISSQN));

  if (naoSujeita) {
    const y0 = pxToMm(pdf.y - 8);
    drawBlockHeaderBackground(pdf, y0);
    pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
    pdf.text(TEXTO_NAO_SUJEITA, mm(col1X), mm(y0), {
      width: mm(LAYOUT_CONSTANTS.contentWidthMm),
      align: 'left'
    });
    pdf.y = mm(y0 + 6);
    return;
  }

  const y0 = pxToMm(pdf.y - 8);
  drawBlockHeaderBackground(pdf, y0);
  pdf.fillColor('black').font(FONT_NAMES.labelBold).fontSize(blockLabel);
  pdf.text(TITULO, mm(col1X), mm(y0), { width: mm(col1W) });

  pdf.fontSize(fieldLabel);
  pdf.text('Tipo de Tributacao do ISSQN', mm(col2X), mm(y0), { width: mm(col2W) });
  pdf.text('Municipio / Sigla UF / Pais de Incidencia do ISSQN', mm(col3X), mm(y0), { width: mm(col3W) });
  pdf.text('Regime Especial de Tributacao', mm(col4X), mm(y0), { width: mm(col4W) });

  const y1 = y0 + 3.5;
  pdf.font(font).fontSize(content);
  pdf.text('', mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text(tributacaoISSQN(trib.tipoTributacaoISSQN), mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text(data.localIncidencia || '-', mm(col3X), mm(y1), { width: mm(col3W) });
  pdf.text(regimeEspecialTributacao(trib.regimeEspecialTributacao), mm(col4X), mm(y1), { width: mm(col4W) });

  const y2 = y1 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Tipo de Imunidade do ISSQN', mm(col1X), mm(y2), { width: mm(col1W) });
  pdf.text('Suspensao da Exigibilidade do ISSQN', mm(col2X), mm(y2), { width: mm(col2W) });
  pdf.text('Numero Processo Suspensao', mm(col3X), mm(y2), { width: mm(col3W) });
  pdf.text('Beneficio Municipal', mm(col4X), mm(y2), { width: mm(col4W) });

  const y3 = y2 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(tipoImunidade(trib.tipoImunidade), mm(col1X), mm(y3), { width: mm(col1W) });
  pdf.text(suspensaoExigibilidadeISSQN(trib.tipoSuspensao), mm(col2X), mm(y3), { width: mm(col2W) });
  pdf.text(trib.nProcessoSuspensao || '-', mm(col3X), mm(y3), { width: mm(col3W) });
  pdf.text(tipoBeneficioMunicipal(trib.tipoBeneficioMunicipal), mm(col4X), mm(y3), { width: mm(col4W) });

  const y4 = y3 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Calculo do BM', mm(col1X), mm(y4), { width: mm(col1W) });
  pdf.text('Total Deducoes/Reducoes', mm(col2X), mm(y4), { width: mm(col2W) });
  pdf.text('Desconto Incondicionado', mm(col3X), mm(y4), { width: mm(col3W) });
  pdf.text('BC ISSQN', mm(col4X), mm(y4), { width: mm(col4W) });

  const y5 = y4 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(val.calculoBeneficioMunicipal || '-', mm(col1X), mm(y5), { width: mm(col1W) });
  pdf.text(val.totalDeducaoReducao || '-', mm(col2X), mm(y5), { width: mm(col2W) });
  pdf.text(val.descontoIncondicionado || '-', mm(col3X), mm(y5), { width: mm(col3W) });
  pdf.text(val.baseCalculoISSQN || '-', mm(col4X), mm(y5), { width: mm(col4W) });

  const y6 = y5 + 4;
  pdf.font(FONT_NAMES.labelBold).fontSize(fieldLabel);
  pdf.text('Aliquota Aplicada', mm(col1X), mm(y6), { width: mm(col1W) });
  pdf.text('Retencao do ISSQN', mm(col2X), mm(y6), { width: mm(col2W) });
  pdf.text('ISSQN Apurado', mm(col3X), mm(y6), { width: mm(col3W) });

  const y7 = y6 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(trib.percentualAliquotaAplicadaISSQN || '-', mm(col1X), mm(y7), { width: mm(col1W) });
  pdf.text(tipoRetencaoISSQN(trib.tipoRetencaoISSQN), mm(col2X), mm(y7), { width: mm(col2W) });
  pdf.text(val.ISSQN || '-', mm(col3X), mm(y7), { width: mm(col3W) });

  pdf.y = mm(y7 + 7);
}
