import type { Booking } from 'src/types/booking';
import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import { Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: Booking[];
};

export function AnalyticsTasks({ title, subheader, list, sx, ...other }: Props) {
  const [selected, setSelected] = useState(['2']);

  const handleClickComplete = (taskId: string) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar sx={{ minHeight: 304 }}>
        <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} sx={{ minWidth: 560 }}>
          {list.map((item) => (
            <TaskItem
              key={item.id}
              item={item}
              selected={selected.includes(item.id)}
              onChange={() => handleClickComplete(item.id)}
            />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type TaskItemProps = BoxProps & {
  selected: boolean;
  item: Booking;
  onChange: (id: string) => void;
};

function TaskItem({ item, selected, onChange, sx, ...other }: TaskItemProps) {
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/bookings/${item.id}`);
  };
  return (
    <Box
      sx={[
        () => ({
          pl: 3,
          pr: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          ...(selected && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 1,
        }}
      >
        <Iconify icon="lucide:newspaper" color="white" />
      </Box>

      <Stack spacing={0} sx={{ width: '100%' }}>
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          ID: {item.id}
        </Typography>
        <Typography variant="caption" sx={{ flexGrow: 1 }}>
          Peminjaman {item?.items?.length} Item, atas nama {item?.student?.name}
        </Typography>
      </Stack>

      <Button onClick={handleDetail} variant="contained">
        Detail
      </Button>
    </Box>
  );
}
