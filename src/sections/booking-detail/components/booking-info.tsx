import type { Booking } from 'src/types/booking';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

type BookingInfoProps = {
  booking?: Booking;
};

export default function BookingInfo({ booking }: BookingInfoProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Data Pesanan</Typography>
          <Typography variant="body1">{booking?.id}</Typography>

          <Grid container spacing={1}>
            <Grid size={6}>
              <Typography variant="subtitle2">Mulai Sewa</Typography>
              <Typography variant="body2">
                {new Date(booking?.startDate as string).toLocaleString()}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2">Pengembalian</Typography>
              <Typography variant="body2">
                {new Date(booking?.endDate as string).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid size={6}>
              <Typography variant="subtitle2">Dibuat Pada</Typography>
              <Typography variant="body2">
                {new Date(booking?.createdAt as string).toLocaleString()}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2">Terakhir Diupdate</Typography>
              <Typography variant="body2">
                {new Date(booking?.updatedAt as string).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
