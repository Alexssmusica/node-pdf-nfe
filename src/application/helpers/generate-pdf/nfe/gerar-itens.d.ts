import { type GeneratePdf } from '../../../../domain/contracts/repos';
export declare function gerarItens({ nf, ajusteX, ajusteY, doc, margemEsquerda, margemTopo, margemDireita, larguraDoFormulario, pathLogo }: GeneratePdf.InputCriaMargem): Promise<void>;
