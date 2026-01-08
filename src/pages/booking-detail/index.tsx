import { CONFIG } from 'src/config-global';

import { BookingDetailView } from 'src/sections/booking-detail/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Booking Detail - ${CONFIG.appName}`}</title>

      <BookingDetailView />
    </>
  );
}
