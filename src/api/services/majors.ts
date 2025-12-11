import api from '../axios';

export const createMajor = (payload: Record<string, any>) =>
  api.post('/api/admin/majors', payload).then((r) => r.data);

export const listMajors = (params?: Record<string, any>) =>
  api.get('/api/admin/majors', { params }).then((r) => r.data);

export const getMajor = (id: string) => api.get(`/api/admin/majors/${id}`).then((r) => r.data);

export const updateMajor = (id: string, payload: Record<string, any>) =>
  api.put(`/api/admin/majors/${id}`, payload).then((r) => r.data);

export const deleteMajor = (id: string) =>
  api.delete(`/api/admin/majors/${id}`).then((r) => r.data);
