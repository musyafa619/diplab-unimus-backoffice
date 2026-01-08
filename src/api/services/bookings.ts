import api from '../axios';

export const createBooking = (payload: Record<string, any>) =>
  api.post('/api/admin/bookings', payload).then((r) => r.data);

export const getBookings = (params?: Record<string, any>) =>
  api.get('/api/admin/bookings', { params }).then((r) => r.data);

export const getBooking = (id: string) => api.get(`/api/admin/bookings/${id}`).then((r) => r.data);

export const updateStatusBooking = (id: string, payload: { status: 'rejected' | 'finished' }) =>
  api.put(`/api/admin/bookings/${id}/update-status`, payload).then((r) => r.data);

export const approveBooking = (
  id: string,
  payload: {
    items: {
      id: string;
      quantity: number;
    }[];
  }
) => api.put(`/api/admin/bookings/${id}/approve`, payload).then((r) => r.data);

export const deleteBooking = (id: string) =>
  api.delete(`/api/admin/bookings/${id}`).then((r) => r.data);
