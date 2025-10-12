export function formatCurrency(value: number) {
  if (value >= 100_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  return `$${value.toLocaleString()}`;
}
