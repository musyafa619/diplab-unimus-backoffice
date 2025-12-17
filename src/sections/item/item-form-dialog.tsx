import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import * as ItemsService from 'src/api/services/items';

import { Iconify } from 'src/components/iconify';

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: {
    id?: string;
    name?: string;
    description?: string;
    quantity?: number | string;
    imageUrl?: string | null;
  } | null;
  onFinish?: () => void;
};

const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
  border: 0,
  padding: 0,
});

export function ItemFormDialog({ open, onClose, onFinish, initialData = null }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState, setValue } = useForm<{
    name: string;
    description: string;
    quantity: string;
    imageUrl: string;
  }>({
    defaultValues: {
      name: '',
      description: '',
      quantity: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: { name: string; quantity: string; description: string }) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', values.name);
      fd.append('quantity', values.quantity);
      fd.append('description', values.description);
      if (file) fd.append('image', file);

      if (initialData?.id) {
        await ItemsService.updateItem(initialData.id, fd);
      } else {
        await ItemsService.createItem(fd);
      }

      // compatible callback for older uses
      onFinish?.();
      onClose();
    } catch (err) {
      console.error('save item failed', err);
    } finally {
      setLoading(false);
    }
  };

  // populate form when editing
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? '',
        description: initialData.description ?? '',
        quantity: String(initialData.quantity ?? ''),
        imageUrl: initialData.imageUrl ?? '',
      });
      setPreview(initialData.imageUrl ?? null);
    } else {
      reset({ name: '', description: '', quantity: '', imageUrl: '' });
      setPreview(null);
      setFile(null);
    }
  }, [initialData, reset, open]);

  // create/revoke object URL for selected file
  useEffect(() => {
    if (!file) return undefined;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setValue('imageUrl', url, { shouldValidate: true });
    return () => URL.revokeObjectURL(url);
  }, [file, setValue]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{ overflow: 'hidden' }}>
      <DialogTitle>{initialData ? 'Edit' : 'Tambah'} Alat</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nama Alat"
              size="small"
              fullWidth
              {...register('name', { required: 'Nama alat wajib diisi' })}
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message?.toString()}
            />

            <TextField
              label="Jumlah"
              type="number"
              size="small"
              fullWidth
              {...register('quantity', {
                required: 'Jumlah wajib diisi',
                validate: (v: string) => (Number(v) > 0 ? true : 'Jumlah harus lebih dari 0'),
              })}
              error={!!formState.errors.quantity}
              helperText={formState.errors.quantity?.message?.toString()}
            />
            <TextField
              label="Deskripsi Alat"
              size="small"
              multiline
              rows={4}
              fullWidth
              {...register('description', { required: 'Deskripsi alat wajib diisi' })}
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message?.toString()}
            />
            <div
              style={{
                height: 200,
                width: '100%',
                border: `1px dashed ${formState.errors.imageUrl ? 'red' : '#ccc'}`,
                padding: 8,
                borderRadius: 12,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Gambar Alat"
                  style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div
                  style={{
                    color: '#666',
                    fontSize: 13,
                    fontWeight: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <Iconify icon="lucide:cloud-upload" width={50} />
                  Upload Gambar
                </div>
              )}

              <label style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}>
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  {...register('imageUrl', {
                    validate: (v) => (file || initialData?.imageUrl ? true : 'Gambar wajib diisi'),
                  })}
                  onChange={(e) => {
                    const newFile = e.target.files?.[0] ?? null;
                    setFile(newFile);
                  }}
                />
              </label>
            </div>
            {formState.errors.imageUrl && (
              <div style={{ color: '#d32f2f', fontSize: 12, marginTop: 6 }}>
                {String(formState.errors.imageUrl.message)}
              </div>
            )}
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
