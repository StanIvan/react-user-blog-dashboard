import dayjs from "dayjs";
import { Eye, Trash2 } from "lucide-react";
import React from "react";

import { TableColumn } from "../../../common/CustomTable";
import { Button } from "../../../common/ui/button";
import { BlogPost } from "../../../data/data";

interface BlogPostsColumnsProps {
  onDeleteBlog: (event: React.MouseEvent, id: string) => void;
  onPreviewBlog: (id: string) => void;
}

export const BlogPostsColumns = ({
  onDeleteBlog,
  onPreviewBlog,
}: BlogPostsColumnsProps): TableColumn<BlogPost>[] => [
  {
    id: "title",
    header: "Title",
    cell: (post) => <span className="font-medium">{post.title}</span>,
    sortValue: (post) => post.title,
  },
  {
    id: "datePosted",
    header: "Date",
    cell: (post) =>
      dayjs(post.datePosted, "YYYY-MM-DD HH:mm:ss").format(
        "DD/MM/YYYY hh:mm a",
      ),
    sortValue: (post) => post.datePosted,
  },
  {
    id: "actions",
    header: "Actions",
    className: "text-right",
    cell: (post) => (
      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={(event) => {
            event.stopPropagation();
            onPreviewBlog(post.id);
          }}
          size="sm"
          variant="outline"
        >
          <Eye aria-hidden="true" className="h-3.5 w-3.5" />
          View Post
        </Button>
        <Button
          aria-label="Delete post"
          className="text-destructive hover:text-destructive"
          onClick={(event) => onDeleteBlog(event, post.id)}
          size="icon"
          variant="ghost"
        >
          <Trash2 aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
