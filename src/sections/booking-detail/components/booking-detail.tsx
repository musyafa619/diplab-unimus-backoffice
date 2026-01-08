import type { Booking } from 'src/types/booking';

import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Stack, Button, Divider, Typography } from '@mui/material';

import { generateStatusColor } from 'src/utils/booking';

import { approveBooking, updateStatusBooking } from 'src/api/services/bookings';

import { Label } from 'src/components/label';
import { useConfirm } from 'src/components/confirmation-dialog/confirm-context';

import BookingItems from './booking-items';

type BookingDetailProps = {
  booking?: Booking;
  refetchBooking: () => void;
};

export default function BookingDetail({ booking, refetchBooking }: BookingDetailProps) {
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();

  const [items, setItems] = useState<Booking['items']>(booking?.items || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setItems(booking?.items || []);
  }, [booking]);

  const handleRejectBooking = async () => {
    const confirmReject = await confirm({
      title: 'Tolak peminjaman?',
      description: 'Apakah anda yakin menolak peminjaman ini?',
    });

    if (confirmReject) {
      try {
        setIsLoading(true);
        await updateStatusBooking(booking?.id as string, { status: 'rejected' });
        enqueueSnackbar('Peminjaman berhasil ditolak', { variant: 'success' });
        setIsLoading(false);
        refetchBooking();
      } catch {
        enqueueSnackbar('Gagal menerima peminjaman', { variant: 'error' });
        setIsLoading(false);
      }
    }
  };

  const handleApproveBooking = async () => {
    const confirmApprove = await confirm({
      title: 'Terima peminjaman?',
      description: 'Apakah anda yakin menerima peminjaman ini?',
    });

    if (confirmApprove) {
      try {
        setIsLoading(true);
        await approveBooking(booking?.id as string, { items });
        enqueueSnackbar('Peminjaman berhasil ditolak', { variant: 'success' });
        setIsLoading(false);
        refetchBooking();
      } catch {
        enqueueSnackbar('Gagal menolak peminjaman', { variant: 'error' });
        setIsLoading(false);
      }
    }
  };

  const handleFinishBooking = async () => {
    const confirmReject = await confirm({
      title: 'Selesaikan peminjaman?',
      description: 'Apakah anda yakin menyelesaikan peminjaman ini?',
    });

    if (confirmReject) {
      try {
        setIsLoading(true);
        await updateStatusBooking(booking?.id as string, { status: 'finished' });
        enqueueSnackbar('Peminjaman berhasil diselesaikan', { variant: 'success' });
        setIsLoading(false);
        refetchBooking();
      } catch {
        enqueueSnackbar('Gagal menyelesaikan peminjaman', { variant: 'error' });
        setIsLoading(false);
      }
    }
  };

  const allItemsQtyZero = items.every((item) => item.quantity === 0);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Typography variant="h6">Detail Pesanan</Typography>
            <Label color={generateStatusColor(booking?.status)}>{booking?.status}</Label>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2">Catatan</Typography>
            <Box>
              <Typography variant="body2">{booking?.note || 'Tidak ada catatan'}</Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <BookingItems booking={booking} items={items} setItems={setItems} />
            {['pending', 'approved'].indexOf(booking?.status as string) !== -1 && (
              <Divider sx={{ my: 4 }} />
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 2 }}>
              {booking?.status === 'pending' && (
                <Button
                  loading={isLoading}
                  variant="contained"
                  color="error"
                  onClick={handleRejectBooking}
                >
                  Tolak Peminjaman
                </Button>
              )}

              {booking?.status === 'pending' && (
                <Button
                  onClick={handleApproveBooking}
                  loading={isLoading}
                  variant="contained"
                  disabled={allItemsQtyZero}
                >
                  Terima Peminjaman
                </Button>
              )}

              {booking?.status === 'approved' && (
                <Button loading={isLoading} variant="contained" onClick={handleFinishBooking}>
                  Selesaikan Peminjaman
                </Button>
              )}
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
