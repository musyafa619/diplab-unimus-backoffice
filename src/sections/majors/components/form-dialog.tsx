import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { createMajor, updateMajor } from 'src/api/services/majors';

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: {
    id?: string;
    name?: string;
  } | null;
  onFinish?: () => void;
};

export function FormDialog({ open, onClose, onFinish, initialData = null }: Props) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState } = useForm<{
    name: string;
  }>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
      };

      if (initialData?.id) {
        await updateMajor(initialData.id, payload);
      } else {
        await createMajor(payload);
      }

      // compatible callback for older uses
      onFinish?.();
      onClose();
    } catch (err) {
      console.error('save major failed', err);
    } finally {
      setLoading(false);
    }
  };

  // populate form when editing
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? '',
      });
    } else {
      reset({ name: '' });
    }
  }, [initialData, reset, open]);

  console.log('render FormDialog', { initialData });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{ overflow: 'hidden' }}>
      <DialogTitle>{initialData ? 'Edit' : 'Tambah'} Jurusan</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nama Jurusan"
              size="small"
              fullWidth
              {...register('name', { required: 'Nama jurusan wajib diisi' })}
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message?.toString()}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button
          variant="contained"
          onClick={() => void handleSubmit(onSubmit)()}
          disabled={loading || formState.isSubmitting}
        >
          {loading || formState.isSubmitting ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
