import type { Booking } from 'src/types/booking';

export const generateStatusColor = (status?: Booking['status']) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'approved':
      return 'info';
    case 'rejected':
      return 'error';
    case 'finished':
      return 'success';
    default:
      return 'default';
  }
};
