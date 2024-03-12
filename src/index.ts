import * as loadCertificate from './domain/use-cases/load-certificate';
import { emitir } from './domain/use-cases/processo/emissao';
import { statusServico } from './domain/use-cases/processo/status';
import { inutilizar } from './domain/use-cases/processo/inutiliza';
import { cartaCorrecao } from './domain/use-cases/processo/carta-correcao';
import { cancelar } from './domain/use-cases/processo/cancelar';
import { gerarPDF } from './domain/use-cases/pdf';
import * as utils from './domain/use-cases/utils';

export const carregaCertificado = loadCertificate.setupLoadCertificate();

export { emitir, statusServico, inutilizar, cartaCorrecao, cancelar, gerarPDF };

export default utils; 
export * from './domain/use-cases/processo/emissao';
export * from './domain/use-cases/processo/status';
export * from './domain/use-cases/processo/inutiliza';
export * from './domain/use-cases/processo/carta-correcao';
export * from './domain/use-cases/processo/cancelar';
export * from './domain/use-cases/pdf';
export * as utils from './domain/use-cases/utils';
