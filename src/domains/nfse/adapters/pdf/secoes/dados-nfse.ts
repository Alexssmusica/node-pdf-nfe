import { NfseCoreData } from '../../../model/nfse';
import { finalidadeNFSe, situacaoNFSe, tpEmitenteNFSe } from '../../../model/descricoes-codigos';
import { drawQrCode } from '../desenho';
import { FONT_NAMES } from '../fontes';
import { mm, pxToMm } from '../unidades';
import { LAYOUT_CONSTANTS } from '../layout';

const QR_CONSULTA_BASE = 'https://www.nfse.gov.br/ConsultaPublica/?tpc=1&chave=';

export async function renderDadosNfse(pdf: PDFKit.PDFDocument, data: NfseCoreData, font: string): Promise<void> {
  const { col1X, col2X, col3X, col1W, col2W, col3W } = LAYOUT_CONSTANTS.columns;
  const { identLabel, content } = LAYOUT_CONSTANTS.fontSizes;

  const y0 = pxToMm(pdf.y - 6);
  const labelWidth = col1W + col2W + col3W;

  pdf
    .font(FONT_NAMES.labelBold)
    .fontSize(identLabel)
    .text('CHAVE DE ACESSO DA NFS-E', mm(col1X), mm(y0), {
      width: mm(labelWidth),
      align: 'left'
    });

  pdf
    .font(font)
    .fontSize(content)
    .text(data.chaveAcesso, mm(col1X), mm(y0 + 2.8), {
      width: mm(labelWidth),
      align: 'left'
    });

  const y1 = y0 + 7.5;

  pdf.font(FONT_NAMES.labelBold).fontSize(identLabel);
  pdf.text('NUMERO DA NFS-E', mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text('COMPETENCIA DA NFS-E', mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text('DATA E HORA DA EMISSAO DA NFS-E', mm(col3X), mm(y1), { width: mm(col3W) });

  const y2 = y1 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(data.numeroNfse || '-', mm(col1X), mm(y2), { width: mm(col1W) });
  pdf.text(data.competenciaDps || '-', mm(col2X), mm(y2), { width: mm(col2W) });
  pdf.text(data.dataEmissaoNfse || '-', mm(col3X), mm(y2), { width: mm(col3W) });

  const y3 = y2 + 5;
  pdf.font(FONT_NAMES.labelBold).fontSize(identLabel);
  pdf.text('NUMERO DA DPS', mm(col1X), mm(y3), { width: mm(col1W) });
  pdf.text('SERIE DA DPS', mm(col2X), mm(y3), { width: mm(col2W) });
  pdf.text('DATA E HORA DA EMISSAO DA DPS', mm(col3X), mm(y3), { width: mm(col3W) });

  const y4 = y3 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(data.numeroDps || '-', mm(col1X), mm(y4), { width: mm(col1W) });
  pdf.text(data.serieDps || '-', mm(col2X), mm(y4), { width: mm(col2W) });
  pdf.text(data.dataEmissaoDps || '-', mm(col3X), mm(y4), { width: mm(col3W) });

  const y5 = y4 + 5;
  pdf.font(FONT_NAMES.labelBold).fontSize(identLabel);
  pdf.text('EMITENTE DA NFS-E', mm(col1X), mm(y5), { width: mm(col1W) });
  pdf.text('SITUACAO DA NFS-E', mm(col2X), mm(y5), { width: mm(col2W) });
  pdf.text('FINALIDADE', mm(col3X), mm(y5), { width: mm(col3W) });

  const y6 = y5 + 2.8;
  pdf.font(font).fontSize(content);
  pdf.text(tpEmitenteNFSe(data.tpEmit), mm(col1X), mm(y6), { width: mm(col1W) });
  pdf.text(situacaoNFSe(data.cStat), mm(col2X), mm(y6), { width: mm(col2W) });
  pdf.text(finalidadeNFSe(data.finNFSe), mm(col3X), mm(y6), { width: mm(col3W) });

  const qrUrl = `${QR_CONSULTA_BASE}${data.chaveAcesso}`;
  await drawQrCode(pdf, qrUrl, LAYOUT_CONSTANTS.qrCode.xMm, LAYOUT_CONSTANTS.qrCode.yMm, LAYOUT_CONSTANTS.qrCode.sideMm);

  const qrComplementX = 158;
  const qrComplementY = LAYOUT_CONSTANTS.qrCode.yMm + LAYOUT_CONSTANTS.qrCode.sideMm + 0.5;
  const qrComplementW = 47.2;
  pdf.font(font).fontSize(LAYOUT_CONSTANTS.fontSizes.complementaryQr);
  pdf.fillColor('black');
  const msg =
    'A autenticidade desta NFS-e pode ser verificada pela leitura deste codigo QR ou pela consulta da chave de acesso no portal nacional da NFS-e';
  pdf.text(msg, mm(qrComplementX), mm(qrComplementY), {
    width: mm(qrComplementW),
    align: 'left'
  });

  pdf.y = mm(y6 + 8);
}
