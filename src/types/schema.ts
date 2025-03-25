export type TCodUfIbge =
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '31'
  | '32'
  | '33'
  | '35'
  | '41'
  | '42'
  | '43'
  | '50'
  | '51'
  | '52'
  | '53';
export type TUfEmi =
  | 'AC'
  | 'AL'
  | 'AM'
  | 'AP'
  | 'BA'
  | 'CE'
  | 'DF'
  | 'ES'
  | 'GO'
  | 'MA'
  | 'MG'
  | 'MS'
  | 'MT'
  | 'PA'
  | 'PB'
  | 'PE'
  | 'PI'
  | 'PR'
  | 'RJ'
  | 'RN'
  | 'RO'
  | 'RR'
  | 'RS'
  | 'SC'
  | 'SE'
  | 'SP'
  | 'TO'
  | 'EX';
export type TAmb = '1' | '2';
export type Tmod = '55' | '65';
type TNFeModBC = '0' | '1' | '2' | '3';
type TNFeModBCST = '0' | '1' | '2' | '3' | '4' | '5';
type TNFeInfNFeIdeIndIntermed = '0' | '1' | '2' | '3' | '4' | '9';
type TNFeInfNFeDetImpostoICMSICMS20CST = '20';
type TNFeInfNFeDetImpostoISSQNIndISS = '1' | '2' | '3' | '4' | '5' | '6' | '7';
type TNFeInfNFeDetImpostoISSQNIndIncentivo = '1' | '2';
type TIpiIPITribCST = '00' | '49' | '50' | '99';
type Torig = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
type TNFeInfNFeDetImpostoICMSICMSSN500CSOSN = '500';
type TNFeInfNFeDetImpostoICMSICMSSN202CSOSN = '202' | '203';
type TNFeInfNFeDetImpostoICMSICMSSN201CSOSN = '201';
type TNFeInfNFeDetImpostoICMSICMS90CST = '90';
type TNFeInfNFeMotDesICMS = '3' | '9' | '12';
type TNFeInfNFeDetImpostoICMSICMS70CST = '70';
type TNFeInfNFeDetImpostoICMSICMS60CST = '60';
type TNFeInfNFeDetImpostoICMSICMS51CST = '51';
type TNFeInfNFeDetImpostoICMSICMSSTCST = '41' | '60';
type TNFeInfNFeDetImpostoICMSICMS40CST = '40' | '41' | '50';
type TNFeInfNFeDetImpostoICMSICMS40MotDesICMS = '1' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '16' | '90';
type TNFeInfNFeDetImpostoICMSICMS30CST = '30';
type TNFeInfNFeDetImpostoICMSICMS30MotDesICMS = '6' | '7' | '9';
type TNFeInfNFeDetImpostoICMSICMSPartCST = '10' | '90';
type TNFeInfNFeDetImpostoICMSICMS10CST = '10';
type TNFeInfNFeDetImpostoICMSICMS00CST = '00';
type TNFeInfNFeDetProdIndEscala = 'S' | 'N';
type TNFeInfNFeDetProdDITpViaTransp = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
type TNFeInfNFeDetProdDITpIntermedio = '1' | '2' | '3';
type TEnderEmiCPais = '1058';
type TEnderEmiXPais = 'Brasil' | 'BRASIL';
type TNFeInfNFeEmitCRT = '1' | '2' | '3';
type ItemsChoiceType5 = 'balsa' | 'reboque' | 'vagao' | 'veicTransp';
type TNFeInfNFePagDetPagCardTpIntegra = '1' | '2';
type TNFeInfNFePagDetPagCardTBand = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '99';
type TNFeInfNFeInfAdicProcRefIndProc = '0' | '1' | '2' | '3' | '9';
type ItemChoiceType1 = 'refCTe' | 'refECF' | 'refNF' | 'refNFP' | 'refNFe';
type TNFeInfNFeIdeNFrefRefNFPMod = '01' | '04';
type TNFeInfNFeIdeNFrefRefNFMod = '01' | '02';
type TNFeInfNFeIdeNFrefRefECFMod = '2B' | '2C' | '2D';
type TNFeInfNFeTotalISSQNtotCRegTrib = '1' | '2' | '3' | '4' | '5' | '6';
type TNFeDoc = 'CNPJ' | 'CPF';
export interface TNFeInfNFeDet {
  $: {
    nItem: string;
  };
  prod: TNFeInfNFeDetProd;
  imposto: TNFeInfNFeDetImposto;
  impostoDevol?: TNFeInfNFeDetImpostoDevol;
  infAdProd?: string;
}
interface TNFeInfNFeDetImpostoDevol {
  pDevol: number;
  IPI: TNFeInfNFeDetImpostoDevolIPI;
}
interface TNFeInfNFeDetImpostoDevolIPI {
  vIPIDevol: number;
}
interface TNFeInfNFeDetImpostoPIS {
  PISAliq?: TNFeInfNFeDetImpostoPISItem;
  PISQtde?: TNFeInfNFeDetImpostoPISItem;
  PISNT?: TNFeInfNFeDetImpostoPISItem;
  PISOutr?: TNFeInfNFeDetImpostoPISItem;
}
interface TNFeInfNFeDetImpostoPISItem {
  CST: string;
  vBC: number;
  pPIS: number;
  vPIS?: number;
  vBCProd?: number;
  qBCProd?: number;
  vAliqProd?: number;
}
interface TNFeInfNFeDetImposto {
  vTotTrib: number;
  ICMS: TNFeInfNFeDetImpostoICMS;
  PIS: TNFeInfNFeDetImpostoPIS;
  COFINS: TNFeInfNFeDetImpostoCOFINS;
  IPI?: TNFeInfNFeDetImpostoIPI;
  II?: TNFeInfNFeDetImpostoII;
  ISSQN?: TNFeInfNFeDetImpostoISSQN;
  PISST?: TNFeInfNFeDetImpostoPISST;
  COFINSST?: TNFeInfNFeDetImpostoCOFINSST;
  ICMSUFDest?: TNFeInfNFeDetImpostoICMSUFDest;
}
interface TNFeInfNFeDetImpostoICMSUFDest {
  vBCUFDest: number;
  vBCFCPUFDest: number;
  pFCPUFDest: number;
  pICMSUFDest: number;
  pICMSInter: number;
  pICMSInterPart: number;
  vFCPUFDest: number;
  vICMSUFDest: number;
  vICMSUFRemet: number;
}
interface TNFeInfNFeDetImpostoCOFINSST {
  vBC?: number;
  pCOFINS?: number;
  vCOFINS: number;
  qBCProd?: number;
  vAliqProd?: number;
}
interface TNFeInfNFeDetImpostoPISST {
  vBC?: number;
  pPIS?: number;
  vPIS?: number;
  qBCProd?: number;
  vAliqProd?: number;
}
interface TNFeInfNFeDetImpostoISSQN {
  vBC: string;
  vAliq: string;
  vISSQN: string;
  cMunFG: string;
  vDeducao: string;
  vOutro: string;
  vDescIncond: string;
  vDescCond: string;
  vISSRet: string;
  indISS: TNFeInfNFeDetImpostoISSQNIndISS;
  cServico: string;
  cMun: string;
  cPais: string;
  nProcesso: string;
  indIncentivo: TNFeInfNFeDetImpostoISSQNIndIncentivo;
}
interface TNFeInfNFeDetImpostoII {
  vBC: number;
  vDespAdu: number;
  vII: number;
  vIOF: number;
}
interface TNFeInfNFeDetImpostoIPI {
  cEnq: string;
  CNPJProd: string;
  cSelo: string;
  qSelo: string;
  IPINT?: string;
  IPITrib?: TIpiIPITrib;
}
interface TIpiIPITrib {
  CST: TIpiIPITribCST;
  vBC?: number;
  pIPI?: number;
  vIPI: number;
  qUnid?: number;
  vUnid?: number;
}
interface TNFeInfNFeDetImpostoCOFINS {
  COFINSAliq?: TNFeInfNFeDetImpostoCOFINSItem;
  COFINSQtde?: TNFeInfNFeDetImpostoCOFINSItem;
  COFINSNT?: TNFeInfNFeDetImpostoCOFINSItem;
  COFINSOutr?: TNFeInfNFeDetImpostoCOFINSItem;
}
interface TNFeInfNFeDetImpostoCOFINSItem {
  CST: string;
  vBC: number;
  pCOFINS: number;
  vCOFINS?: number;
  qBCProd?: number;
  vAliqProd?: number;
}
interface TNFeInfNFeDetImpostoICMS {
  ICMS00?: TNFeInfNFeDetImpostoICMSICMS00;
  ICMS10?: TNFeInfNFeDetImpostoICMSICMS10 | TNFeInfNFeDetImpostoICMSICMSPart;
  ICMS20?: TNFeInfNFeDetImpostoICMSICMS20;
  ICMS30?: TNFeInfNFeDetImpostoICMSICMS30;
  ICMS40?: TNFeInfNFeDetImpostoICMSICMS40;
  ICMS41?: TNFeInfNFeDetImpostoICMSICMSST;
  ICMS51?: TNFeInfNFeDetImpostoICMSICMS51;
  ICMS60?: TNFeInfNFeDetImpostoICMSICMS60;
  ICMS70?: TNFeInfNFeDetImpostoICMSICMS70;
  ICMS90?: TNFeInfNFeDetImpostoICMSICMS90 | TNFeInfNFeDetImpostoICMSICMSPart;
  ICMSPart?: TNFeInfNFeDetImpostoICMSICMSPart;
  ICMSSN101?: TNFeInfNFeDetImpostoICMSICMSSN101;
  ICMSSN102?: TNFeInfNFeDetImpostoICMSICMSSN102;
  ICMSSN201?: TNFeInfNFeDetImpostoICMSICMSSN201;
  ICMSSN202?: TNFeInfNFeDetImpostoICMSICMSSN202;
  ICMSSN500?: TNFeInfNFeDetImpostoICMSICMSSN500;
  ICMSSN900?: TNFeInfNFeDetImpostoICMSICMSSN900;
  ICMSST?: TNFeInfNFeDetImpostoICMSICMSST;
}
interface TNFeInfNFeDetImpostoICMSICMSSN102 {
  orig: Torig;
  CSOSN: '102' | '103' | '300' | '400';
}
interface TNFeInfNFeDetImpostoICMSICMSSN101 {
  orig: Torig;
  CSOSN: '101';
  pCredSN?: string;
  vCredICMSSN?: string;
}
interface TNFeInfNFeDetImpostoICMSICMSSN900 {
  orig: Torig;
  CSOSN: '900';
  modBC: TNFeModBC;
  vBC?: string;
  pRedBC?: string;
  pICMS?: string;
  vICMS?: string;
  modBCST?: TNFeModBCST;
  pMVAST?: string;
  pRedBCST?: string;
  vBCST?: string;
  pICMSST?: string;
  vICMSST?: string;
  vBCFCPST?: string;
  pFCPST?: string;
  vFCPST?: string;
  pCredSN?: string;
  vCredICMSSN?: string;
}
interface TNFeInfNFeDetImpostoICMSICMSSN500 {
  orig: Torig;
  CSOSN: TNFeInfNFeDetImpostoICMSICMSSN500CSOSN;
  vBCSTRet?: string;
  pST?: string;
  vICMSSubstituto?: string;
  vICMSSTRet?: string;
  vBCFCPSTRet?: string;
  pFCPSTRet?: string;
  vFCPSTRet?: string;
  pRedBCEfet?: string;
  vBCEfet?: string;
  pICMSEfet?: string;
  vICMSEfet?: string;
}
interface TNFeInfNFeDetImpostoICMSICMSSN202 {
  orig: Torig;
  CSOSN: TNFeInfNFeDetImpostoICMSICMSSN202CSOSN;
  modBCST: TNFeModBCST;
  pMVAST?: string;
  pRedBCST?: string;
  vBCST?: string;
  pICMSST?: string;
  vICMSST?: string;
  vBCFCPST?: string;
  pFCPST?: string;
  vFCPST?: string;
}
interface TNFeInfNFeDetImpostoICMSICMSSN201 {
  orig: Torig;
  CSOSN: TNFeInfNFeDetImpostoICMSICMSSN201CSOSN;
  modBCST: TNFeModBCST;
  pMVAST?: string;
  pRedBCST?: string;
  vBCST?: string;
  pICMSST?: string;
  vICMSST?: string;
  vBCFCPST?: string;
  pFCPST?: string;
  vFCPST?: string;
  pCredSN?: string;
  vCredICMSSN?: string;
}
interface TNFeInfNFeDetImpostoICMSICMS90 {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMS90CST;
  modBC: TNFeModBC;
  vBC?: string;
  pRedBC?: string;
  pICMS?: string;
  vICMS?: string;
  vBCFCP?: string;
  pFCP?: string;
  vFCP?: string;
  modBCST: TNFeModBCST;
  pMVAST?: string;
  pRedBCST?: string;
  vBCST?: string;
  pICMSST?: string;
  vICMSST?: string;
  vBCFCPST?: string;
  pFCPST?: string;
  vFCPST?: string;
  vICMSDeson?: string;
  motDesICMS: TNFeInfNFeMotDesICMS;
}
interface TNFeInfNFeDetImpostoICMSICMS70 {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMS70CST;
  modBC: TNFeModBC;
  pRedBC?: string;
  vBC?: string;
  pICMS?: string;
  vICMS?: string;
  vBCFCP?: string;
  pFCP?: string;
  vFCP?: string;
  modBCST: TNFeModBCST;
  pMVAST?: string;
  pRedBCST?: string;
  vBCST?: string;
  pICMSST?: string;
  vICMSST?: string;
  vBCFCPST?: string;
  pFCPST?: string;
  vFCPST?: string;
  vICMSDeson?: string;
  motDesICMS: TNFeInfNFeMotDesICMS;
}
interface TNFeInfNFeDetImpostoICMSICMS60 {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMS60CST;
  vBCSTRet?: string;
  pST?: string;
  vICMSSubstituto?: string;
  vICMSSTRet?: string;
  vBCFCPSTRet?: string;
  pFCPSTRet?: string;
  vFCPSTRet?: string;
  pRedBCEfet?: string;
  vBCEfet?: string;
  pICMSEfet?: string;
  vICMSEfet?: string;
}
interface TNFeInfNFeDetImpostoICMSICMS51 {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMS51CST;
  modBC: TNFeModBC;
  modBCSpecified?: boolean;
  pRedBC?: string;
  vBC?: string;
  pICMS?: string;
  vICMSOp?: string;
  pDif?: string;
  vICMSDif?: string;
  vICMS?: string;
  vBCFCP?: string;
  pFCP?: string;
  vFCP?: string;
}
interface TNFeInfNFeDetImpostoICMSICMSST {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMSSTCST;
  vBCSTRet: string;
  pST?: string;
  vICMSSubstituto?: string;
  vICMSSTRet?: string;
  vBCFCPSTRet?: string;
  pFCPSTRet?: string;
  vFCPSTRet?: string;
  vBCSTDest?: string;
  vICMSSTDest?: string;
  pRedBCEfet?: string;
  vBCEfet?: string;
  pICMSEfet?: string;
  vICMSEfet?: string;
}
interface TNFeInfNFeDetImpostoICMSICMS40 {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMS40CST;
  vICMSDeson?: string;
  motDesICMS: TNFeInfNFeDetImpostoICMSICMS40MotDesICMS;
}
interface TNFeInfNFeDetImpostoICMSICMS30 {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMS30CST;
  modBCST: TNFeModBCST;
  pMVAST?: string;
  pRedBCST?: string;
  vBCST?: string;
  pICMSST?: string;
  vICMSST?: string;
  vBCFCPST?: string;
  pFCPST?: string;
  vFCPST?: string;
  vICMSDeson?: string;
  motDesICMS: TNFeInfNFeDetImpostoICMSICMS30MotDesICMS;
}
interface TNFeInfNFeDetImpostoICMSICMS20 {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMS20CST;
  modBC: TNFeModBC;
  pRedBC?: string;
  vBC?: string;
  pICMS?: string;
  vICMS?: string;
  vBCFCP?: string;
  pFCP?: string;
  vFCP?: string;
  vICMSDeson?: string;
  motDesICMS: TNFeInfNFeMotDesICMS;
}
interface TNFeInfNFeDetImpostoICMSICMSPart {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMSPartCST;
  modBC: TNFeModBC;
  vBC?: string;
  pRedBC?: string;
  pICMS?: string;
  vICMS?: string;
  modBCST: TNFeModBCST;
  pMVAST?: string;
  pRedBCST?: string;
  vBCST?: string;
  pICMSST?: string;
  vICMSST?: string;
  pBCOp: string;
  UFST: TUfEmi;
}
interface TNFeInfNFeDetImpostoICMSICMS10 {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMS10CST;
  modBC: TNFeModBC;
  vBC?: string;
  pICMS?: string;
  vICMS?: string;
  vBCFCP?: string;
  pFCP?: string;
  vFCP?: string;
  modBCST: TNFeModBCST;
  pMVAST?: string;
  pRedBCST?: string;
  vBCST?: string;
  pICMSST?: string;
  vICMSST?: string;
  vBCFCPST?: string;
  pFCPST?: string;
  vFCPST?: string;
}
interface TNFeInfNFeDetImpostoICMSICMS00 {
  orig: Torig;
  CST: TNFeInfNFeDetImpostoICMSICMS00CST;
  modBC: TNFeModBC;
  vBC?: string;
  pICMS?: string;
  vICMS?: string;
  pFCP?: string;
  vFCP?: string;
}
interface TNFeInfNFeDetProd {
  cProd: string;
  cEAN: string;
  xProd: string;
  NCM: string;
  nVE?: string[];
  CEST?: string;
  indEscala?: TNFeInfNFeDetProdIndEscala;
  indEscalaSpecified?: boolean;
  cNPJFab?: string;
  cBenef?: string;
  eXTIPI?: string;
  CFOP: string;
  uCom: string;
  qCom: string;
  vUnCom: string;
  vProd: string;
  cEANTrib: string;
  uTrib: string;
  qTrib: string;
  vUnTrib: string;
  vFrete: string;
  vSeg: string;
  vDesc: string;
  vOutro: string;
  indTot: '0' | '1';
  di?: TNFeInfNFeDetProdDI[];
  det?: TNFeInfNFeDetProdDet[];
  xPed?: string;
  nItemPed?: string;
  nFCI?: string;
  rastro?: TNFeInfNFeDetProdRastro[];
  items?: object[];
}
interface TNFeInfNFeDetProdRastro {
  nLote: string;
  qLote: string;
  dFab: string;
  dVal: string;
  cAgreg: string;
}
interface TNFeInfNFeDetProdDet {
  nDraw: string;
  Ind: TNFeInfNFeDetProdDetInd;
}
interface TNFeInfNFeDetProdDetInd {
  nRE: string;
  chNFe: string;
  q: string;
}
interface TNFeInfNFeDetProdDI {
  nDI: string;
  dDI: string;
  xLocDesemb: string;
  uFDesemb: TUfEmi;
  dDesemb: string;
  tpViaTransp: TNFeInfNFeDetProdDITpViaTransp;
  vAFRMM: string;
  tpIntermedio: TNFeInfNFeDetProdDITpIntermedio;
  cNPJ: string;
  uFTerceiro: TUfEmi;
  uFTerceiroSpecified: boolean;
  cador: string;
  adi: TNFeInfNFeDetProdDIAdi[];
}
interface TNFeInfNFeDetProdDIAdi {
  nAdicao: string;
  nSeqAdic: string;
  cFabricante: string;
  vDescDI: string;
  nDraw: string;
}
export interface TNFeInfNFeDest {
  CNPJ?: string;
  CPF?: string;
  idEstrangeiro?: string;
  xNome: string;
  enderDest?: TEnderEmi;
  indIEDest: '1' | '2' | '9';
  IE?: string;
  ISUF?: string;
  IM?: string;
  email?: string;
}
interface TEnderEmi {
  xLgr: string;
  nro: string;
  xCpl?: string;
  xBairro: string;
  cMun: string;
  xMun: string;
  UF: TUfEmi;
  CEP: string;
  cPais: TEnderEmiCPais;
  cPaisSpecified?: boolean;
  xPais: TEnderEmiXPais;
  xPaisSpecified?: boolean;
  fone?: string;
}
export interface TNFeInfNFeEmit {
  CNPJ: string;
  xNome: string;
  xFant: string;
  enderEmit: TEnderEmi;
  fone?: string;
  IE: string;
  IEST?: string;
  IM: string;
  CNAE?: string;
  CRT: TNFeInfNFeEmitCRT;
}
export interface TNFeInfNFeTransp {
  modFrete: '0' | '1' | '2' | '3' | '4' | '9';
  transporta?: TNFeInfNFeTranspTransporta;
  retTransp?: TNFeInfNFeTranspRetTransp;
  veicTransp?: TNFeInfNFeTranspVeicTransp;
  items?: object[];
  itemsElementName?: ItemsChoiceType5[];
  vol?: TNFeInfNFeTranspVol;
}
interface TNFeInfNFeTranspVol {
  qVol: string;
  esp: string;
  marca: string;
  nVol: string;
  pesoL: string;
  pesoB: string;
  lacres: TNFeInfNFeTranspVolLacres[];
}
interface TNFeInfNFeTranspVolLacres {
  nLacre: string;
}
interface TNFeInfNFeTranspVeicTransp {
  placa: string;
  UF: string;
  RNTC: string;
}
interface TNFeInfNFeTranspRetTransp {
  vServ: string;
  vBCRet: string;
  pICMSRet: string;
  vICMSRet: string;
  cFOP: string;
  cMunFG: string;
}
interface TNFeInfNFeTranspTransporta {
  CNPJ?: string;
  CPF?: string;
  item: string;
  itemElementName: TNFeDoc;
  xNome: string;
  ie: string;
  xEnder: string;
  xMun: string;
  uf: TUfEmi;
  ufSpecified: boolean;
}
export interface TNFeInfNFePag {
  detPag: TNFeInfNFePagDetPag[];
  vTroco?: string;
}
export interface TNFeInfNFePagDetPag {
  indPag: '0' | '1';
  indPagSpecified?: boolean;
  tPag: '01' | '02' | '03' | '04' | '05' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '90' | '99';
  vPag: string;
  card?: TNFeInfNFePagDetPagCard;
  xPag?: string;
}
interface TNFeInfNFePagDetPagCard {
  tpIntegra: TNFeInfNFePagDetPagCardTpIntegra;
  CNPJ: string;
  tBand: TNFeInfNFePagDetPagCardTBand;
  tBandSpecified?: boolean;
  cAut: string;
}
export interface TNFeInfNFeInfAdic {
  infAdFisco?: string;
  infCpl?: string;
  obsCont: TNFeInfNFeInfAdicObs[];
  obsFisco: TNFeInfNFeInfAdicObs[];
  procRef: TNFeInfNFeInfAdicProcRef[];
}
export interface TNFeInfNFeInfAdicObs {
  xTexto: string;
  xCampo: string;
}
export interface TNFeInfNFeInfAdicProcRef {
  nProc: string;
  indProc: TNFeInfNFeInfAdicProcRefIndProc;
}
export interface TNFeInfNFeTotalICMSTot {
  vBC: string;
  vICMS: string;
  vICMSDeson: string;
  vFCPUFDest?: string;
  vICMSUFDest?: string;
  vICMSUFRemet?: string;
  vFCP: string;
  vBCST: string;
  vST: string;
  vFCPST: string;
  vFCPSTRet: string;
  vProd: string;
  vFrete: string;
  vSeg: string;
  vDesc: string;
  vII: string;
  vIPI: string;
  vIPIDevol: string;
  vPIS: string;
  vCOFINS: string;
  vOutro: string;
  vNF: string;
  vTotTrib?: string;
}
export interface IdeInput {
  cUF: TCodUfIbge;
  natOp: string;
  serie: string;
  nNF: string;
  dhEmi: string;
  dhSaiEnt?: string;
  tpNF: '0' | '1';
  idDest: '1' | '2' | '3';
  cMunFG: string;
  tpImp: '1' | '2' | '3' | '4' | '5';
  tpEmis: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '9';
  finNFe: '1' | '2' | '3' | '4';
  indFinal: '0' | '1';
  indPres: '1' | '2' | '3' | '4' | '5' | '9';
  procEmi: '0' | '1' | '2' | '3';
  verProc: string;
  dhCont?: string;
  xJust?: string;
  nFref?: TNFeInfNFeIdeNFref[];
  indIntermed?: TNFeInfNFeIdeIndIntermed;
}
interface TNFeInfNFeIdeNFref {
  refCTe?: string;
  refECF?: TNFeInfNFeIdeNFrefRefECF;
  refNF?: TNFeInfNFeIdeNFrefRefNF;
  refNFP?: TNFeInfNFeIdeNFrefRefNFP;
  refNFe?: string;
  itemElementName: ItemChoiceType1;
}
interface TNFeInfNFeIdeNFrefRefNFP {
  cUF: TCodUfIbge;
  aAMM: string;
  item: string;
  itemElementName: TNFeDoc;
  ie: string;
  mod: TNFeInfNFeIdeNFrefRefNFPMod;
  serie: string;
  nNF: string;
}
interface TNFeInfNFeIdeNFrefRefNF {
  cUF_1: TCodUfIbge;
  aAMM: string;
  cNPJ: string;
  mod: TNFeInfNFeIdeNFrefRefNFMod;
  serie: string;
  nNF: string;
}
interface TNFeInfNFeIdeNFrefRefECF {
  mod: TNFeInfNFeIdeNFrefRefECFMod;
  nECF: string;
  nCOO: string;
}
export interface TNFeInfNFeIde {
  cUF: TCodUfIbge;
  cNF: string;
  natOp: string;
  mod: Tmod;
  serie: string;
  nNF: string;
  dhEmi: string;
  dhSaiEnt?: string;
  tpNF: '0' | '1';
  idDest: '1' | '2' | '3';
  cMunFG: string;
  tpImp: '1' | '2' | '3' | '4' | '5';
  tpEmis: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '9';
  cDV: string;
  tpAmb: TAmb;
  finNFe: '1' | '2' | '3' | '4';
  indFinal: '0' | '1';
  indPres: '1' | '2' | '3' | '4' | '5' | '9';
  procEmi: '0' | '1' | '2' | '3';
  verProc: string;
  dhCont?: string;
  xJust?: string;
  nFref?: TNFeInfNFeIdeNFref[];
  indIntermed?: TNFeInfNFeIdeIndIntermed;
}
export interface TNFeInfNFeTotal {
  ICMSTot: TNFeInfNFeTotalICMSTot;
  ISSQNtot?: TNFeInfNFeTotalISSQNtot;
  retTrib?: TNFeInfNFeTotalRetTrib;
}
interface TNFeInfNFeTotalRetTrib {
  vRetPIS: string;
  vRetCOFINS: string;
  vRetCSLL: string;
  vBCIRRF: string;
  vIRRF: string;
  vBCRetPrev: string;
  vRetPrev: string;
}
interface TNFeInfNFeTotalISSQNtot {
  vServ: string;
  vBC: string;
  vISS: string;
  vPIS: string;
  vCOFINS: string;
  dCompet: string;
  vDeducao: string;
  vOutro: string;
  vDescIncond: string;
  vDescCond: string;
  vISSRet: string;
  cRegTrib: TNFeInfNFeTotalISSQNtotCRegTrib;
  cRegTribSpecified: boolean;
}
export interface TNFeInfNFeCobr {
  fat: TNFeInfNFeCobrFat;
  dup: TNFeInfNFeCobrDup[];
}
export interface TNFeInfNFeCobrDup {
  nDup: string;
  dVenc: string;
  vDup: string;
}
interface TNFeInfNFeCobrFat {
  nFat: string;
  vOrig: string;
  vDesc: string;
  vLiq: string;
}
export interface TNFeInfNFe {
  nfe?: TNFeInfNFeDetImpostoICMSUFDest;
  $: {
    versao: string;
    Id: string;
  };
  ide: TNFeInfNFeIde;
  emit: TNFeInfNFeEmit;
  avulsa?: TNFeInfNFeAvulsa;
  dest?: TNFeInfNFeDest;
  retirada?: TLocal;
  entrega?: TLocal;
  autXML?: TNFeInfNFeAutXML[];
  det: TNFeInfNFeDet[];
  total: TNFeInfNFeTotal;
  transp: TNFeInfNFeTransp;
  cobr?: TNFeInfNFeCobr;
  pag?: TNFeInfNFePag;
  infAdic: TNFeInfNFeInfAdic;
  a?: TNFeInfNFea;
  compra?: TNFeInfNFeCompra;
  cana?: TNFeInfNFeCana;
  infRespTec?: TInfRespTec;
}
export interface TInfRespTec {
  CNPJ: string;
  xContato: string;
  email: string;
  fone: string;
  idCSRT?: string;
  hashCSRT?: string;
}
interface TNFeInfNFeCana {
  safra: string;
  ref: string;
  forDia: TNFeInfNFeCanaForDia[];
  qTotMes: string;
  qTotAnt: string;
  qTotGer: string;
  deduc: TNFeInfNFeCanaDeduc[];
  vFor: string;
  vTotDed: string;
  vLiqFor: string;
}
interface TNFeInfNFeCanaDeduc {
  xDed: string;
  vDed: string;
}
interface TNFeInfNFeCanaForDia {
  qtde: string;
  dia: string;
}
interface TNFeInfNFeCompra {
  xNEmp: string;
  xPed: string;
  xCont: string;
}
interface TNFeInfNFea {
  uFSaidaPais: TUfEmi;
  xLoca: string;
  xLocDespacho: string;
}
interface TNFeInfNFeAutXML {
  item: string;
  itemElementName: TNFeDoc;
}
interface TLocal {
  item: string;
  itemElementName: TNFeDoc;
  xNome: string;
  xLgr: string;
  nro: string;
  xCpl: string;
  xBairro: string;
  cMun: string;
  xMun: string;
  uf: TUfEmi;
  cEP: string;
  cPais: string;
  xPais: string;
  fone: string;
  email: string;
  ie: string;
}
interface TNFeInfNFeAvulsa {
  cNPJ: string;
  xOrgao: string;
  matr: string;
  xAgente: string;
  fone: string;
  uf: TUfEmi;
  nDAR: string;
  dEmi: string;
  vDAR: string;
  repEmi: string;
  dPag: string;
}

export interface TNFeInfNFeSupl {
  qrCode: string;
  urlChave: string;
}
