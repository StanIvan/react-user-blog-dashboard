import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { FC } from "react";

interface CustomDeleteModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly title: string;
  readonly content: string;
}

const CustomDeleteModal: FC<CustomDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
}) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{content}</DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose} size="small" variant="outlined">
        Cancel
      </Button>
      <Button
        autoFocus
        color="error"
        onClick={onConfirm}
        size="small"
        variant="contained"
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default CustomDeleteModal;
