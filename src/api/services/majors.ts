import api from '../axios';

export const createMajor = (payload: Record<string, any>) =>
  api.post('/api/admin/majors', payload).then((res) => res.data);

export const getMajors = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  orderBy?: string;
}) => api.get('/api/admin/majors', { params }).then((res) => res.data);

export const getMajor = (id: string) => api.get(`/api/admin/majors/${id}`).then((res) => res.data);

export const updateMajor = (id: string, payload: Record<string, any>) =>
  api.put(`/api/admin/majors/${id}`, payload).then((res) => res.data);

export const deleteMajor = (id: string) =>
  api.delete(`/api/admin/majors/${id}`).then((res) => res.data);
