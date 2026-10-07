import type { GeneratePdf } from '../../../../types';
import { desenharBlocoTotais, moeda } from './bloco-totais';

export function getTotalProdutos(input: GeneratePdf.InputImposto): number {
  const icms = input.total.ICMSTot;
  return desenharBlocoTotais({
    ...input,
    tituloSecao: 'TOTAL DOS PRODUTOS E TOTAL DA NOTA',
    tamanhoTitulo: 6,
    alturaLinha: 20,
    linhas: [
      [
        { titulo: 'VALOR TOTAL DOS PRODUTOS', valor: moeda(icms.vProd) },
        { titulo: 'VALOR DO FRETE', valor: moeda(icms.vFrete) },
        { titulo: 'VALOR DO SEGURO', valor: moeda(icms.vSeg) },
        { titulo: 'DESCONTO', valor: moeda(icms.vDesc) },
        { titulo: 'OUTRAS DESPESAS', valor: moeda(icms.vOutro) },
        { titulo: 'VALOR TOTAL DA NOTA', valor: moeda(icms.vNF) }
      ]
    ]
  });
}
