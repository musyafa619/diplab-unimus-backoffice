import type { Summary, SummaryResponse } from 'src/types/dashboard';

import { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { getDashboardSummary } from 'src/api/services/dashboard';

import { AnalyticsTasks } from '../components/analytics-tasks';
import { AnalyticsWidgetSummary } from '../components/analytics-widget-summary';

export function OverviewAnalyticsView() {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardSummary, setDashboardSummary] = useState<Summary | null>(null);

  const fetchDashboardSummary = useCallback(async () => {
    setIsLoading(true);
    const res: SummaryResponse = await getDashboardSummary();

    setDashboardSummary(res.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDashboardSummary();
  }, [fetchDashboardSummary]);

  console.log(dashboardSummary);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Admin
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Alat"
            total={dashboardSummary?.counts?.totalItems || 0}
            icon={<img alt="Weekly sales" src="/assets/icons/glass/ic-glass-bag.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Penyewaan"
            total={dashboardSummary?.counts?.totalBookings || 0}
            color="secondary"
            icon={<img alt="New users" src="/assets/icons/glass/ic-glass-users.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Jurusan"
            total={dashboardSummary?.counts?.totalMajors || 0}
            color="warning"
            icon={<img alt="Purchase orders" src="/assets/icons/glass/ic-glass-buy.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Mahasiswa"
            total={dashboardSummary?.counts?.totalStudents || 0}
            color="error"
            icon={<img alt="Messages" src="/assets/icons/glass/ic-glass-message.svg" />}
          />
        </Grid>

        <Grid size={24}>
          <AnalyticsTasks
            title="Peminjaman Terbaru"
            list={dashboardSummary?.lastPendingBookings || []}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
