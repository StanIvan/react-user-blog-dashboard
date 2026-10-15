import dayjs from "dayjs";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import React from "react";

import { Button } from "../../../common/ui/button";
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
  <article className="overflow-hidden rounded-3xl border bg-card shadow-soft">
    <div className="h-2 bg-gradient-to-r from-primary/70 via-primary to-primary/40" />
    <div className="p-6 sm:p-10">
      <button
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Return to people
      </button>
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          A story from your community
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {blogPost.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Date posted:{" "}
          {dayjs(blogPost.datePosted, "YYYY-MM-DD HH:mm:ss").format(
            "DD/MM/YYYY hh:mm a",
          )}
        </p>
        <div className="my-8 h-px bg-border" />
        <div>
          <p className="whitespace-pre-wrap text-base leading-8 text-foreground/90">
            Content: {blogPost.body}
          </p>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap justify-end gap-2 border-t pt-6">
        <Button onClick={onBack} size="sm" variant="outline">
          Back
        </Button>
        <Button onClick={onEdit} size="sm" variant="outline">
          <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button onClick={onDelete} size="sm" variant="destructive">
          <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  </article>
);

export default BlogPostPreview;
