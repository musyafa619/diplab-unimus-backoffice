import { useState } from 'react';

import { Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ItemTableToolbarProps = {
  onSearchKeyword: (keyword: string) => void;
};

export function ItemTableToolbar({ onSearchKeyword }: ItemTableToolbarProps) {
  const [keyword, setKeyword] = useState('');
  return (
    <Toolbar
      sx={{
        height: 96,
        gap: 2,
        display: 'flex',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <OutlinedInput
        size="small"
        fullWidth
        value={keyword}
        onChange={(value) => setKeyword(value.target.value)}
        placeholder="Cari alat..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
        sx={{ maxWidth: 320 }}
      />
      <Button onClick={() => onSearchKeyword(keyword)} variant="contained" color="inherit">
        Cari
      </Button>
    </Toolbar>
  );
}
