import type { Booking } from 'src/types/booking';
import type { ItemWithQuantity } from 'src/types/item';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

function ItemRow({
  item,
  maxQty,
  onChange,
  disabled,
}: {
  maxQty: number;
  item: ItemWithQuantity;
  onChange: (qty: number) => void;
  disabled?: boolean;
}) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={10}>
        <Stack direction="row" spacing={2} alignItems="center">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: 56, height: 56, objectFit: 'contain' }}
            />
          ) : (
            <Box sx={{ width: 56, height: 56, bgcolor: 'grey.100' }} />
          )}
          <Typography variant="body2">{item.name}</Typography>
        </Stack>
      </Grid>

      <Grid size={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <IconButton disabled={disabled || item.quantity <= 0}>
            <Iconify
              icon="lucide:minus"
              width={20}
              height={20}
              onClick={() => {
                onChange(item.quantity - 1);
              }}
            />
          </IconButton>
          <Typography variant="body2" sx={{ mx: 1 }}>
            {item.quantity}
          </Typography>
          <IconButton disabled={disabled || item.quantity >= maxQty}>
            <Iconify
              icon="lucide:plus"
              cursor="pointer"
              width={20}
              height={20}
              onClick={() => {
                onChange(item.quantity + 1);
              }}
            />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

type BookingItemsProps = {
  booking?: Booking;
  setItems: React.Dispatch<React.SetStateAction<ItemWithQuantity[]>>;
  items: ItemWithQuantity[];
};

export default function BookingItems({ booking, setItems, items }: BookingItemsProps) {
  const updateQty = (index: number, qty: number) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, quantity: qty } : it)));
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2">Daftar Alat</Typography>

      <Stack spacing={1}>
        {items.map((it, idx) => {
          const maxQty = booking?.items.find((bi) => bi.id === it.id)?.quantity || 0;
          return (
            <Box key={idx}>
              <ItemRow
                disabled={booking?.status !== 'pending'}
                item={it}
                onChange={(qty) => updateQty(idx, qty)}
                maxQty={maxQty}
              />
              {items.length - 1 !== idx && <Divider sx={{ my: 1 }} />}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}
