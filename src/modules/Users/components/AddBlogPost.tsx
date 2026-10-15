import dayjs from "dayjs";
import { FilePlus2 } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Button } from "../../../common/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../common/ui/dialog";
import { Input } from "../../../common/ui/input";
import { Textarea } from "../../../common/ui/textarea";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { createBlogPost } from "../../../redux/blog/blogSlice";

interface AddBlogPostProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly userId: number;
}

interface FormData {
  title: string;
  body: string;
}

const AddBlogPost: React.FC<AddBlogPostProps> = ({ open, onClose, userId }) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { title: "", body: "" },
  });

  const onSubmit = (data: FormData) => {
    const newPost = {
      id: uuidv4(),
      userId,
      title: data.title,
      body: data.body,
      datePosted: dayjs().toISOString(),
    };

    dispatch(createBlogPost(newPost));
    reset();
    onClose();
  };

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
      open={open}
    >
      <DialogContent>
        <DialogHeader>
          <span className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
            <FilePlus2 aria-hidden="true" className="h-5 w-5" />
          </span>
          <DialogTitle>Add a story</DialogTitle>
          <DialogDescription>
            Write something new to share with this person&apos;s community.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState: { error } }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="new-post-title">
                  Title
                </label>
                <Input
                  {...field}
                  aria-describedby={error ? "new-post-title-error" : undefined}
                  aria-invalid={Boolean(error)}
                  id="new-post-title"
                  placeholder="Give your story a title"
                />
                {error ? (
                  <p
                    className="text-sm text-destructive"
                    id="new-post-title-error"
                  >
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
                <label className="text-sm font-medium" htmlFor="new-post-body">
                  Content
                </label>
                <Textarea
                  {...field}
                  aria-describedby={error ? "new-post-body-error" : undefined}
                  aria-invalid={Boolean(error)}
                  id="new-post-body"
                  placeholder="What would you like to share?"
                  rows={5}
                />
                {error ? (
                  <p
                    className="text-sm text-destructive"
                    id="new-post-body-error"
                  >
                    {error.message}
                  </p>
                ) : null}
              </div>
            )}
            rules={{ required: "Content is required" }}
          />
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button onClick={onClose} size="sm" variant="outline">
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Add Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogPost;
