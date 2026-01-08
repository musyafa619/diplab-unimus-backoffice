import type { Meta } from './common';
import type { ItemWithQuantity } from './item';

export type Booking = {
  id: string;
  student: {
    id: string;
    name: string;
    email: string;
    nim: string;
    phoneNumber: string;
    major: {
      id: string;
      name: string;
    };
  };
  items: ItemWithQuantity[];
  status: 'pending' | 'approved' | 'rejected' | 'finished';
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  note: string;
};

export type BookingListResponse = {
  data: Booking[];
  meta: Meta;
};
