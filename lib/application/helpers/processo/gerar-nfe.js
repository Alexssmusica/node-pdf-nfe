"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarNFe = void 0;
const det_1 = require("./det");
const gerar_chave_nfe_1 = require("./gerar-chave-nfe");
const getDest_1 = require("./getDest");
const getIde_1 = require("./getIde");
const getEmit_1 = require("./getEmit");
const getTotal_1 = require("./getTotal");
const getTransp_1 = require("./getTransp");
const getCobr_1 = require("./getCobr");
const getPag_1 = require("./getPag");
const getInfAdic_1 = require("./getInfAdic");
const utils_1 = require("../../../domain/use-cases/utils");
const getResponsavelTecnico_1 = require("./getResponsavelTecnico");
function gerarNFe({ documento, geral }) {
    const dadosChave = (0, gerar_chave_nfe_1.gerarChaveNF)(documento.emit.CNPJ, {
        cUF: documento.ide.cUF,
        dhEmi: (0, utils_1.getDataAtual)(),
        mod: geral.modelo,
        serie: documento.ide.serie,
        nNF: documento.ide.nNF,
        tpEmis: documento.ide.tpEmis
    });
    const nfe = {
        $: { versao: '4.00', Id: `NFe${dadosChave.chave}` },
        ide: (0, getIde_1.getIde)(geral, documento.ide, dadosChave),
        emit: (0, getEmit_1.getEmit)(documento.emit),
        dest: (0, getDest_1.getDest)(documento.dest, geral.ambiente),
        det: (0, det_1.getDet)(documento.det_list, geral.ambiente, geral.modelo),
        total: (0, getTotal_1.getTotal)(documento.total),
        transp: (0, getTransp_1.getTransp)(documento.transp),
        cobr: (0, getCobr_1.getCobr)(documento.cobr),
        pag: (0, getPag_1.getPag)(documento.pag),
        infAdic: (0, getInfAdic_1.getInfAdic)(documento.infAdic),
        infRespTec: (0, getResponsavelTecnico_1.getResponsavelTecnico)(documento.infRespTec)
    };
    return nfe;
}
exports.gerarNFe = gerarNFe;
//# sourceMappingURL=gerar-nfe.js.map