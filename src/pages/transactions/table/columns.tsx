'use client'
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { Checkbox } from "@/components/ui/checkbox"
export type Transaction = {
    id: number
    name: string
    description: string
    date: Date
    cat_id: number
    cat_name: string
    amount: number
}

export const columns: ColumnDef<Transaction>[] = [

    {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: 'Transaction Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {                                       
        accessorKey: 'date',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date: Date = row.getValue('date')
            return (
                <span>
                    {format(new Date(date), 'MMM dd, yyyy')}
                </span>
            )
        }
    },
    {
        accessorKey: 'cat_name',
        header: 'Category'
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount: number = row.getValue('amount')
            return (
                <span className="text-right font-medium">
                    {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                    }).format(amount)}
                </span>
            )
        },
    },
]

export default columns