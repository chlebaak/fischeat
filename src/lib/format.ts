const numberFormatter = new Intl.NumberFormat("cs-CZ", {
  maximumFractionDigits: 2,
});

const oneDecimalFormatter = new Intl.NumberFormat("cs-CZ", {
  maximumFractionDigits: 1,
});

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatOneDecimal(value: number): string {
  return oneDecimalFormatter.format(value);
}

export function formatPercent(value: number, digits = 1): string {
  const formatter = new Intl.NumberFormat("cs-CZ", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
  return `${formatter.format(value)} %`;
}

export function formatSigned(value: number, digits = 1): string {
  const formatted = new Intl.NumberFormat("cs-CZ", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
  return value > 0 ? `+${formatted}` : formatted;
}
