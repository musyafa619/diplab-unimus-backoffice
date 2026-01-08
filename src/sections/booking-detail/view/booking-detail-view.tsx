// import { useParams } from 'react-router-dom';

import type { Booking } from 'src/types/booking';

import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { getBooking } from 'src/api/services/bookings';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import BookingInfo from '../components/booking-info';
import StudentInfo from '../components/student-info';
import BookingDetail from '../components/booking-detail';

export function BookingDetailView() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking>();
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const fetchBookingDetail = useCallback(async () => {
    setIsLoading(true);
    const data = await getBooking(id as string);
    setBooking(data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBookingDetail();
    }
  }, [id, fetchBookingDetail]);

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Iconify
          onClick={handleBack}
          icon="lucide:arrow-left"
          width={24}
          height={24}
          sx={{ cursor: 'pointer', marginRight: 2 }}
        />
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Detail Peminjaman
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <StudentInfo student={booking?.student} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BookingInfo booking={booking} />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <BookingDetail booking={booking} refetchBooking={fetchBookingDetail} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
