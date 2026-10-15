import { Trash2 } from "lucide-react";
import React from "react";

import { TableColumn } from "../../../common/CustomTable";
import { Button } from "../../../common/ui/button";
import { User } from "../../../data/data";

interface UserListColumnsProps {
  onDeleteUser: (event: React.MouseEvent, id: number) => void;
  onAddPost: (id: number) => void;
}

export const UserListColumns = ({
  onDeleteUser,
  onAddPost,
}: UserListColumnsProps): TableColumn<User>[] => [
  {
    id: "id",
    header: "ID",
    cell: (user) => user.id,
    sortValue: (user) => user.id,
  },
  {
    id: "first_name",
    header: "First Name",
    cell: (user) => (
      <span className="font-medium text-foreground">{user.first_name}</span>
    ),
    sortValue: (user) => user.first_name,
  },
  {
    id: "last_name",
    header: "Last Name",
    cell: (user) => user.last_name,
    sortValue: (user) => user.last_name,
  },
  {
    id: "email",
    header: "Email",
    cell: (user) => <span className="text-muted-foreground">{user.email}</span>,
    sortValue: (user) => user.email,
  },
  {
    id: "gender",
    header: "Gender",
    cell: (user) => (
      <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
        {user.gender}
      </span>
    ),
    sortValue: (user) => user.gender,
  },
  {
    id: "actions",
    header: "Actions",
    className: "text-right",
    cell: (user) => (
      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={(event) => {
            event.stopPropagation();
            onAddPost(user.id);
          }}
          size="sm"
          variant="outline"
        >
          Add Post
        </Button>
        <Button
          aria-label="Delete user"
          className="text-destructive hover:text-destructive"
          onClick={(event) => onDeleteUser(event, user.id)}
          size="icon"
          variant="ghost"
        >
          <Trash2 aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
