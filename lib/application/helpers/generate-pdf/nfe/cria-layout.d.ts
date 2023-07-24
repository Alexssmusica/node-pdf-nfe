import { type GeneratePdf } from '../../../../domain/contracts/repos';
export declare function criaLayout({ pathLogo, nf, ajusteX, ajusteY, doc, margemEsquerda, margemTopo, larguraDoFormulario, margemDireita, folha }: GeneratePdf.InputCriaMargem): Promise<void>;
