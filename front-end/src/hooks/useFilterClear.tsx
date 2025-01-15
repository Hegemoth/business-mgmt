import { useEffect, useState } from 'react';
import { Filters } from '../types/api';

export const useFilterClear = (filters: Filters, filterName: string) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!filters.getFilterValueByName(filterName)) {
      setInputValue('');
    }
  }, [filters.current, filterName]);

  return [inputValue, setInputValue] as const;
};