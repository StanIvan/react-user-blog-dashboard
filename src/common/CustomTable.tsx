import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import React from "react";

interface CommonTableProps<T> {
  readonly columns: MRT_ColumnDef<any>[];
  readonly data: T[];
  readonly isLoading?: boolean;
  readonly enablePagination?: boolean;
  readonly enableSorting?: boolean;
  readonly enableFilters?: boolean;
  readonly enableTopToolbar?: boolean;
  readonly renderDetailPanel?: (props: { row: any }) => JSX.Element;
}

const CommonTable = <T,>({
  columns,
  data,
  isLoading = false,
  enablePagination = false,
  enableSorting = false,
  enableFilters = false,
  enableTopToolbar = true,
  renderDetailPanel,
}: CommonTableProps<T>) => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enableFilters={enableFilters}
    enablePagination={enablePagination}
    enableSorting={enableSorting}
    enableTopToolbar={enableTopToolbar}
    initialState={{
      showColumnFilters: enableFilters,
    }}
    muiTableBodyRowProps={({ row }) => ({
      onClick: renderDetailPanel ? row.getToggleExpandedHandler() : undefined,
      sx: { cursor: renderDetailPanel ? "pointer" : "default" },
    })}
    renderDetailPanel={renderDetailPanel}
    state={{ isLoading }}
  />
);

export default CommonTable;
