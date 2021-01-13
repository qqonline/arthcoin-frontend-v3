import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      color: 'white',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    minWidth: 400,
  },
  dividers: {
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
}))(MuiDialogContent);
interface props {
  children: React.ReactNode;
  title?: string;
  handleClose?: Function;
  open?: boolean;
}
const CustomizedDialogs: React.FC<props> = ({ children, title, handleClose, open }) => {
  const [openModal, setOpen] = React.useState(open);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
        classes={{
          paper: 'custom-dialog-class'
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
          {title}
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
export default CustomizedDialogs;
