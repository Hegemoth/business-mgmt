import { Unit } from '../types/enums';

export const getUnit = (unit: Unit): string => {
  const units = {
    [Unit.UN]: 'szt.',
    [Unit.KG]: 'kg',
    [Unit.L]: 'l',
  };

  return units[unit];
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
  return filter.split(':')[0];
};

export const getFilterValue = (filter: string): string => {
  return filter.split(':')[1];
};
