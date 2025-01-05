import { Currency } from '../types/enums';

export const toPercentage = (value: number, x100 = true, fix = 0): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '---';
  }

  return `${(value * (x100 ? 100 : 1)).toFixed(fix)}%`;
};

export const toCurrency = (value: number, currency = Currency.PLN): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '---';
  }

  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(
    value
  );
};

