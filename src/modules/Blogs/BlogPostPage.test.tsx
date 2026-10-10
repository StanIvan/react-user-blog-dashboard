import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { BlogPost } from "../../data/data";
import { setupStore } from "../../redux/store";
import BlogPostPage from "./BlogPostPage";

describe("BlogPostPage Component", () => {
  const mockBlogPost: BlogPost = {
    id: "79c5eb93-c6ef-44ff-8699-f7802f6e8e04",
    userId: 657,
    datePosted: "2023-01-01T00:00:00Z",
    title: "Test Blog Post",
    body: "Test Blog Post Content",
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("1. Back button navigates to users list", async () => {
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
          initialEntries={[`/blog/${mockBlogPost.id}`]}
        >
          <Routes>
            <Route element={<BlogPostPage />} path="/blog/:id" />
            <Route element={<div>Users List</div>} path="/users" />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // fast-forward loading timer
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(
        screen.queryByText("Loading blog post..."),
      ).not.toBeInTheDocument();
    });

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText("Users List")).toBeInTheDocument();
    });
  });

  test("2. Deleting a blog post navigates to users list and removes it from store", async () => {
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
          initialEntries={[`/blog/${mockBlogPost.id}`]}
        >
          <Routes>
            <Route element={<BlogPostPage />} path="/blog/:id" />
            <Route element={<div>Users List</div>} path="/users" />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // fast-forward loading timer
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(
        screen.queryByText("Loading blog post..."),
      ).not.toBeInTheDocument();
    });

    // open delete modal
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    // confirm deletion
    const confirmButton = await screen.findByRole("button", {
      name: /delete/i,
    });
    fireEvent.click(confirmButton);

    // verify navigation and store update
    await waitFor(() => {
      expect(screen.getByText("Users List")).toBeInTheDocument();
      const state = store.getState().blog.blogPosts;
      expect(state).not.toContainEqual(mockBlogPost);
    });
  });
});
