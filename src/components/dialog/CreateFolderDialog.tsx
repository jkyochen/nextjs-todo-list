import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProgressButton from '../button/ProgressButton';
import { Box } from '@mui/material';

interface CreateFolderDialogProp {
  openDialog: boolean
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  loading: boolean
  toggleLoading: () => void
  handleAdd: () => Promise<void>
}

export default function CreateFolderDialog(props: CreateFolderDialogProp) {

  const handleClickOpen = () => {
    props.setOpenDialog(true);
  };

  const handleClose = () => {
    props.setInputValue("");
    props.setOpenDialog(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Folder
      </Button>
      <Dialog open={props.openDialog} onClose={handleClose}>
        <DialogTitle>Create Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create new folder for to-do list.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            type="text"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={props.inputValue}
            onChange={e => props.setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Box onClick={props.handleAdd}>
            <ProgressButton loading={props.loading} toggleLoading={props.toggleLoading}>
              Create
            </ProgressButton>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
