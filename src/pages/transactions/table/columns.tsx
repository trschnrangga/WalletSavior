'use client'
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

export type Transaction = {
    id: number
    name: string
    description: string
    date: Date
    category: string
    amount: number
}

export const columns: ColumnDef<Transaction>[] = [

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
        accessorKey: 'category',
        header: 'Category',
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