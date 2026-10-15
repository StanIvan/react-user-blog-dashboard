import { BookOpen, UsersRound } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

import CustomDeleteModal from "../../common/CustomDeleteModal";
import CustomTable from "../../common/CustomTable";
import { cn } from "../../common/ui/cn";
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
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-card via-card to-secondary/70 p-6 shadow-soft sm:p-9">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Your workspace
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              People &amp; stories
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Keep your community close and explore the stories they share.
              Select a person to see their posts.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="min-w-32 rounded-2xl border bg-card/80 px-4 py-3">
              <div className="flex items-center gap-2 text-primary">
                <UsersRound aria-hidden="true" className="h-4 w-4" />
                <span className="text-xs font-medium text-muted-foreground">
                  People
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold">{users.length}</p>
            </div>
            <div className="min-w-32 rounded-2xl border bg-card/80 px-4 py-3">
              <div className="flex items-center gap-2 text-primary">
                <BookOpen aria-hidden="true" className="h-4 w-4" />
                <span className="text-xs font-medium text-muted-foreground">
                  Stories
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold">{blogPosts.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">All people</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search, sort, and manage your community.
            </p>
          </div>
          <p
            className={cn(
              "text-sm text-muted-foreground",
              isLoading && "sr-only",
            )}
          >
            Choose a row to reveal its stories
          </p>
        </div>
        <CustomTable
          columns={tableColumns}
          data={users}
          enableFilters
          enablePagination
          enableSorting
          getRowId={(user) => user.id}
          isLoading={isLoading}
          renderDetailPanel={(user) => {
            const userBlogPosts = blogPosts.filter(
              (post) => post.userId === user.id,
            );
            return <BlogPostsList data={userBlogPosts} />;
          }}
        />
      </section>

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
    </div>
  );
};

export default UsersList;
