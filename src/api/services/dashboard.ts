import api from '../axios';

export const getDashboardSummary = () =>
  api.get('/api/admin/dashboard/summary').then((r) => r.data);
