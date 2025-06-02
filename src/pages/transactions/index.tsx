import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import TransactionCard from './components/TransactionCard'
import React from 'react'
import test from 'node:test'

function TransactionsPage() {
  return (
    <div>
      <div className='space-y-4 p-5'>
        <h1 className='text-2xl text-center mb-12'>
          November
        </h1>
        <div className='flex mb-4 justify-center'>
          <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-full w-500 max-w-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground"
        />
        <Button variant={"link"} className='max-w-md'>
          Filters
        </Button>
        </div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
                <div className='w-fit'>
                    <CardTitle>
                    Transaction Name
                    </CardTitle>
                </div>
                <div>
                    test
                </div>
                <div>
                    test2
                </div>
            </div>
          </CardHeader>
        </Card>
        <div>
          <TransactionCard id={1} name="Transaction 1" description="Description for transaction 1" date="2025-10-01" amount={100} category="Food" />
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage