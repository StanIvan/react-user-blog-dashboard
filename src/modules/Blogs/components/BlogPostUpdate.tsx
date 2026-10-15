import { ArrowLeft, Save } from "lucide-react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../../common/ui/button";
import { Input } from "../../../common/ui/input";
import { Textarea } from "../../../common/ui/textarea";
import { BlogPost } from "../../../data/data";

interface BlogPostUpdateProps {
  readonly blogPost: BlogPost;
  readonly onCancel: () => void;
  readonly onSave: SubmitHandler<Omit<BlogPost, "id">>;
}

const BlogPostUpdate: React.FC<BlogPostUpdateProps> = ({
  blogPost,
  onCancel,
  onSave,
}) => {
  const { handleSubmit, control } = useForm<Omit<BlogPost, "id">>({
    defaultValues: {
      title: blogPost.title,
      body: blogPost.body,
      datePosted: blogPost.datePosted,
      userId: blogPost.userId,
    },
  });

  const onSubmit = (data: Omit<BlogPost, "id">) => {
    onSave({
      ...data,
      datePosted: blogPost.datePosted,
      userId: blogPost.userId,
    });
  };

  return (
    <section className="mx-auto max-w-3xl rounded-3xl border bg-card p-6 shadow-soft sm:p-10">
      <button
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={onCancel}
        type="button"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Cancel editing
      </button>
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Update your story
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Edit blog
        </h1>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="blog-title">
                Title
              </label>
              <Input
                {...field}
                aria-describedby={error ? "blog-title-error" : undefined}
                aria-invalid={Boolean(error)}
                id="blog-title"
                placeholder="Give your story a title"
              />
              {error ? (
                <p className="text-sm text-destructive" id="blog-title-error">
                  {error.message}
                </p>
              ) : null}
            </div>
          )}
          rules={{ required: "Title is required" }}
        />
        <Controller
          control={control}
          name="body"
          render={({ field, fieldState: { error } }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="blog-body">
                Body
              </label>
              <Textarea
                {...field}
                aria-describedby={error ? "blog-body-error" : undefined}
                aria-invalid={Boolean(error)}
                className="min-h-56 resize-y leading-7"
                id="blog-body"
                placeholder="Share the details..."
              />
              {error ? (
                <p className="text-sm text-destructive" id="blog-body-error">
                  {error.message}
                </p>
              ) : null}
            </div>
          )}
          rules={{ required: "Content is required" }}
        />
        <div className="flex justify-end gap-2 border-t pt-5">
          <Button onClick={onCancel} size="sm" variant="outline">
            Cancel
          </Button>
          <Button size="sm" type="submit">
            <Save aria-hidden="true" className="h-3.5 w-3.5" />
            Save
          </Button>
        </div>
      </form>
    </section>
  );
};

export default BlogPostUpdate;
