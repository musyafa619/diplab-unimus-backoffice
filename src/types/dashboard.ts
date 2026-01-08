import type { Booking } from './booking';

export type Summary = {
  counts: {
    totalItems: number;
    totalBookings: number;
    totalStudents: number;
    totalMajors: number;
  };
  lastPendingBookings: Booking[];
};

export type SummaryResponse = {
  data: Summary;
};
