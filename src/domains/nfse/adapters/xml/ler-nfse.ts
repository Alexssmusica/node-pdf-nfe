import { lerXml } from '../../../../shared/xml/ler-xml';
import { ExtrasData, IbsCbsData, NfseCoreData, PessoaData } from '../../model/nfse';
import { formatCep, formatCnpjCpf, formatDate, formatDateTime, formatMoney, formatPhone } from '../../shared/formatacao';

const DASH = '-';

function isFilled(value: any): boolean {
  if (value === null || value === undefined) return false;
  const str = String(value).trim();
  if (!str) return false;
  if (str.toLowerCase() === 'null' || str.toLowerCase() === 'undefined') return false;
  return true;
}

function strOrDash(value: any): string {
  return isFilled(value) ? String(value).trim() : DASH;
}

function strOrEmpty(value: any): string {
  return isFilled(value) ? String(value).trim() : '';
}

function fixedCodeOrDash(value: any, length: number): string {
  if (value === null || value === undefined) return DASH;
  const raw = String(value).trim();
  if (!raw || raw.toLowerCase() === 'null' || raw.toLowerCase() === 'undefined') return DASH;
  if (!/^\d+$/.test(raw)) return raw;
  return raw.padStart(length, '0');
}

function numOrZero(value: any): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function moneyOrDash(value: any): string {
  const n = numOrZero(value);
  if (!isFilled(value) || n === 0) return DASH;
  return formatMoney(n);
}

function percentOrDash(value: any): string {
  const n = numOrZero(value);
  if (!isFilled(value)) return DASH;
  return formatMoney(n, 2, true);
}

function pessoa(node: any): PessoaData {
  if (!node || typeof node !== 'object') return emptyPessoa();
  const end = node.end ?? node.enderNac ?? {};
  const endNac = end.endNac ?? end;
  const endExt = end.endExt ?? null;
  const doc = node.CNPJ ?? node.CPF ?? node.NIF ?? '';
  const presente = isFilled(doc) || isFilled(node.xNome);
  // TCEndereco (leiaute nacional): xLgr/nro/xCpl/xBairro são irmãos de endNac/endExt, não filhos deles.
  const cepRaw = endNac.CEP ?? end.CEP;

  return {
    doc: presente ? formatCnpjCpf(String(doc)) : '',
    inscricaoMunicipal: strOrDash(node.IM),
    nome: strOrEmpty(node.xNome),
    email: strOrEmpty(node.email),
    fone: presente ? formatPhone(String(node.fone ?? '')) : '',
    logradouro: strOrEmpty(end.xLgr ?? endNac.xLgr ?? endExt?.xLgr),
    numero: strOrEmpty(end.nro ?? endNac.nro ?? endExt?.nro),
    complemento: strOrEmpty(end.xCpl ?? endNac.xCpl ?? endExt?.xCpl),
    bairro: strOrEmpty(end.xBairro ?? endNac.xBairro ?? endExt?.xBairro),
    ibgeMunicipio: strOrEmpty(endNac.cMun),
    municipio: strOrEmpty(endExt?.xCidade) || undefined,
    uf: strOrEmpty(endNac.UF) || undefined,
    cep: cepRaw ? formatCep(String(cepRaw)) : strOrEmpty(endExt?.cEndPost),
    pais: strOrEmpty(endExt?.cPais) || undefined,
    presente
  };
}

function emptyPessoa(): PessoaData {
  return {
    doc: '',
    inscricaoMunicipal: DASH,
    nome: '',
    email: '',
    fone: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    ibgeMunicipio: '',
    municipio: undefined,
    uf: undefined,
    cep: '',
    pais: undefined,
    presente: false
  };
}

