import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import BlogPostPreview from "./BlogPostPreview";

describe("BlogPostPreview Component", () => {
  const sampleBlogPost = {
    id: "123",
    userId: 1,
    datePosted: "2022-05-05 21:26:42",
    title: "Test Blog Post Title",
    body: "Test Blog Post Body Content",
  };

  test("1. renders blog post details correctly", () => {
    const mockOnBack = jest.fn();
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <BlogPostPreview
        blogPost={sampleBlogPost}
        onBack={mockOnBack}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    // verify that the title is rendered
    expect(screen.getByText("Test Blog Post Title")).toBeInTheDocument();

    // verify that the formatted date is rendered correctly.
    expect(
      screen.getByText("Date posted: 05/05/2022 09:26 pm"),
    ).toBeInTheDocument();

    // verify that the content is rendered
    expect(
      screen.getByText("Content: Test Blog Post Body Content"),
    ).toBeInTheDocument();

    // verify that all buttons are rendered
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  test("2. calls onBack when Back button is clicked", () => {
    const mockOnBack = jest.fn();
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <BlogPostPreview
        blogPost={sampleBlogPost}
        onBack={mockOnBack}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const backButton = screen.getByRole("button", { name: "Back" });
    fireEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  test("3. calls onEdit when Edit button is clicked", () => {
    const mockOnBack = jest.fn();
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <BlogPostPreview
        blogPost={sampleBlogPost}
        onBack={mockOnBack}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const editButton = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  test("4. calls onDelete when Delete button is clicked", () => {
    const mockOnBack = jest.fn();
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <BlogPostPreview
        blogPost={sampleBlogPost}
        onBack={mockOnBack}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />,
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
