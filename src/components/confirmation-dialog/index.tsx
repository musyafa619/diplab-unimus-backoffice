import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onOk?: () => void;
};

export default function ConfirmationDialog({
  open,
  onClose,
  onOk,
  title,
  description,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" sx={{ overflow: 'hidden' }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {description}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={onOk}>
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}
