import { toast } from 'react-toastify';

export const toastErr = (): void => {
  toast.error('Coś poszło nie tak');
};
