/**
 * Genera un string aleatorio de letras basado en el timestamp actual
 * para garantizar unicidad en los tests de registro.
 */
export function getUniqueAlphaString(): string {
  const map = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  return Date.now().toString().split('').map(digit => map[Number(digit)]).join('');
}