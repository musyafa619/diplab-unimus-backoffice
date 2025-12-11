import api from '../axios';

export const health = () => api.get('/api/health').then((r) => r.data);
