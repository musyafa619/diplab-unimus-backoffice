import api from '../axios';

export const createBooking = (payload: Record<string, any>) =>
  api.post('/api/admin/bookings', payload).then((r) => r.data);

export const listBookings = (params?: Record<string, any>) =>
  api.get('/api/admin/bookings', { params }).then((r) => r.data);

export const getBooking = (id: string) => api.get(`/api/admin/bookings/${id}`).then((r) => r.data);

export const updateBooking = (id: string, payload: Record<string, any>) =>
  api.put(`/api/admin/bookings/${id}`, payload).then((r) => r.data);

export const deleteBooking = (id: string) =>
  api.delete(`/api/admin/bookings/${id}`).then((r) => r.data);
