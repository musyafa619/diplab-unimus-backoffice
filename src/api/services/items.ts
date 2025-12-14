import api from '../axios';

export const createItem = (formData: FormData) =>
  api
    .post('/api/admin/items', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);

export const getItems = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  orderBy?: string;
}) => api.get('/api/admin/items', { params }).then((res) => res.data);

export const getItem = (id: string) => api.get(`/api/admin/items/${id}`).then((res) => res.data);

export const updateItem = (id: string, formData: FormData) =>
  api
    .put(`/api/admin/items/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);

export const deleteItem = (id: string) =>
  api.delete(`/api/admin/items/${id}`).then((res) => res.data);
