import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { _tasks } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Admin
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Alat"
            total={714000}
            icon={<img alt="Weekly sales" src="/assets/icons/glass/ic-glass-bag.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Penyewaan"
            total={1352831}
            color="secondary"
            icon={<img alt="New users" src="/assets/icons/glass/ic-glass-users.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Penyewaan Berlangsung"
            total={1723315}
            color="warning"
            icon={<img alt="Purchase orders" src="/assets/icons/glass/ic-glass-buy.svg" />}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Penyewaan Jatuh Tempo"
            total={234}
            color="error"
            icon={<img alt="Messages" src="/assets/icons/glass/ic-glass-message.svg" />}
          />
        </Grid>

        <Grid size={24}>
          <AnalyticsTasks title="Peminjaman Terbaru" list={_tasks} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
