import { Columns3, Download, Search, Trash2 } from "lucide-react";
import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchPlaceholder?: string;
  onExport?: () => void;
  onBulkDelete?: () => void;
  selectedRowsCount: number;
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Search...",
  onExport,
  onBulkDelete,
  selectedRowsCount,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col gap-3">
      {selectedRowsCount > 0 ? (
        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/40 px-3 py-2">
          <span className="text-sm font-medium text-foreground">
            {selectedRowsCount} selected
          </span>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onBulkDelete}
            aria-label="Delete selected rows"
          >
            <Trash2 className="mr-2 size-4" />
            Delete Selected
          </Button>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            placeholder={searchPlaceholder}
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="Toggle visible columns"
              >
                <Columns3 className="mr-2 size-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table.getAllLeafColumns().map((column) => {
                if (column.id === "select") {
                  return null;
                }

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header?.toString() ?? column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onExport}
            aria-label="Export data as CSV"
          >
            <Download className="mr-2 size-4" />
            Export CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
