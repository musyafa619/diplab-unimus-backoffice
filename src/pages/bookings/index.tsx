import { CONFIG } from 'src/config-global';

import { BookingView } from 'src/sections/bookings/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Bookings - ${CONFIG.appName}`}</title>

      <BookingView />
    </>
  );
}
