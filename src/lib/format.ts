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

export function formatDecimal(value: number, digits = 2): string {
  return new Intl.NumberFormat("cs-CZ", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatPercent(value: number, digits = 1): string {
  return `${formatDecimal(value, digits)} %`;
}

export function formatSigned(value: number, digits = 1): string {
  const formatted = new Intl.NumberFormat("cs-CZ", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
  return value > 0 ? `+${formatted}` : formatted;
}
