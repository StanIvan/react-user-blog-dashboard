import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { createBlogPost } from "../../../redux/blog/blogSlice";

interface AddBlogPostProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly userId: number;
}

interface FormData {
  title: string;
  body: string;
}

const AddBlogPost: React.FC<AddBlogPostProps> = ({ open, onClose, userId }) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { title: "", body: "" },
  });

  const onSubmit = (data: FormData) => {
    const newPost = {
      id: uuidv4(),
      userId,
      title: data.title,
      body: data.body,
      datePosted: dayjs().toISOString(),
    };

    dispatch(createBlogPost(newPost));
    reset();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add Blog Post</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={Boolean(error)}
                fullWidth
                helperText={error ? error.message : ""}
                label="Title"
                margin="normal"
              />
            )}
            rules={{ required: "Title is required" }}
          />
          <Controller
            control={control}
            name="body"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={Boolean(error)}
                fullWidth
                helperText={error ? error.message : ""}
                label="Content"
                margin="normal"
                multiline
                rows={4}
              />
            )}
            rules={{ required: "Content is required" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} size="small" variant="outlined">
            Cancel
          </Button>
          <Button
            autoFocus
            color="primary"
            disableRipple
            size="small"
            type="submit"
            variant="contained"
          >
            Add Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddBlogPost;
