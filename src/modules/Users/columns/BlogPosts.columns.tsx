import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import dayjs from "dayjs";
import { MRT_Cell, MRT_ColumnDef, MRT_Row } from "material-react-table";
import React from "react";

import { BlogPost } from "../../../data/data";

interface BlogPostsColumnsProps {
  onDeleteBlog: (event: React.MouseEvent, id: string) => void;
  onPreviewBlog: (id: string) => void;
}

export const BlogPostsColumns = ({
  onDeleteBlog,
  onPreviewBlog,
}: BlogPostsColumnsProps): MRT_ColumnDef<BlogPost>[] => [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Date",
    accessorKey: "datePosted",
    Cell: ({ cell }: { cell: MRT_Cell<BlogPost> }) =>
      dayjs(cell.getValue<string>(), "YYYY-MM-DD HH:mm:ss").format(
        "DD/MM/YYYY hh:mm a",
      ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    Cell: ({ row }: { readonly row: MRT_Row<BlogPost> }) => (
      <Box alignItems="flex-end" display="flex" justifyContent="flex-center">
        <Button
          onClick={() => onPreviewBlog(row.original.id)}
          size="small"
          variant="outlined"
        >
          View Post
        </Button>
        <IconButton
          aria-label="Delete post"
          onClick={(event) => onDeleteBlog(event, row.original.id)}
          size="small"
        >
          <DeleteOutline color="error" />
        </IconButton>
      </Box>
    ),
  },
];
