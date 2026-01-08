import { CONFIG } from 'src/config-global';

import { StudentView } from 'src/sections/students/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Mahasiswa - ${CONFIG.appName}`}</title>

      <StudentView />
    </>
  );
}
