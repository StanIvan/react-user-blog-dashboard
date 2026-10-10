import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { BlogPost } from "../../../data/data";
import { setupStore } from "../../../redux/store";
import BlogPostsList from "./BlogPostsList";

// mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("BlogPostsList Component", () => {
  const mockBlogPost: BlogPost = {
    id: "test-blog-123",
    userId: 657,
    datePosted: "2023-01-01T00:00:00Z",
    title: "Test Blog Post",
    body: "Test Blog Post Content",
  };

  test("1. Clicking blog post row navigates to blog post page", () => {
    const store = setupStore({
      blog: {
        blogPosts: [mockBlogPost],
      },
      user: {
        userList: [],
        isLoading: false,
      },
      theme: {
        mode: "light",
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <BlogPostsList data={[mockBlogPost]} />
        </MemoryRouter>
      </Provider>,
    );

    // find the blog post title cell and click
    const blogButtonView = screen.getByRole("button", { name: /View post/i });
    fireEvent.click(blogButtonView);

    expect(mockNavigate).toHaveBeenCalledWith(`/blog/${mockBlogPost.id}`);
  });

  test("2. Deleting blog post from table removes it", async () => {
    const store = setupStore({
      blog: {
        blogPosts: [mockBlogPost],
      },
      user: {
        userList: [],
        isLoading: false,
      },
      theme: {
        mode: "light",
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <BlogPostsList data={[mockBlogPost]} />
        </MemoryRouter>
      </Provider>,
    );

    // click delete button
    const deleteButton = screen.getByRole("button", { name: "Delete post" });
    fireEvent.click(deleteButton);

    // confirm deletion in modal
    const confirmButton = await screen.findByRole("button", {
      name: /delete/i,
    });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      jest.mock("../../../redux/blog/blogSlice", () => ({
        removeBlogPost: jest.fn().mockReturnValue({
          type: "blog/removeBlogPost",
          payload: mockBlogPost.id,
        }),
      }));
      expect(store.getState().blog.blogPosts).toHaveLength(0);
    });
  });
});
