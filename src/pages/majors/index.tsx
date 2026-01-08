import { CONFIG } from 'src/config-global';

import { MajorView } from 'src/sections/majors/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Jurusan - ${CONFIG.appName}`}</title>

      <MajorView />
    </>
  );
}
