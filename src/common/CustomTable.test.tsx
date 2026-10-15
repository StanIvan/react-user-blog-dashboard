import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";

import CustomTable, { TableColumn } from "./CustomTable";

interface Person {
  id: number;
  name: string;
}

const columns: TableColumn<Person>[] = [
  { id: "id", header: "ID", cell: (person) => person.id },
  {
    id: "name",
    header: "Name",
    cell: (person) => person.name,
    sortValue: (person) => person.name,
  },
];

describe("CustomTable", () => {
  it("filters rows and sorts the matching results", () => {
    render(
      <CustomTable
        columns={columns}
        data={[
          { id: 1, name: "Zoe" },
          { id: 2, name: "Ada" },
          { id: 3, name: "Alex" },
        ]}
        enableFilters
        enableSorting
      />,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Search users" }), {
      target: { value: "a" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Name" }));

    const rows = screen.getAllByRole("row");
    expect(within(rows[1]).getByRole("cell", { name: "Ada" })).toBeVisible();
    expect(within(rows[2]).getByRole("cell", { name: "Alex" })).toBeVisible();
    expect(screen.queryByRole("cell", { name: "Zoe" })).not.toBeInTheDocument();
  });

  it("paginates through the complete row set", () => {
    render(
      <CustomTable
        columns={columns}
        data={Array.from({ length: 12 }, (_, index) => ({
          id: index + 1,
          name: `Person ${index + 1}`,
        }))}
        enablePagination
      />,
    );

    expect(screen.getByRole("cell", { name: "Person 10" })).toBeInTheDocument();
    expect(
      screen.queryByRole("cell", { name: "Person 11" }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next page" }));

    expect(screen.getByRole("cell", { name: "Person 11" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Person 12" })).toBeInTheDocument();
  });

  it("jumps to the entered page and changes the page size", () => {
    render(
      <CustomTable
        columns={columns}
        data={Array.from({ length: 60 }, (_, index) => ({
          id: index + 1,
          name: `Person ${index + 1}`,
        }))}
        enablePagination
      />,
    );

    const pageInput = screen.getByRole("spinbutton", { name: "Go to page" });
    fireEvent.change(pageInput, { target: { value: "3" } });
    fireEvent.keyDown(pageInput, { key: "Enter", code: "Enter" });

    expect(screen.getByRole("cell", { name: "Person 21" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Person 30" })).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox", { name: "Rows per page" }), {
      target: { value: "25" },
    });

    expect(screen.getByRole("cell", { name: "Person 1" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Person 25" })).toBeInTheDocument();
    expect(
      screen.queryByRole("cell", { name: "Person 26" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("of 3")).toBeInTheDocument();
  });
});
