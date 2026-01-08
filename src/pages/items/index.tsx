import { CONFIG } from 'src/config-global';

import { ItemView } from 'src/sections/items/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Alat - ${CONFIG.appName}`}</title>

      <ItemView />
    </>
  );
}
