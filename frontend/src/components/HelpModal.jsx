import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function MyHelpModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button  onClick={handleClickOpen} startIcon={<HelpOutlineOutlinedIcon />}>
        
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Csv structure
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            The first thing is to make sure it is a file with a csv extension.
          </Typography>
          <Typography gutterBottom>
            After completing the first step you must take into account its structure, 
            in this case the names must be separated by commas.
          </Typography>
          <Typography gutterBottom>
            For a better experience you can open an excel and the first column can put 
            all the names in that column but the first row of it has to contain the word (name) in English 
            complying with these rules the system will not throw any error regarding the importation of the file.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            ok
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}