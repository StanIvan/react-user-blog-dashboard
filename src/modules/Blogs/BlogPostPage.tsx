import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import CustomDeleteModal from "../../common/CustomDeleteModal";
import CustomLoading from "../../common/CustomLoading";
import { BlogPost } from "../../data/data";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  removeBlogPost,
  selectBlogPosts,
  updateBlogPost,
} from "../../redux/blog/blogSlice";
import BlogPostPreview from "./components/BlogPostPreview";
import BlogPostUpdate from "./components/BlogPostUpdate";

const BlogPostPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const blogPosts = useTypedSelector(selectBlogPosts);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // simulate fetching data, this is just for example purpose and it is done a way better on users table
  useEffect(() => {
    // simulate async data fetching
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const blogPost = blogPosts.find((post: BlogPost) => post.id === id);

  if (isLoading) {
    return <CustomLoading message="Loading blog post..." />;
  }

  if (!blogPost) {
    return (
      <Box padding={2}>
        <Typography variant="h6">Blog post not found</Typography>
        <Button onClick={() => navigate("/users")} variant="contained">
          Back
        </Button>
      </Box>
    );
  }

  const handleSave: SubmitHandler<Omit<BlogPost, "id">> = async (data) => {
    try {
      await dispatch(updateBlogPost({ id: blogPost.id, data }));
      setIsEditing(false);
    } catch (error) {
      window.alert(`Failed to update blog post: ${error}`);
    }
  };

  const onDeleteBlog = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (blogPost) {
      try {
        await dispatch(removeBlogPost(blogPost.id));
        navigate("/users");
      } catch (error) {
        console.error("Failed to delete blog post:", error);
      }
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Box padding={2}>
      {isEditing ? (
        <BlogPostUpdate
          blogPost={blogPost}
          onCancel={() => setIsEditing(false)}
          onSave={handleSave}
        />
      ) : (
        <>
          <BlogPostPreview
            blogPost={blogPost}
            onBack={() => navigate("/users")}
            onDelete={onDeleteBlog}
            onEdit={() => setIsEditing(true)}
          />
          <CustomDeleteModal
            content="Are you sure you want to delete this blog post?"
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            open={isDeleteModalOpen}
            title="Delete Blog Post"
          />
        </>
      )}
    </Box>
  );
};

export default BlogPostPage;