function parseIbsCbs(infNFSe: any, infDPS: any): IbsCbsData {
  const ibsNfse = infNFSe?.IBSCBS ?? null;
  const ibsDps = infDPS?.IBSCBS ?? null;

  const valoresIbsNfse = ibsNfse?.valores ?? null;
  const valoresIbsDps = ibsDps?.valores ?? null;
  const valoresIbs = valoresIbsNfse ?? valoresIbsDps;
  const totCIBS = ibsNfse?.totCIBS ?? null;
  const uf = valoresIbs?.uf ?? null;
  const mun = valoresIbs?.mun ?? null;
  const fed = valoresIbs?.fed ?? null;
  const gIBSCBS = valoresIbsNfse?.trib?.gIBSCBS ?? valoresIbsDps?.trib?.gIBSCBS ?? null;
  const gIBSTot = totCIBS?.gIBS ?? null;
  const gCBSTot = totCIBS?.gCBS ?? null;

  const vIBSTot = totCIBS?.gIBS?.vIBSTot;
  const vCBS = totCIBS?.gCBS?.vCBS;

  const vTotIBSCBSNum = numOrZero(vIBSTot) + numOrZero(vCBS);
  const vTotNF = totCIBS?.vTotNF;

  const exclusoesNum =
    numOrZero(infDPS?.valores?.vDescCondIncond?.vDescIncond) +
    numOrZero(valoresIbs?.vCalcReeRepRes) +
    numOrZero(infNFSe?.valores?.vISSQN) +
    numOrZero(infDPS?.valores?.trib?.tribFed?.piscofins?.vPis) +
    numOrZero(infDPS?.valores?.trib?.tribFed?.piscofins?.vCofins);

  const presente = Boolean(ibsNfse || ibsDps);

  return {
    cst: fixedCodeOrDash(gIBSCBS?.CST, 3),
    cClassTrib: fixedCodeOrDash(gIBSCBS?.cClassTrib, 6),
    cIndOp: fixedCodeOrDash(ibsDps?.cIndOp ?? ibsNfse?.cIndOp, 6),
    cLocalidadeIncid: fixedCodeOrDash(ibsNfse?.cLocalidadeIncid, 7),
    xLocalidadeIncid: strOrEmpty(ibsNfse?.xLocalidadeIncid),
    ufLoc: strOrEmpty(ibsNfse?.UF ?? ibsNfse?.ufLoc ?? ''),
    vBC: moneyOrDash(valoresIbs?.vBC),
    vExclRed: exclusoesNum > 0 ? formatMoney(exclusoesNum) : DASH,
    pRedAliqUF: percentOrDash(uf?.pRedAliqUF),
    pRedAliqMun: percentOrDash(mun?.pRedAliqMun),
    pRedAliqCBS: percentOrDash(fed?.pRedAliqCBS),
    pIBSUF: percentOrDash(uf?.pIBSUF),
    pIBSMun: percentOrDash(mun?.pIBSMun),
    pAliqEfetMun: percentOrDash(mun?.pAliqEfetMun),
    vIBSMun: moneyOrDash(gIBSTot?.gIBSMunTot?.vIBSMun),
    pAliqEfetUF: percentOrDash(uf?.pAliqEfetUF),
    vIBSUF: moneyOrDash(gIBSTot?.gIBSUFTot?.vIBSUF),
    vIBSTot: moneyOrDash(vIBSTot),
    pCBS: percentOrDash(fed?.pCBS),
    pAliqEfetCBS: percentOrDash(fed?.pAliqEfetCBS),
    vCBS: moneyOrDash(gCBSTot?.vCBS ?? vCBS),
    vTotIBSCBS: vTotIBSCBSNum > 0 ? formatMoney(vTotIBSCBSNum) : DASH,
    vTotNF: moneyOrDash(vTotNF),
    presente
  };
}

function parseExtras(infNFSe: any, infDPS: any): ExtrasData {
  const subst = infDPS?.subst ?? null;
  const serv = infDPS?.serv ?? null;
  const obra = serv?.obra ?? null;
  const atvEvento = serv?.atvEvento ?? null;
  const imovel = infDPS?.IBSCBS?.imovel ?? null;
  const infoCompl = serv?.infoCompl ?? null;

  return {
    chSubstda: strOrEmpty(subst?.chSubstda),
    docRef: strOrEmpty(infoCompl?.docRef),
    cObra: strOrEmpty(obra?.cObra),
    inscImobFisc: strOrEmpty(imovel?.inscImobFisc),
    idAtvEvt: strOrEmpty(atvEvento?.idAtvEvt),
    idDocTec: strOrEmpty(infoCompl?.idDocTec),
    xPed: strOrEmpty(infoCompl?.xPed ?? infoCompl?.gItemPed?.xPed),
    xItemPed: strOrEmpty(infoCompl?.xItemPed ?? infoCompl?.gItemPed?.xItemPed),
    xOutInf: strOrEmpty(infoCompl?.xOutInf ?? infNFSe?.xOutInf)
  };
}

