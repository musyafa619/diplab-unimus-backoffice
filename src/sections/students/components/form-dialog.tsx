import type { Major, MajorListResponse } from 'src/types/major';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';

import { getMajors } from 'src/api/services/majors';
import { createStudent, updateStudent } from 'src/api/services/students';

type FormDialogProps = {
  open: boolean;
  onClose: () => void;
  initialData?: {
    id?: string;
    name?: string;
    nim?: string;
    phoneNumber?: string;
    email?: string;
    majorId?: string;
  } | null;
  onFinish?: () => void;
};

export function FormDialog({ open, onClose, onFinish, initialData = null }: FormDialogProps) {
  const [loading, setLoading] = useState(false);
  const [majors, setMajors] = useState<Major[]>([]);

  const { register, handleSubmit, reset, formState, control } = useForm<{
    name: string;
    nim: string;
    phoneNumber: string;
    email: string;
    majorId: string;
  }>({
    defaultValues: {
      name: '',
      nim: '',
      phoneNumber: '',
      email: '',
      majorId: '',
    },
  });

  const onSubmit = async (values: {
    name: string;
    nim: string;
    phoneNumber: string;
    email: string;
    majorId: string;
  }) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        nim: values.nim,
        phoneNumber: values.phoneNumber,
        email: values.email,
        majorId: values.majorId,
      };

      if (initialData?.id) {
        await updateStudent(initialData.id, payload);
      } else {
        await createStudent(payload);
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
    const fetchMajor = async () => {
      const res: MajorListResponse = await getMajors({
        page: 1,
        limit: Number.MAX_SAFE_INTEGER,
      });
      setMajors(res.data);
    };

    if (initialData) {
      reset({
        name: initialData.name ?? '',
        nim: initialData.nim ?? '',
        phoneNumber: initialData.phoneNumber ?? '',
        email: initialData.email ?? '',
        majorId: initialData.majorId ?? '',
      });
    } else {
      reset({ name: '', nim: '', phoneNumber: '', email: '', majorId: '' });
    }
    fetchMajor();
  }, [initialData, reset, open]);

  console.log('initialData', initialData, majors);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{ overflow: 'hidden' }}>
      <DialogTitle>{initialData ? 'Edit' : 'Tambah'} Mahasiswa</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nama"
              size="small"
              fullWidth
              {...register('name', { required: 'Nama wajib diisi' })}
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message?.toString()}
            />
          </Stack>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              size="small"
              fullWidth
              {...register('email', { required: 'Email wajib diisi' })}
              error={!!formState.errors.email}
              helperText={formState.errors.email?.message?.toString()}
            />
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <TextField
              label="NIM"
              size="small"
              fullWidth
              {...register('nim', { required: 'NIM jurusan wajib diisi' })}
              error={!!formState.errors.nim}
              helperText={formState.errors.nim?.message?.toString()}
            />
            <TextField
              label="Nomor Telepon"
              size="small"
              fullWidth
              {...register('phoneNumber', { required: 'Nomor Telepon wajib diisi' })}
              error={!!formState.errors.phoneNumber}
              helperText={formState.errors.phoneNumber?.message?.toString()}
            />
          </Stack>
          <Stack spacing={1} sx={{ mt: 2 }}>
            <FormControl
              variant="outlined"
              sx={{ m: 1, minWidth: 120 }}
              error={!!formState.errors.majorId}
            >
              <InputLabel id="major-select-label">Jurusan</InputLabel>
              <Controller
                name="majorId"
                control={control}
                rules={{ required: 'Jurusan wajib diisi' }}
                render={({ field }) => (
                  <Select
                    labelId="major-select-label"
                    label="Jurusan"
                    {...field}
                    value={field.value ?? ''}
                  >
                    {majors.map((major) => (
                      <MenuItem key={major.id} value={major.id}>
                        {major.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {formState.errors.majorId && (
                <FormHelperText error>
                  {formState.errors.majorId?.message?.toString()}
                </FormHelperText>
              )}
            </FormControl>
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
