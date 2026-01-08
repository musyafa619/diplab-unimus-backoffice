import 'src/global.css';

import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';

import { usePathname, AuthProvider } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';

import { ConfirmProvider } from 'src/components/confirmation-dialog/confirm-context';

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <ConfirmProvider>{children}</ConfirmProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
