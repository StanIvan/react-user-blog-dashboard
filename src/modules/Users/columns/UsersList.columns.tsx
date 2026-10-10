import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import React from "react";

import { User } from "../../../data/data";

interface UserListColumnsProps {
  onDeleteUser: (event: React.MouseEvent, id: number) => void;
  onAddPost: (id: number) => void;
}

export const UserListColumns = ({
  onDeleteUser,
  onAddPost,
}: UserListColumnsProps): MRT_ColumnDef<User>[] => [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "first_name", header: "First Name" },
  { accessorKey: "last_name", header: "Last Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "gender", header: "Gender" },
  {
    accessorKey: "actions",
    header: "Actions",
    Cell: ({ row }: { readonly row: MRT_Row<User> }) => (
      <Box alignItems="flex-end" display="flex" justifyContent="flex-center">
        <Button
          onClick={() => onAddPost(row.original.id)}
          size="small"
          variant="outlined"
        >
          Add Post
        </Button>
        <IconButton
          aria-label="Delete user"
          onClick={(event) => onDeleteUser(event, row.original.id)}
          size="small"
        >
          <DeleteOutline color="error" />
        </IconButton>
      </Box>
    ),
  },
];
