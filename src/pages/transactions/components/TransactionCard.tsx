import React from 'react'
import { Card, CardDescription, CardTitle, CardHeader } from '@/components/ui/card'

type TransactionCardProps = {
    id: number
    name: string;
    description: string;
    date: string;
    amount: number;
    category: string;
}

// id: '2',
// date: '2025-10-02',
// amount: 50.0,
// description: 'Gas station',
// category: 'Transport',

function TransactionCard({ id, name, description, date, amount, category }: TransactionCardProps) {
  return (
    <div>
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div className='w-fit'>
                    <CardTitle>
                    {name}
                    </CardTitle>
                    <CardDescription>
                    {description}
                    </CardDescription>
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
    </div>
  )
}

export default TransactionCard