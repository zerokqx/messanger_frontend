import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { SelecteContext } from '../model/context';
import type { SelecteContextTypes } from '../types/context.type';

export const SelecedProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<string>('init');
  const setSelectFn = useCallback<SelecteContextTypes['setSelected']>((key) => {
    setId(key);
  }, []);
  const value = useMemo<SelecteContextTypes>(
    () => ({
      id,
      setSelected: setSelectFn,
    }),
    [id, setSelectFn]
  );

  return <SelecteContext value={value}>{children}</SelecteContext>;
};
