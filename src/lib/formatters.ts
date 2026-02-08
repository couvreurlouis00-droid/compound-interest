export function formatCurrency(value: number): string {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(value);
}

export function formatCurrencyWithDecimals(value: number): string {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(value);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
