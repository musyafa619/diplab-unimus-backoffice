import api from '../axios';

export const createItem = (formData: FormData) =>
  api
    .post('/api/admin/items', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data);

export const listItems = (params?: Record<string, any>) =>
  api.get('/api/admin/items', { params }).then((r) => r.data);

export const getItem = (id: string) => api.get(`/api/admin/items/${id}`).then((r) => r.data);

export const updateItem = (id: string, formData: FormData) =>
  api
    .put(`/api/admin/items/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data);

export const deleteItem = (id: string) => api.delete(`/api/admin/items/${id}`).then((r) => r.data);
