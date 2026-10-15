import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Search,
} from "lucide-react";
import React, { type ReactNode, useEffect, useMemo, useState } from "react";

import { Button } from "./ui/button";
import { cn } from "./ui/cn";
import { Input } from "./ui/input";

export interface TableColumn<T> {
  readonly id: string;
  readonly header: string;
  readonly cell: (row: T) => ReactNode;
  readonly sortValue?: (row: T) => string | number;
  readonly className?: string;
}

interface CommonTableProps<T> {
  readonly columns: TableColumn<T>[];
  readonly data: T[];
  readonly isLoading?: boolean;
  readonly enablePagination?: boolean;
  readonly enableSorting?: boolean;
  readonly enableFilters?: boolean;
  readonly enableTopToolbar?: boolean;
  readonly getRowId?: (row: T) => string | number;
  readonly renderDetailPanel?: (row: T) => ReactNode;
}

const CommonTable = <T,>({
  columns,
  data,
  isLoading = false,
  enablePagination = false,
  enableSorting = false,
  enableFilters = false,
  enableTopToolbar = true,
  getRowId,
  renderDetailPanel,
}: CommonTableProps<T>) => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<{ id: string; descending: boolean } | null>(
    null,
  );
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageInput, setPageInput] = useState("1");
  const [expandedRow, setExpandedRow] = useState<string | number | null>(null);

  const filteredData = useMemo(() => {
    const normalizedFilter = filter.trim().toLocaleLowerCase();
    const matches = normalizedFilter
      ? data.filter((row) =>
          Object.values(row as Record<string, unknown>)
            .filter(
              (value): value is string | number =>
                typeof value === "string" || typeof value === "number",
            )
            .some((value) =>
              String(value).toLocaleLowerCase().includes(normalizedFilter),
            ),
        )
      : data;

    if (!sort) {
      return matches;
    }

    const column = columns.find(({ id }) => id === sort.id);
    if (!column?.sortValue) {
      return matches;
    }

    return [...matches].sort((left, right) => {
      const leftValue = column.sortValue?.(left);
      const rightValue = column.sortValue?.(right);
      const comparison =
        typeof leftValue === "number" && typeof rightValue === "number"
          ? leftValue - rightValue
          : String(leftValue ?? "").localeCompare(String(rightValue ?? ""));
      return sort.descending ? -comparison : comparison;
    });
  }, [columns, data, filter, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);

  useEffect(() => {
    setPageInput(String(currentPage + 1));
  }, [currentPage]);

  const visibleData = enablePagination
    ? filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    : filteredData;
  const toggleRow = (row: T, index: number) => {
    const id = getRowId?.(row) ?? index;
    setExpandedRow((current) => (current === id ? null : id));
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setPage(0);
  };

  const handlePageInputCommit = () => {
    const requestedPage = Number(pageInput);
    const nextPage = Number.isFinite(requestedPage)
      ? Math.min(pageCount, Math.max(1, Math.trunc(requestedPage)))
      : currentPage + 1;
    setPage(nextPage - 1);
    setPageInput(String(nextPage));
  };

  return (
    <section className="overflow-hidden rounded-2xl border bg-card shadow-soft">
      {enableTopToolbar && enableFilters ? (
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              aria-label="Search users"
              className="pl-9"
              onChange={(event) => handleFilterChange(event.target.value)}
              placeholder="Search users..."
              value={filter}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {filteredData.length}{" "}
            {filteredData.length === 1 ? "record" : "records"}
          </p>
        </div>
      ) : null}
      <div className="w-full overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="bg-muted/70 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr className="border-b">
              {renderDetailPanel ? (
                <th className="w-12 px-4 py-3" scope="col">
                  <span className="sr-only">Expand details</span>
                </th>
              ) : null}
              {columns.map((column) => (
                <th
                  aria-sort={
                    sort?.id === column.id
                      ? sort.descending
                        ? "descending"
                        : "ascending"
                      : undefined
                  }
                  className={cn("px-4 py-3", column.className)}
                  key={column.id}
                  scope="col"
                >
                  {enableSorting && column.sortValue ? (
                    <button
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                      onClick={() => {
                        setSort((current) =>
                          current?.id === column.id
                            ? { id: column.id, descending: !current.descending }
                            : { id: column.id, descending: false },
                        );
                      }}
                      type="button"
                    >
                      {column.header}
                      {sort?.id === column.id ? (
                        sort.descending ? (
                          <ChevronDown
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                          />
                        ) : (
                          <ChevronUp
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                          />
                        )
                      ) : (
                        <ChevronsUpDown
                          aria-hidden="true"
                          className="h-3.5 w-3.5 opacity-60"
                        />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  className="px-4 py-10 text-center text-muted-foreground"
                  colSpan={columns.length + (renderDetailPanel ? 1 : 0)}
                >
                  Loading...
                </td>
              </tr>
            ) : visibleData.length ? (
              visibleData.map((row, index) => {
                const rowId = getRowId?.(row) ?? index;
                const isExpanded = expandedRow === rowId;
                return (
                  <React.Fragment key={rowId}>
                    <tr
                      className={cn(
                        "border-b transition-colors last:border-0 hover:bg-muted/40",
                        renderDetailPanel && "cursor-pointer",
                      )}
                      onClick={
                        renderDetailPanel
                          ? () => toggleRow(row, index)
                          : undefined
                      }
                    >
                      {renderDetailPanel ? (
                        <td className="w-12 px-4 py-3">
                          <button
                            aria-expanded={isExpanded}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleRow(row, index);
                            }}
                            type="button"
                          >
                            {isExpanded ? (
                              <ChevronDown
                                aria-hidden="true"
                                className="h-4 w-4"
                              />
                            ) : (
                              <ChevronRight
                                aria-hidden="true"
                                className="h-4 w-4"
                              />
                            )}
                          </button>
                        </td>
                      ) : null}
                      {columns.map((column) => (
                        <td
                          className={cn("px-4 py-3.5", column.className)}
                          key={column.id}
                        >
                          {column.cell(row)}
                        </td>
                      ))}
                    </tr>
                    {isExpanded && renderDetailPanel ? (
                      <tr className="border-b bg-muted/30">
                        <td className="px-5 py-5" colSpan={columns.length + 1}>
                          {renderDetailPanel(row)}
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td
                  className="px-4 py-12 text-center text-muted-foreground"
                  colSpan={columns.length + (renderDetailPanel ? 1 : 0)}
                >
                  {filter
                    ? "No matching records found."
                    : "No records to display."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {enablePagination ? (
        <div className="flex flex-col gap-4 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Rows per page
              <select
                aria-label="Rows per page"
                className="h-9 rounded-lg border border-input bg-card px-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(0);
                }}
                value={pageSize}
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <label htmlFor="table-page-input">Page</label>
              <Input
                aria-label="Go to page"
                className="h-9 w-16 px-2 text-center"
                id="table-page-input"
                max={pageCount}
                min={1}
                onBlur={handlePageInputCommit}
                onChange={(event) => setPageInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handlePageInputCommit();
                    event.currentTarget.blur();
                  }
                }}
                type="number"
                value={pageInput}
              />
              <span>of {pageCount}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredData.length}{" "}
              {filteredData.length === 1 ? "record" : "records"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              aria-label="Previous page"
              disabled={currentPage === 0}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              size="icon"
              variant="outline"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button
              aria-label="Next page"
              disabled={currentPage >= pageCount - 1}
              onClick={() =>
                setPage((value) => Math.min(pageCount - 1, value + 1))
              }
              size="icon"
              variant="outline"
            >
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default CommonTable;
