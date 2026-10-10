import { Box, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";

import CustomDeleteModal from "../../common/CustomDeleteModal";
import CustomTable from "../../common/CustomTable";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectBlogPosts } from "../../redux/blog/blogSlice";
import {
  deleteUsers,
  selectUsers,
  selectUsersLoading,
} from "../../redux/user/userSlice";
import { UserListColumns } from "./columns/UsersList.columns";
import AddBlogPost from "./components/AddBlogPost";
import BlogPostsList from "./components/BlogPostsList";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const users = useTypedSelector(selectUsers);
  const blogPosts = useTypedSelector(selectBlogPosts);
  const isLoading = useTypedSelector(selectUsersLoading);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleOpenAddModal = useCallback((userId: number) => {
    setSelectedUserId(userId);
    setOpenAddModal(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setOpenAddModal(false);
    setSelectedUserId(null);
  }, []);

  const onDeleteUser = (event: React.MouseEvent, userId: number) => {
    event.stopPropagation();
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      dispatch(deleteUsers(selectedUserId));
    }
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  const tableColumns = useMemo(
    () =>
      UserListColumns({
        onDeleteUser,
        onAddPost: handleOpenAddModal,
      }),
    [handleOpenAddModal],
  );

  return (
    <>
      <Typography variant="h5">List of users</Typography>
      <CustomTable
        columns={tableColumns}
        data={users}
        enableFilters={true}
        enablePagination={true}
        enableSorting={true}
        isLoading={isLoading}
        renderDetailPanel={({ row }) => {
          const userId = row.original.id;
          const userBlogPosts = blogPosts.filter(
            (post) => post.userId === userId,
          );
          return (
            <Box margin={2}>
              <BlogPostsList data={userBlogPosts} />
            </Box>
          );
        }}
      />
      <CustomDeleteModal
        content="Are you sure you want to delete this user?"
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        open={isDeleteModalOpen}
        title="Delete User"
      />
      <AddBlogPost
        onClose={handleCloseAddModal}
        open={openAddModal}
        userId={selectedUserId ? selectedUserId : 0}
      />
    </>
  );
};

export default UsersList;
