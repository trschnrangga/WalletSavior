import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import TransactionCard from './components/TransactionCard'
import React, { useState, useEffect } from 'react'
import { DataTable } from './table/data-table'
import { Transaction, columns } from './table/columns'
import dummyData from '@/pages/api/dummy/transactions'
import { Input } from '@/components/ui/input'
import AddTransactionDialog from './dialogs/AddTransactionDialog'


function TransactionsPage() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>(dummyData);
  
  useEffect(() => {
      // async function fetchCategories() {
      // const res = await fetch('/api/categories');
      // const data = await res.json();
      // setCategories(data);
      
      //dummy json from dummy/budgeting
      setTransactions(dummyData)
    }, [])

  return (
    <div>
      <div className='space-y-4 p-5'>
        <h1 className='text-2xl text-center mb-12'>
          November
        </h1>
        <div className=" items-center mb-4 gap-4">
          <div className="flex-1 flex justify-center">
            <Input
              type="text"
              placeholder="Search"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="px-4 py-2 rounded-full w-full max-w-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground"
            />
          </div>
          <div className="flex justify-end">
            <AddTransactionDialog onAdd={(id :number, name: string, description: string, date: Date, category: string, amount: number) => {
            const newTransaction: Transaction = {
              id,
              name,
              description,
              date,
              category,
              amount
            };
            setTransactions(prev => [...prev, newTransaction]);
          }}
              />
          </div>
      </div>
      <div className='pt-5'>
        <DataTable columns={columns} data={transactions} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </div>
      </div>
    </div>
  )
}

export default TransactionsPage