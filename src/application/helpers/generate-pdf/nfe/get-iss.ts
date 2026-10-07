import type { GeneratePdf } from '../../../../types';
import { desenharBlocoTotais, moeda } from './bloco-totais';

export function getIss(input: GeneratePdf.InputISS): number {
  const iss = input.total.ISSQNtot;
  if (iss?.vServ === undefined && iss?.vBC === undefined && iss?.vISS === undefined) return input.y;

  return desenharBlocoTotais({
    ...input,
    tituloSecao: 'CÁLCULO DO ISSQN',
    tamanhoTitulo: 6,
    alturaLinha: 20,
    linhas: [
      [
        { titulo: 'INSCRIÇÃO MUNICIPAL', valor: input.emit?.IM ?? '' },
        { titulo: 'VALOR TOTAL DOS SERVIÇOS', valor: moeda(iss?.vServ) },
        { titulo: 'BASE DE CÁLCULO DO ISSQN', valor: moeda(iss?.vBC) },
        { titulo: 'VALOR DO ISSQN', valor: moeda(iss?.vISS) }
      ]
    ]
  });
}
