import React, { FC } from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

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
  <Dialog
    onOpenChange={(isOpen) => {
      if (!isOpen) {
        onClose();
      }
    }}
    open={open}
  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{content}</DialogDescription>
      </DialogHeader>
      <div className="flex justify-end gap-2">
        <Button onClick={onClose} size="sm" variant="outline">
          Cancel
        </Button>
        <Button autoFocus onClick={onConfirm} size="sm" variant="destructive">
          Delete
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default CustomDeleteModal;
