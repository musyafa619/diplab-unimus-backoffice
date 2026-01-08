import type { Booking } from 'src/types/booking';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

interface StudentInfoProps {
  student?: Booking['student'];
}

export default function StudentInfo({ student }: StudentInfoProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Data Mahasiswa</Typography>
          <Typography variant="body1">{student?.id}</Typography>

          <Grid container spacing={1}>
            <Grid size={6}>
              <Typography variant="subtitle2">Nama</Typography>
              <Typography variant="body2">{student?.name}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2">NIM & Prodi</Typography>
              <Typography variant="body2">
                {student?.nim} - {student?.major?.name}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid size={6}>
              <Typography variant="subtitle2">Nomor Telepon</Typography>
              <Typography variant="body2">{student?.phoneNumber}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2">Email</Typography>
              <Typography variant="body2">{student?.email}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
