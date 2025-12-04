import { CONFIG } from 'src/config-global';

import { ItemView } from 'src/sections/item/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Items - ${CONFIG.appName}`}</title>

      <ItemView />
    </>
  );
}
