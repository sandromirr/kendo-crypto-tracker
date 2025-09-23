export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
};

export const formatCurrency = (value: number, currency: string = 'USD', decimals: number = 2): string => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    currencyDisplay: 'symbol'
  }).format(value);
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  })}%`;
};