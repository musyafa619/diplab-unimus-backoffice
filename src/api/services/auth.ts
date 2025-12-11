import api from '../axios';

export type AdminCreatePayload = { username: string; password: string };
export type LoginPayload = { username: string; password: string };

export const login = (payload: LoginPayload) =>
  api.post('/api/admin/login', payload).then((r) => r.data);

export const getMe = () => api.get('/api/admin/me').then((r) => r.data);

export const logout = () => api.post('/api/admin/logout').then((r) => r.data);
