import { CONFIG } from 'src/config-global';

import { LoginView } from 'src/sections/login/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Login - ${CONFIG.appName}`}</title>

      <LoginView />
    </>
  );
}
