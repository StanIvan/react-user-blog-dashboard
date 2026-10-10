import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import { setupStore } from "../../../redux/store";
import AddBlogPost from "./AddBlogPost";

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("mock-uuid"),
}));

describe("AddBlogPost Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render form fields", () => {
    render(
      <Provider store={setupStore({})}>
        <AddBlogPost onClose={() => {}} open={true} userId={1} />
      </Provider>,
    );

    // check if form fields are rendered
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  });

  test("should show validation errors when submitting with empty fields", async () => {
    render(
      <Provider store={setupStore({})}>
        <AddBlogPost onClose={() => {}} open={true} userId={1} />
      </Provider>,
    );

    const addButton = screen.getByRole("button", { name: /add post/i });
    fireEvent.click(addButton);

    // wait for validation error messages
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/content is required/i)).toBeInTheDocument();
    });
  });

  test("should submit the form and dispatch createBlogPost", async () => {
    const store = setupStore({
      blog: { blogPosts: [] }, // empty blog posts list for testing
    });

    render(
      <Provider store={store}>
        <AddBlogPost onClose={() => {}} open={true} userId={1} />
      </Provider>,
    );

    // fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Blog Post Title" },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: "This is the body of the new blog post." },
    });

    const addButton = screen.getByRole("button", { name: /add post/i });
    fireEvent.click(addButton);

    // check if createBlogPost action is dispatched
    await waitFor(() => {
      jest.mock("../../../redux/blog/blogSlice", () => ({
        addBlogPost: jest.fn().mockReturnValue({
          type: "blog/addBlogPost",
          payload: {
            id: "mock-uuid",
            userId: 1,
            title: "New Blog Post Title",
            body: "This is the body of the new blog post.",
            datePosted: expect.any(String),
          },
        }),
      }));
    });
  });

  test("should reset form and close modal on submit", async () => {
    const onCloseMock = jest.fn();
    render(
      <Provider store={setupStore({})}>
        <AddBlogPost onClose={onCloseMock} open={true} userId={1} />
      </Provider>,
    );

    // fill out the form and submit
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Blog Post Title" },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: "This is the body of the new blog post." },
    });

    const addButton = screen.getByRole("button", { name: /add post/i });
    fireEvent.click(addButton);

    // check if the modal is closed
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    // check if form is reset
    expect((screen.getByLabelText(/title/i) as HTMLInputElement).value).toBe(
      "",
    );
    expect(
      (screen.getByLabelText(/content/i) as HTMLTextAreaElement).value,
    ).toBe("");
  });
});
