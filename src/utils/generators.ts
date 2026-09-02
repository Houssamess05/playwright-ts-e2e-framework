/**
 * Generates a unique alphanumeric string based on the current timestamp.
 * The string is created by mapping each digit of the timestamp to a corresponding letter from 'a' to 'j'.
 * @returns A unique alphanumeric string.
 */
export function getUniqueAlphaString(): string {
  const map = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  return Date.now().toString().split('').map(digit => map[Number(digit)]).join('');
}