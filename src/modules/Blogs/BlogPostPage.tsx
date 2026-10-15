import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import CustomDeleteModal from "../../common/CustomDeleteModal";
import CustomLoading from "../../common/CustomLoading";
import { Button } from "../../common/ui/button";
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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const blogPost = blogPosts.find((post: BlogPost) => post.id === id);

  if (isLoading) {
    return <CustomLoading message="Loading blog post..." />;
  }

  if (!blogPost) {
    return (
      <section className="mx-auto max-w-xl rounded-3xl border bg-card p-8 text-center shadow-soft">
        <h1 className="text-2xl font-semibold">Blog post not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This story may have been removed or the link may be incorrect.
        </p>
        <Button className="mt-6" onClick={() => navigate("/users")} size="sm">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back
        </Button>
      </section>
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

  return (
    <div className="mx-auto max-w-5xl">
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
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            open={isDeleteModalOpen}
            title="Delete Blog Post"
          />
        </>
      )}
    </div>
  );
};

export default BlogPostPage;
