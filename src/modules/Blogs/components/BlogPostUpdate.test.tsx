import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { BlogPost } from "../../../data/data";
import BlogPostUpdate from "./BlogPostUpdate";

describe("BlogPostUpdate", () => {
  const initialBlogPost: BlogPost = {
    id: "1",
    title: "Original Title",
    body: "Original Body",
    datePosted: "2023-01-01",
    userId: 1,
  };

  const mockOnCancel = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("reflects UI changes when editing title and body", () => {
    render(
      <BlogPostUpdate
        blogPost={initialBlogPost}
        onCancel={mockOnCancel}
        onSave={mockOnSave}
      />,
    );

    // get the input fields
    const titleInput = screen.getByLabelText("Title") as HTMLInputElement;
    const bodyInput = screen.getByLabelText("Body") as HTMLInputElement;

    // check initial values
    expect(titleInput.value).toBe(initialBlogPost.title);
    expect(bodyInput.value).toBe(initialBlogPost.body);

    // simulate user changing the inputs
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(bodyInput, { target: { value: "Updated Body" } });

    // assert the inputs reflect the new values
    expect(titleInput.value).toBe("Updated Title");
    expect(bodyInput.value).toBe("Updated Body");
  });

  it("calls onSave with updated data when submitted", async () => {
    render(
      <BlogPostUpdate
        blogPost={initialBlogPost}
        onCancel={mockOnCancel}
        onSave={mockOnSave}
      />,
    );

    // change the inputs
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByLabelText("Body"), {
      target: { value: "New Body" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save" }));
    });

    expect(mockOnSave).toHaveBeenCalledWith({
      title: "New Title",
      body: "New Body",
      datePosted: initialBlogPost.datePosted,
      userId: initialBlogPost.userId,
    });
  });
});
