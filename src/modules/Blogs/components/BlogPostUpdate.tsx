import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { BlogPost } from "../../../data/data";

interface BlogPostUpdateProps {
  readonly blogPost: BlogPost;
  readonly onCancel: () => void;
  readonly onSave: SubmitHandler<Omit<BlogPost, "id">>;
}

const BlogPostUpdate: React.FC<BlogPostUpdateProps> = ({
  blogPost,
  onCancel,
  onSave,
}) => {
  const { handleSubmit, control } = useForm<Omit<BlogPost, "id">>({
    defaultValues: {
      title: blogPost.title,
      body: blogPost.body,
      datePosted: blogPost.datePosted,
      userId: blogPost.userId,
    },
  });

  const onSubmit = (data: Omit<BlogPost, "id">) => {
    onSave({
      ...data,
      datePosted: blogPost.datePosted,
      userId: blogPost.userId,
    });
  };

  return (
    <>
      <Typography variant="h5">Edit blog</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Body"
              margin="normal"
              multiline
              rows={8}
            />
          )}
          rules={{ required: "Content is required" }}
        />
        <Box
          alignItems="center"
          display="flex"
          justifyContent="end"
          marginTop={2}
        >
          <Button
            onClick={onCancel}
            size="small"
            sx={{ marginRight: 1 }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            autoFocus
            color="primary"
            disableRipple
            size="small"
            sx={{ marginRight: 1 }}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogPostUpdate;
