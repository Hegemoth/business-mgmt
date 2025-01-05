import { useState } from 'react';
import { ModalMode } from '../types/enums';

export const useModalMode = <T>() => {
  const [modalMode, setModalMode] = useState(ModalMode.CLOSED);
  const [modalValues, setValues] = useState<T | null>(null);

  const setMode = (mode: ModalMode, values?: T) => {
    setModalMode(mode);

    if (mode === ModalMode.CLOSED) {
      setTimeout(() => setValues(null), 0);
    } else {
      setValues(values || null);
    }
  };

  return [modalMode, setMode, modalValues] as const;
};
