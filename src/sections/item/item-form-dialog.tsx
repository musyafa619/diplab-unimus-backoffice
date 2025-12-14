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
  onCreated?: (item: any) => void;
  // initialData for edit mode (optional)
  initialData?: {
    id?: string;
    name?: string;
    quantity?: number | string;
    imageUrl?: string | null;
  } | null;
  // called after create or update
  onSaved?: (item: any) => void;
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

export function ItemFormDialog({ open, onClose, onCreated, initialData = null, onSaved }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState, setValue } = useForm<{
    name: string;
    quantity: string;
    image?: FileList | null;
  }>({
    defaultValues: {
      name: '',
      quantity: '1',
    },
  });

  // populate form when editing
  useEffect(() => {
    if (initialData) {
      reset({ name: initialData.name ?? '', quantity: String(initialData.quantity ?? '1') });
      setPreview(initialData.imageUrl ?? null);
    } else {
      reset({ name: '', quantity: '1' });
      setPreview(null);
      setFile(null);
    }
  }, [initialData, reset]);

  // create/revoke object URL for selected file
  useEffect(() => {
    if (!file) return undefined;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onSubmit = async (values: { name: string; quantity: string }) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', values.name);
      fd.append('quantity', values.quantity || '1');
      if (file) fd.append('image', file);

      let saved;
      if (initialData?.id) {
        saved = await ItemsService.updateItem(initialData.id, fd);
      } else {
        saved = await ItemsService.createItem(fd);
      }

      // compatible callback for older uses
      onCreated?.(saved);
      onSaved?.(saved);
      onClose();

      // reset form only in create mode
      if (!initialData) {
        reset({ name: '', quantity: '1' });
        setFile(null);
        setPreview(null);
      }
    } catch (err) {
      console.error('save item failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Tambah Alat</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nama Alat"
              fullWidth
              {...register('name', { required: 'Nama alat wajib diisi' })}
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message?.toString()}
            />

            <TextField
              label="Jumlah"
              type="number"
              fullWidth
              {...register('quantity', {
                required: 'Jumlah wajib diisi',
                validate: (v: string) => (Number(v) > 0 ? true : 'Jumlah harus lebih dari 0'),
              })}
              error={!!formState.errors.quantity}
              helperText={formState.errors.quantity?.message?.toString()}
            />
            <div
              style={{
                height: 200,
                width: '100%',
                border: `1px dashed ${formState.errors.image ? 'red' : '#ccc'}`,
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
                  {...register('image', {
                    validate: (v) => (file || initialData?.imageUrl ? true : 'Gambar wajib diisi'),
                  })}
                  onChange={(e) => {
                    const newFile = e.target.files?.[0] ?? null;
                    setFile(newFile);
                    setValue('image', e.target.files ?? null, { shouldValidate: true });
                  }}
                />
              </label>
            </div>
            {formState.errors.image && (
              <div style={{ color: '#d32f2f', fontSize: 12, marginTop: 6 }}>
                {String(formState.errors.image.message)}
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

export default ItemFormDialog;
