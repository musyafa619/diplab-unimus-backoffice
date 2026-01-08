import { CONFIG } from 'src/config-global';

import { NotFoundView } from 'src/sections/not-found/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`404 page not found! | Error - ${CONFIG.appName}`}</title>

      <NotFoundView />
    </>
  );
}
