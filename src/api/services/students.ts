import api from '../axios';

export const createStudent = (payload: Record<string, any>) =>
  api.post('/api/admin/students', payload).then((res) => res.data);

export const getStudents = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  orderBy?: string;
}) => api.get('/api/admin/students', { params }).then((res) => res.data);

export const getStudent = (id: string) =>
  api.get(`/api/admin/students/${id}`).then((res) => res.data);

export const updateStudent = (id: string, payload: Record<string, any>) =>
  api.put(`/api/admin/students/${id}`, payload).then((res) => res.data);

export const deleteStudent = (id: string) =>
  api.delete(`/api/admin/students/${id}`).then((res) => res.data);
