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

  const handleClearSearch = () => {
    setKeyword('');
    onSearchKeyword('');
  };
  return (
    <Toolbar
      sx={{
        height: 96,
        gap: 2,
        display: 'flex',
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
            <Iconify width={20} icon="lucide:search" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            position="start"
            style={{ cursor: 'pointer' }}
            onClick={handleClearSearch}
          >
            <Iconify width={20} icon="lucide:x" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
        sx={{ maxWidth: 320, padding: '0px 6px 0px 12px' }}
      />
      <Button onClick={() => onSearchKeyword(keyword)} variant="contained" color="inherit">
        Cari
      </Button>
    </Toolbar>
  );
}
