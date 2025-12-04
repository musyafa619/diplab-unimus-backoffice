import { CONFIG } from 'src/config-global';

import { BookingView } from 'src/sections/booking/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Bookings - ${CONFIG.appName}`}</title>

      <BookingView />
    </>
  );
}
