import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { BlogPost, User } from "../../data/data";
import { setupStore } from "../../redux/store";
import UsersList from "./UsersList";

describe("UsersList Component", () => {
  const mockUsers: User[] = [
    {
      id: 657,
      first_name: "Tina",
      last_name: "Vannuchi",
      email: "tvannuchii8@e-recht24.de",
      gender: "Female",
    },
  ];

  const mockBlogPosts: BlogPost[] = [
    {
      id: "79c5eb93-c6ef-44ff-8699-f7802f6e8e04",
      userId: 657,
      datePosted: "2022-05-05T21:26:42Z",
      title: "Test Blog Post Title",
      body: "Test Blog Post Body Content",
    },
  ];

  test("1. Renders a table of all users", () => {
    const store = setupStore({
      user: {
        userList: mockUsers,
        isLoading: false,
      },
      blog: {
        blogPosts: [],
      },
      theme: {
        mode: "light",
      },
    });

    render(
      <Provider store={store}>
        <UsersList />
      </Provider>,
    );

    // verify table headers
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.queryByText("IP address")).not.toBeInTheDocument();

    // verify user data using more specific queries
    expect(screen.getByRole("cell", { name: "Tina" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Vannuchi" })).toBeInTheDocument();
  });

  test("2. Expands user row to show blog posts when clicked", async () => {
    const store = setupStore({
      user: {
        userList: mockUsers,
        isLoading: false,
      },
      blog: {
        blogPosts: mockBlogPosts,
      },
      theme: {
        mode: "light",
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <UsersList />
        </MemoryRouter>
      </Provider>,
    );

    // find the first expand button using DOM query
    const expandButton = container.querySelector('button[aria-label="Expand"]');

    if (!expandButton) {
      throw new Error("Expand button not found");
    }

    fireEvent.click(expandButton);

    await waitFor(() => {
      expect(screen.getByText("Test Blog Post Title")).toBeInTheDocument();
    });
  });

  test("3. Deletes a user from the table", async () => {
    const store = setupStore({
      user: {
        userList: mockUsers,
        isLoading: false,
      },
      blog: {
        blogPosts: [],
      },
      theme: {
        mode: "light",
      },
    });

    render(
      <Provider store={store}>
        <UsersList />
      </Provider>,
    );

    // verify user is initially present
    expect(screen.getByRole("cell", { name: "Tina" })).toBeInTheDocument();

    // find the table row that contains Tina
    const tinaRow = screen.getByRole("cell", { name: "Tina" }).closest("tr");
    if (!tinaRow) {
      throw new Error("Tina's row not found");
    }

    const deleteButton = screen.getByRole("button", { name: "Delete user" });

    if (!deleteButton) {
      throw new Error("Delete button not found for Tina");
    }

    // click the delete button to remove Tina
    fireEvent.click(deleteButton);

    // wait for the UI to update and confirm Tina is no longer in the document
    await waitFor(() => {
      expect(
        screen.queryByRole("cell", { name: "Tina" }),
      ).not.toBeInTheDocument();
    });
  });
});
