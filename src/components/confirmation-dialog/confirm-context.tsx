import React, { useState, useContext, useCallback, createContext } from 'react';

import ConfirmationDialog from './index';

type ConfirmOptions = {
  title?: string;
  description?: string;
  okText?: string;
  cancelText?: string;
};

type ConfirmFn = (opts?: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((opts = {}) => {
    setOptions(opts);
    setOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (resolver) {
      resolver(false);
      setResolver(null);
    }
  }, [resolver]);

  const handleOk = useCallback(() => {
    setOpen(false);
    if (resolver) {
      resolver(true);
      setResolver(null);
    }
  }, [resolver]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        title={options.title ?? 'Konfirmasi'}
        description={options.description ?? 'Apakah Anda yakin?'}
        onOk={handleOk}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = (): ConfirmFn => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used within ConfirmProvider');
  return ctx;
};

export default ConfirmContext;
