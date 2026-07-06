import { useMemo, useState } from "react";
import { format } from "date-fns";
import type {
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTablePagination } from "./data-table-pagination";
import { EmptyState } from "./empty-state";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  onRowClick?: (row: TData) => void;
  onBulkDelete?: (selectedRows: TData[]) => void;
  searchPlaceholder?: string;
  emptyStateProps?: EmptyStateProps;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  onRowClick,
  onBulkDelete,
  searchPlaceholder,
  emptyStateProps,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const tableColumns = useMemo<ColumnDef<TData, TValue>[]>(() => {
    const selectColumn: ColumnDef<TData, TValue> = {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`Select row ${row.id}`}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    };

    return [selectColumn, ...columns];
  }, [columns]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const searchValue = String(filterValue).toLowerCase();
      if (!searchValue) {
        return true;
      }

      const values = Object.values(row.original as Record<string, unknown>);
      return values.some((value) => {
        if (value === null || value === undefined) {
          return false;
        }
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchValue);
        }
        if (typeof value === "number") {
          return value.toString().includes(searchValue);
        }
        if (value instanceof Date) {
          return format(value, "Pp").toLowerCase().includes(searchValue);
        }
        return String(value).toLowerCase().includes(searchValue);
      });
    },
    enableRowSelection: true,
    enableSortingRemoval: true,
  });

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const handleExport = () => {
    const visibleRows = table.getRowModel().rows.map((row) => row.original);
    const headers = table
      .getAllLeafColumns()
      .filter((column) => column.id !== "select" && column.getIsVisible())
      .map((column) => column.id);

    const escapeCsvValue = (value: string) => {
      const normalized = String(value).replace(/"/g, '""');
      return /[",\n]/.test(normalized) ? `"${normalized}"` : normalized;
    };

    const csvRows = [headers.join(",")];

    visibleRows.forEach((row) => {
      const values = headers.map((header) => {
        const value = (row as Record<string, unknown>)[header];
        return escapeCsvValue(value == null ? "" : String(value));
      });
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "export.csv";
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchPlaceholder={searchPlaceholder}
        onExport={handleExport}
        onBulkDelete={() => onBulkDelete?.(selectedRows)}
        selectedRowsCount={selectedRows.length}
      />

      <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/70 shadow-sm dark:bg-card/50">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-left font-medium"
                          onClick={header.column.getToggleSortingHandler()}
                          aria-label={`Sort by ${header.column.id}`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowUp className="size-4" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown className="size-4" />
                          ) : (
                            <ArrowUpDown className="size-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  {table.getAllLeafColumns().map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={table.getAllLeafColumns().length}>
                  {emptyStateProps ? (
                    <EmptyState {...emptyStateProps} />
                  ) : (
                    <div className="py-10 text-center text-sm text-muted-foreground">
                      No results found.
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={onRowClick ? "cursor-pointer" : undefined}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && data.length > 0 ? (
        <DataTablePagination table={table} />
      ) : null}
    </div>
  );
}

function flexRender<TData, TValue>(
  content:
    ColumnDef<TData, TValue>["header"] | ColumnDef<TData, TValue>["cell"],
  context: unknown,
) {
  if (typeof content === "function") {
    return content(context as never);
  }
  return content;
}
