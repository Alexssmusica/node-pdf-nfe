/**
 * Retorna <valor> especificado com máscara do Placa.
 *
 * @param      {string}  plate
 * @return     {string}
 */
export function formatLicensePlate(plate: string): string {
  if (!plate) return '';
  const oldFormat = /^[A-Z]{3}[0-9]{4}$/;
  const mercosulFormat = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  if (oldFormat.test(plate)) {
    return `${plate.slice(0, 3)}-${plate.slice(3)}`;
  } else if (mercosulFormat.test(plate)) {
    return `${plate.slice(0, 3)} ${plate.slice(3)}`;
  }
  return '';
}