/** Lê o XML da NFS-e do padrão nacional (NFSe/infNFSe com a DPS embutida). */
export function lerNFSe(xmlContent: string): NfseCoreData {
  const obj = lerXml(xmlContent, { manterAtributos: true, removerPrefixoNamespace: true });

  const infNFSe = obj?.NFSe?.infNFSe ?? obj?.Nfse?.infNFSe ?? obj?.nfse?.infNFSe ?? obj?.infNFSe;
  if (!infNFSe) throw new Error('XML inválido: NFSe/infNFSe não encontrado');

  const infDPS = infNFSe?.DPS?.infDPS ?? infNFSe?.DPS?.InfDPS ?? infNFSe?.dps?.infDPS ?? infNFSe?.dps?.InfDPS;
  if (!infDPS) throw new Error('XML inválido: DPS/infDPS não encontrado');

  const id = String(infNFSe?.['@_Id'] ?? '');
  const chaveAcesso = id.replace(/^NFS/, '');

  const finNFSe = String(infDPS?.IBSCBS?.finNFSe ?? infDPS?.finNFSe ?? '');
  const totTrib = infDPS?.valores?.trib?.totTrib ?? null;
  const irrfCpCsllRetidos =
    numOrZero(infDPS?.valores?.trib?.tribFed?.vRetIRRF) +
    numOrZero(infDPS?.valores?.trib?.tribFed?.vRetCP) +
    numOrZero(infDPS?.valores?.trib?.tribFed?.vRetCSLL);
  const valorTotalTributos = totTrib?.vTotTrib
    ? {
        totalTributosFederais: formatMoney(numOrZero(totTrib?.vTotTrib?.vTotTribFed)),
        totalTributosEstaduais: formatMoney(numOrZero(totTrib?.vTotTrib?.vTotTribEst)),
        totalTributosMunicipais: formatMoney(numOrZero(totTrib?.vTotTrib?.vTotTribMun))
      }
    : undefined;
  const porcentagemTotalTributos = totTrib?.pTotTrib
    ? {
        porcentagemTotalTributosFederais: percentOrDash(numOrZero(totTrib?.pTotTrib?.pTotTribFed)),
        porcentagemTotalTributosEstaduais: percentOrDash(numOrZero(totTrib?.pTotTrib?.pTotTribEst)),
        porcentagemTotalTributosMunicipais: percentOrDash(numOrZero(totTrib?.pTotTrib?.pTotTribMun))
      }
    : undefined;
  const data: NfseCoreData = {
    chaveAcesso,
    numeroNfse: String(infNFSe?.nNFSe ?? ''),
    localEmissao: String(infNFSe?.xLocEmi ?? ''),
    localPrestacao: String(infNFSe?.xLocPrestacao ?? ''),
    localIncidencia: String(infNFSe?.xLocIncid ?? ''),
    tribNac: String(infNFSe?.xTribNac ?? ''),
    dataProcessamento: formatDateTime(String(infNFSe?.dhProc ?? '')),
    numeroDFSe: String(infNFSe?.nDFSe ?? ''),
    competenciaDps: formatDate(String(infDPS?.dCompet ?? '')),
    dataEmissaoNfse: formatDateTime(String(infNFSe?.dhProc ?? '')),
    numeroDps: String(infDPS?.nDPS ?? ''),
    serieDps: String(infDPS?.serie ?? ''),
    dataEmissaoDps: formatDateTime(String(infDPS?.dhEmi ?? '')),
    ambGer: String(infNFSe?.ambGer ?? ''),
    tpAmb: String(infDPS?.tpAmb ?? ''),
    cStat: String(infNFSe?.cStat ?? ''),
    tpEmit: String(infDPS?.tpEmit ?? ''),
    finNFSe,
    emitente: {
      cnpj: formatCnpjCpf(String(infNFSe?.emit?.CNPJ ?? infNFSe?.emit?.CPF ?? infNFSe?.emit?.NIF ?? '')),
      inscricaoMunicipal: strOrDash(infNFSe?.emit?.IM),
      nome: String(infNFSe?.emit?.xNome ?? ''),
      email: String(infNFSe?.emit?.email ?? ''),
      fone: formatPhone(String(infNFSe?.emit?.fone ?? '')),
      logradouro: String(infNFSe?.emit?.enderNac?.xLgr ?? ''),
      numero: String(infNFSe?.emit?.enderNac?.nro ?? ''),
      bairro: String(infNFSe?.emit?.enderNac?.xBairro ?? ''),
      municipio: String(infNFSe?.emit?.enderNac?.cMun ?? ''),
      uf: String(infNFSe?.emit?.enderNac?.UF ?? ''),
      cep: formatCep(String(infNFSe?.emit?.enderNac?.CEP ?? '')),
      ibgeMunicipio: String(infNFSe?.emit?.enderNac?.cMun ?? ''),
      optanteSimplesNacional: String(infDPS?.prest?.regTrib?.opSimpNac ?? ''),
      regimeApuracaoTributariaSN: String(infDPS?.prest?.regTrib?.regApTribSN ?? '')
    },
    tomador: pessoa(infDPS?.toma),
    destinatario: pessoa(infDPS?.IBSCBS?.dest ?? infDPS?.dest ?? null),
    intermediario: pessoa(infDPS?.interm),
    servico: {
      codTribNac: String(infDPS?.serv?.cServ?.cTribNac ?? ''),
      codTribMun: String(infDPS?.serv?.cServ?.cTribMun ?? ''),
      xTribNac: String(infNFSe?.xTribNac ?? ''),
      xTribMun: String(infNFSe?.xTribMun ?? ''),
      descricao: String(infDPS?.serv?.cServ?.xDescServ ?? ''),
      nbs: String(infDPS?.serv?.cServ?.cNBS ?? ''),
      infoComp: String(infDPS?.serv?.infoCompl?.xInfComp ?? ''),
      pais: String(infDPS?.serv?.locPrest?.cPaisPrestacao ?? '')
    },
    valores: {
      servico: formatMoney(numOrZero(infDPS?.valores?.vServPrest?.vServ)),
      descontoIncondicionado: moneyOrDash(infDPS?.valores?.vDescCondIncond?.vDescIncond),
      descontoCondicionado: moneyOrDash(infDPS?.valores?.vDescCondIncond?.vDescCond),
      totalDeducaoReducao: moneyOrDash(infNFSe?.valores?.vCalcDR ?? infDPS?.valores?.vDedRed?.vDR),
      calculoBeneficioMunicipal: moneyOrDash(infNFSe?.valores?.vCalcBM ?? infDPS?.valores?.trib?.tribMun?.BM?.vRedBCBM),
      baseCalculoISSQN: moneyOrDash(infNFSe?.valores?.vBC),
      ISSQN: moneyOrDash(infNFSe?.valores?.vISSQN),
      IRRF: moneyOrDash(infDPS?.valores?.trib?.tribFed?.vRetIRRF),
      CP: moneyOrDash(infDPS?.valores?.trib?.tribFed?.vRetCP),
      CSLL: moneyOrDash(infDPS?.valores?.trib?.tribFed?.vRetCSLL),
      PIS: moneyOrDash(infDPS?.valores?.trib?.tribFed?.piscofins?.vPis),
      COFINS: moneyOrDash(infDPS?.valores?.trib?.tribFed?.piscofins?.vCofins),
      liquido: formatMoney(numOrZero(infNFSe?.valores?.vLiq)),
      totalRetencoes: moneyOrDash(irrfCpCsllRetidos),
      valorTotalTributos,
      porcentagemTotalTributos
    },
    dps: {
      numero: String(infDPS?.nDPS ?? ''),
      serie: String(infDPS?.serie ?? ''),
      competencia: formatDate(String(infDPS?.dCompet ?? '')),
      dataEmissao: formatDateTime(String(infDPS?.dhEmi ?? ''))
    },
    tributacao: {
      tipoTributacaoISSQN: String(infDPS?.valores?.trib?.tribMun?.tribISSQN ?? ''),
      regimeEspecialTributacao: String(infDPS?.prest?.regTrib?.regEspTrib ?? ''),
      tipoImunidade: String(infDPS?.valores?.trib?.tribMun?.tpImunidade ?? ''),
      tipoSuspensao: String(infDPS?.valores?.trib?.tribMun?.exigSusp?.tpSusp ?? ''),
      nProcessoSuspensao: String(infDPS?.valores?.trib?.tribMun?.exigSusp?.nProcesso ?? ''),
      nBeneficioMunicipal: String(infDPS?.valores?.trib?.tribMun?.BM?.nBM ?? ''),
      tipoBeneficioMunicipal: String(infNFSe?.valores?.tpBM ?? infDPS?.valores?.tpBM ?? ''),
      percentualAliquotaAplicadaISSQN: percentOrDash(infNFSe?.valores?.pAliqAplic),
      tipoRetencaoISSQN: String(infDPS?.valores?.trib?.tribMun?.tpRetISSQN ?? ''),
      tipoRetencaoPisCofins: String(infDPS?.valores?.trib?.tribFed?.piscofins?.tpRetPisCofins ?? '')
    },
    ibsCbs: parseIbsCbs(infNFSe, infDPS),
    extras: parseExtras(infNFSe, infDPS)
  };
  return data;
}
