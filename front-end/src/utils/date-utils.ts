import { format } from 'date-fns';
import { DateType } from '../types/shared';

export const toIntlDate = (date: DateType, locale?: string, opts?: any): string => {
  if (!(typeof date === 'string' || date instanceof Date)) {
    return '---';
  }

  return new Intl.DateTimeFormat(locale, opts).format(new Date(date));
};

export const toApiFormatDate = (date: DateType, dateFnsModifier?: (x: Date) => Date): string => {
  const dateObj = new Date(date);

  if (dateFnsModifier) {
    return format(dateFnsModifier(dateObj), 'yyyy-MM-dd');
  }

  return format(dateObj, 'yyyy-MM-dd');
};

export const toApiFormatDateMonths = (date: DateType): string => {
  return format(new Date(date), 'yyyy-MM');
};

export const toHumanReadableDateMonths = (date: DateType): string => {
  return `${toIntlDate(new Date(date), 'pl', {
    month: 'long',
    year: 'numeric',
  })}`;
};

export const apiToHumanMonth = (dateStr: string): string => {
  const [y, m] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, 1);

  return toHumanReadableDateMonths(date);
};
