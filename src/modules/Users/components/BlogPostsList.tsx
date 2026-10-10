import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomDeleteModal from "../../../common/CustomDeleteModal";
import CustomTable from "../../../common/CustomTable";
import { BlogPost } from "../../../data/data";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { removeBlogPost } from "../../../redux/blog/blogSlice";
import { BlogPostsColumns } from "../columns/BlogPosts.columns";

interface BlogPostsTableProps {
  readonly data: BlogPost[];
}

const BlogPostsList = ({ data }: BlogPostsTableProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogIdToDelete, setBlogIdToDelete] = useState<string | null>(null);

  const onPreviewBlog = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  const onDeleteBlog = (event: React.MouseEvent, blogId: string) => {
    event.stopPropagation();
    setBlogIdToDelete(blogId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (blogIdToDelete) {
      dispatch(removeBlogPost(blogIdToDelete));
    }
    setIsModalOpen(false);
    setBlogIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setBlogIdToDelete(null);
  };

  const tableColumns = useMemo(
    () =>
      BlogPostsColumns({
        onDeleteBlog,
        onPreviewBlog,
      }),
    [],
  );

  return (
    <>
      <CustomTable
        columns={tableColumns}
        data={data}
        enablePagination={false}
        enableSorting={false}
        enableTopToolbar={false}
      />
      <CustomDeleteModal
        content="Are you sure you want to delete this blog post?"
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        open={isModalOpen}
        title="Delete Blog Post"
      />
    </>
  );
};

export default BlogPostsList;
