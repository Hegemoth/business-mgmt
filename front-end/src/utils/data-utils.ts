import { toast } from 'react-toastify';
import { Unit } from '../types/enums';

export const getUnit = (unit: Unit): string => {
  const units = {
    [Unit.UN]: 'szt.',
    [Unit.KG]: 'kg',
    [Unit.L]: 'l',
  };

  return units[unit];
};

export const getFullName = (obj: {
  firstName: string;
  lastName: string;
}): string => {
  return `${obj.firstName} ${obj.lastName}`;
};

export const toastErr = (): void => {
  toast.error('Coś poszło nie tak');
};
