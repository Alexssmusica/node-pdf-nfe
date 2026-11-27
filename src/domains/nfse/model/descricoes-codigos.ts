import { truncateText } from '../shared/formatacao';

const DASH = '-';

function lookup(map: Record<string, string>, codigo: string, fallback: string = DASH): string {
  const k = String(codigo ?? '').trim();
  if (!k) return fallback;
  return map[k] ?? fallback;
}

export function optanteSimplesNacional(codigo: string): string {
  return lookup(
    {
      '1': 'Nao Optante',
      '2': 'Optante - Microempreendedor Individual (MEI)',
      '3': 'Optante - Microempresa ou Empresa de Pequeno Porte (ME/EPP)'
    },
    codigo
  );
}

export function regimeApuracaoTributariaSN(codigo: string): string {
  return lookup(
    {
      '1': 'Regime de apuracao dos tributos federais e municipal pelo SN',
      '2': 'Regime de apuracao dos tributos federais pelo SN e o ISSQN pela NFS-e conforme legislacao municipal',
      '3': 'Regime de apuracao dos tributos federais e municipal pela NFS-e conforme legislacoes federal e municipal'
    },
    codigo
  );
}

export function regimeEspecialTributacao(codigo: string): string {
  return lookup(
    {
      '0': 'Nenhum',
      '1': 'Ato Cooperado (Cooperativa)',
      '2': 'Estimativa',
      '3': 'Microempresa Municipal',
      '4': 'Notario ou Registrador',
      '5': 'Profissional Autonomo',
      '6': 'Sociedade de Profissionais',
      '9': 'Outros'
    },
    codigo
  );
}

export function tributacaoISSQN(codigo: string): string {
  return lookup(
    {
      '1': 'Operacao tributavel',
      '2': 'Imunidade',
      '3': 'Exportacao de servico',
      '4': 'Nao Incidencia'
    },
    codigo
  );
}

export function tipoImunidade(codigo: string): string {
  const map: Record<string, string> = {
    '0': 'Imunidade (tipo nao informado na nota de origem)',
    '1': 'Patrimonio, renda ou servicos, uns dos outros (CF88, Art 150, VI, a)',
    '2': 'Entidades religiosas e templos de qualquer culto (CF88, Art 150, VI, b)',
    '3': 'Partidos politicos, entidades sindicais, educacao e assistencia social sem fins lucrativos (CF88, Art 150, VI, c)',
    '4': 'Livros, jornais, periodicos e o papel destinado a sua impressao (CF88, Art 150, VI, d)',
    '5': 'Fonogramas e videofonogramas musicais brasileiros (CF88, Art 150, VI, e)'
  };
  return truncateText(lookup(map, codigo), 40);
}

export function suspensaoExigibilidadeISSQN(codigo: string): string {
  return lookup(
    {
      '1': 'Exigibilidade do ISSQN Suspensa por Decisao Judicial',
      '2': 'Exigibilidade do ISSQN Suspensa por Processo Administrativo'
    },
    codigo
  );
}

export function tipoRetencaoISSQN(codigo: string): string {
  return lookup(
    {
      '1': 'Nao Retido',
      '2': 'Retido pelo Tomador',
      '3': 'Retido pelo Intermediario'
    },
    codigo
  );
}

/**
 * Tipo de Retencao PIS/COFINS/CSLL (tpRetPisCofins) conforme NT 007/2026 da NFS-e Nacional.
 * Os codigos 1 e 2 sao mantidos apenas para transicao e serao suprimidos quando os grupos IBSCBS
 * se tornarem obrigatorios. Os codigos 0 e 3-9 sao o novo dominio definitivo.
 */
export function retencaoPisCofins(codigo: string): string {
  return lookup(
    {
      '0': 'PIS/COFINS/CSLL Nao Retidos',
      '1': 'PIS/COFINS Retidos',
      '2': 'PIS/COFINS Nao Retidos',
      '3': 'PIS/COFINS/CSLL Retidos',
      '4': 'PIS/COFINS Retidos, CSLL Nao Retido',
      '5': 'PIS Retido, COFINS/CSLL Nao Retidos',
      '6': 'COFINS Retido, PIS/CSLL Nao Retidos',
      '7': 'PIS Nao Retido, COFINS/CSLL Retidos',
      '8': 'PIS/COFINS Nao Retidos, CSLL Retido',
      '9': 'COFINS Nao Retido, PIS/CSLL Retidos'
    },
    codigo
  );
}

/**
 * Emitente da NFS-e (tpEmit) - 3 opcoes per NT 008 secao 2.4.5.
 */
export function tpEmitenteNFSe(codigo: string): string {
  return lookup(
    {
      '1': 'Prestador',
      '2': 'Tomador',
      '3': 'Intermediario'
    },
    codigo
  );
}

/**
 * Situacao da NFS-e (cStat). Os textos sao baseados na tabela oficial
 * de codigos de retorno do sistema nacional NFS-e.
 */
export function situacaoNFSe(codigo: string): string {
  const map: Record<string, string> = {
    '100': 'NFS-e regular',
    '101': 'NFS-e regular emitida em contingencia',
    '102': 'NFS-e cancelada',
    '103': 'NFS-e cancelada por substituicao',
    '105': 'NFS-e de Decisao Judicial ou Administrativa',
    '999': 'NFS-e rejeitada'
  };
  return truncateText(lookup(map, codigo), 37);
}

/**
 * Finalidade da emissao (finNFSe).
 */
export function finalidadeNFSe(codigo: string): string {
  const map: Record<string, string> = {
    '1': 'NFS-e regular',
    '2': 'NFS-e complementar',
    '3': 'NFS-e de ajuste',
    '4': 'NFS-e substituta'
  };
  return truncateText(lookup(map, codigo), 37);
}

/**
 * Tipo de ambiente (tpAmb).
 */
export function tpAmbiente(codigo: string): string {
  return lookup(
    {
      '1': 'Producao',
      '2': 'Homologacao'
    },
    codigo
  );
}

/**
 * Indicador de Operacao do IBS/CBS (cIndOp).
 */
export function indicadorOperacaoIBS(codigo: string): string {
  return lookup(
    {
      '1': 'Operacao interna',
      '2': 'Operacao interestadual',
      '3': 'Operacao com o exterior',
      '4': 'Operacao com nao contribuinte'
    },
    codigo,
    codigo || DASH
  );
}

/**
 * Tipo de Beneficio Municipal (tpBM) per item 2.1.8.
 */
export function tipoBeneficioMunicipal(codigo: string): string {
  return lookup(
    {
      '1': 'Isencao',
      '2': 'Reducao de Base de Calculo',
      '3': 'Reducao de Aliquota',
      '4': 'Outros'
    },
    codigo
  );
}
