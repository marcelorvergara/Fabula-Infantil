export function getFirst60Percent(str: string) {
  const length = str.length;
  const cutoff = Math.floor(length * 0.4);
  return str.substring(0, cutoff);
}
