import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

import { BlogPost } from "../../../data/data";

interface BlogPostPreviewProps {
  readonly blogPost: BlogPost;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
  readonly onBack: () => void;
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({
  blogPost,
  onEdit,
  onDelete,
  onBack,
}) => (
  <Box marginTop={2}>
    <Typography sx={{ flexGrow: 1 }} variant="h5">
      {blogPost.title}
    </Typography>
    <Typography marginTop={2} variant="body1">
      Date posted:{" "}
      {dayjs(blogPost.datePosted, "YYYY-MM-DD HH:mm:ss").format(
        "DD/MM/YYYY hh:mm a",
      )}
    </Typography>
    <Typography marginTop={2} variant="body1">
      Content: {blogPost.body}
    </Typography>
    <Box alignItems="center" display="flex" justifyContent="end" marginTop={2}>
      <Button
        onClick={onBack}
        size="small"
        sx={{ marginRight: 1 }}
        variant="outlined"
      >
        Back
      </Button>
      <Button
        color="primary"
        onClick={onEdit}
        size="small"
        sx={{ marginRight: 1 }}
        variant="contained"
      >
        Edit
      </Button>
      <Button color="error" onClick={onDelete} size="small" variant="contained">
        Delete
      </Button>
    </Box>
  </Box>
);

export default BlogPostPreview;
