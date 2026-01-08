import type { Booking } from 'src/types/booking';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRowMui from '@mui/material/TableRow';

import { useRouter } from 'src/routes/hooks';

import { generateStatusColor } from 'src/utils/booking';

import { Label } from 'src/components/label';

type TableRowProps = {
  row: Booking;
};

export function TableRow({ row }: TableRowProps) {
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/bookings/${row.id}`);
  };

  return (
    <TableRowMui hover tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row">
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {row.id}
        </Box>
      </TableCell>

      <TableCell>{row?.student?.name}</TableCell>

      <TableCell>{row?.student?.email}</TableCell>

      <TableCell align="center">{row?.items?.length}</TableCell>

      <TableCell>
        <Label color={generateStatusColor(row.status)}>{row.status}</Label>
      </TableCell>

      <TableCell align="right">
        <Button variant="contained" onClick={handleDetail}>
          Detail
        </Button>
      </TableCell>
    </TableRowMui>
  );
}
