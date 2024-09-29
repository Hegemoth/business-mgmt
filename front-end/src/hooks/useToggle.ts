import { useState } from 'react';

export const useToggle = (init: boolean) => {
  const [value, setValue] = useState(init);

  const toggleValue = () => {
    setValue((prev) => !prev);
  };

  return [value, toggleValue] as const;
};
