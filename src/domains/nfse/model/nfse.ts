export type PessoaData = {
  doc: string;
  inscricaoMunicipal: string;
  nome: string;
  email: string;
  fone: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  ibgeMunicipio: string;
  municipio?: string;
  uf?: string;
  cep: string;
  pais?: string;
  /** Indica se a pessoa esta efetivamente informada na NFS-e */
  presente: boolean;
};

export type IbsCbsData = {
  cst: string;
  cClassTrib: string;
  cIndOp: string;
  cLocalidadeIncid: string;
  xLocalidadeIncid: string;
  ufLoc: string;
  vBC: string;
  vExclRed: string;
  pRedAliqUF: string;
  pRedAliqMun: string;
  pRedAliqCBS: string;
  pIBSUF: string;
  pIBSMun: string;
  pAliqEfetMun: string;
  vIBSMun: string;
  pAliqEfetUF: string;
  vIBSUF: string;
  vIBSTot: string;
  pCBS: string;
  pAliqEfetCBS: string;
  vCBS: string;
  vTotIBSCBS: string;
  vTotNF: string;
  /** Indica se ha qualquer dado de IBS/CBS no XML */
  presente: boolean;
};

export type ExtrasData = {
  chSubstda: string;
  docRef: string;
  cObra: string;
  inscImobFisc: string;
  idAtvEvt: string;
  idDocTec: string;
  xPed: string;
  xItemPed: string;
  xOutInf: string;
};

export type NfseCoreData = {
  chaveAcesso: string;
  numeroNfse: string;
  localEmissao: string;
  localPrestacao: string;
  localIncidencia: string;
  tribNac: string;
  dataProcessamento: string;
  numeroDFSe: string;
  competenciaDps: string;
  dataEmissaoNfse: string;
  numeroDps: string;
  serieDps: string;
  dataEmissaoDps: string;
  ambGer: string;
  tpAmb: string;
  cStat: string;
  tpEmit: string;
  finNFSe: string;
  emitente: {
    cnpj: string;
    inscricaoMunicipal: string;
    nome: string;
    email: string;
    fone: string;
    logradouro: string;
    numero: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
    ibgeMunicipio: string;
    optanteSimplesNacional: string;
    regimeApuracaoTributariaSN: string;
  };
  tomador: PessoaData;
  destinatario: PessoaData;
  intermediario: PessoaData;
  servico: {
    codTribNac: string;
    codTribMun: string;
    xTribNac: string;
    xTribMun: string;
    descricao: string;
    nbs: string;
    infoComp: string;
    pais: string;
  };
  valores: {
    servico: string;
    descontoIncondicionado: string;
    descontoCondicionado: string;
    totalDeducaoReducao: string;
    calculoBeneficioMunicipal: string;
    baseCalculoISSQN: string;
    ISSQN: string;
    IRRF: string;
    CP: string;
    CSLL: string;
    PIS: string;
    COFINS: string;
    liquido: string;
    totalRetencoes: string;
    valorTotalTributos?: {
      totalTributosFederais: string;
      totalTributosEstaduais: string;
      totalTributosMunicipais: string;
    };
    porcentagemTotalTributos?: {
      porcentagemTotalTributosFederais: string;
      porcentagemTotalTributosEstaduais: string;
      porcentagemTotalTributosMunicipais: string;
    };
  };
  dps: {
    numero: string;
    serie: string;
    competencia: string;
    dataEmissao: string;
  };
  tributacao: {
    tipoTributacaoISSQN: string;
    regimeEspecialTributacao: string;
    tipoImunidade: string;
    tipoSuspensao: string;
    nProcessoSuspensao: string;
    nBeneficioMunicipal: string;
    tipoBeneficioMunicipal: string;
    percentualAliquotaAplicadaISSQN: string;
    tipoRetencaoISSQN: string;
    tipoRetencaoPisCofins: string;
  };
  ibsCbs: IbsCbsData;
  extras: ExtrasData;
};
