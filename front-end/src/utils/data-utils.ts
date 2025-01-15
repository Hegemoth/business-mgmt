import { PaymentPeriod, Unit } from '../types/enums';

// TODO: change to i18n
export const getUnit = (unit: Unit): string => {
  const units = {
    [Unit.UN]: 'szt.',
    [Unit.KG]: 'kg',
    [Unit.L]: 'l',
  };

  return units[unit];
};

// TODO: change to i18n
export const getPaymentPeriod = (period: PaymentPeriod): string => {
  const paymentPeriods = {
    [PaymentPeriod.MONTHLY]: 'Miesięczna',
    [PaymentPeriod.HOURLY]: 'Godzinowa',
  };

  return paymentPeriods[period];
};

export const getFullName = (
  obj: {
    firstName: string;
    lastName: string;
  } | null
): string => {
  return obj ? `${obj.firstName} ${obj.lastName}` : '';
};

export const getFilterName = (filter: string): string => {
  const name = filter.split(':')[0];
  return name.split('_')[0];
};

export const getFilterValue = (filter: string): string => {
  return filter.split(':')[1];
};
