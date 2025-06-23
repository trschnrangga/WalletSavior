/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client"
import { Skeleton } from "@/components/ui/skeleton"
import React, { useEffect } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Transaction } from "./columns"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  globalFilter?: string
  setGlobalFilter?: (value: string) => void
  onSelectionChange?: (ids: number[]) => void
  resetSelectionTrigger?: any
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  globalFilter,
  setGlobalFilter,
  onSelectionChange,
  resetSelectionTrigger
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  // const [globalFilter, setGlobalFilter] = React.useState<any>([])
  const table = useReactTable({
    data,
    columns,
    
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
  })
  
  useEffect(() => {
  if (resetSelectionTrigger !== undefined) {
    table.resetRowSelection(true)
  }
}, [resetSelectionTrigger])

  useEffect(() => {
     const selectedIds = table.getSelectedRowModel().rows.map(
    (row) => (row.original as Transaction).id
    )
    onSelectionChange?.(selectedIds)

  },[rowSelection])

  return (
    <div className="rounded-md">
      <div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="min-w-[150px] max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <div>
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <Skeleton  className="w-full h-full"/>
              </TableCell>
            </TableRow>
            </div>
          )}
        </TableBody>
      </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          >
          Next
          </Button>
      </div>
    </div>
  )
}