import api from '../axios';

export const createStudent = (payload: Record<string, any>) =>
  api.post('/api/admin/students', payload).then((r) => r.data);

export const listStudents = (params?: Record<string, any>) =>
  api.get('/api/admin/students', { params }).then((r) => r.data);

export const getStudent = (id: string) => api.get(`/api/admin/students/${id}`).then((r) => r.data);

export const updateStudent = (id: string, payload: Record<string, any>) =>
  api.put(`/api/admin/students/${id}`, payload).then((r) => r.data);

export const deleteStudent = (id: string) =>
  api.delete(`/api/admin/students/${id}`).then((r) => r.data);
