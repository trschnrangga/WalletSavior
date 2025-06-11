'use client'
import dummyTransaction from '@/pages/api/dummy/transactions'
import dummyCategories from '@/pages/api/dummy/budgeting'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { IdCard } from 'lucide-react'
import { CalendarTransaction } from '../components/CalendarTransaction'
import SelectCategory from '../components/SelectCategory'

function AddTransactionDialog({ onAdd }: { onAdd: (id: number, name: string, description: string, date: Date, category: string, amount: number) => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('')
  const [open, setOpen] = useState(false)
  const id = dummyTransaction[dummyTransaction.length - 1].id + 1;

  const handleSubmit = () => {
    if (!name || !amount) return
    onAdd(id, name, description, date, category, parseInt(amount))
    toast.success('Transaction added successfully')
    setName('')
    setDescription('')
    setDate(new Date())
    setCategory('')
    setAmount('')
    setOpen(false)
  }

  function findCategoryName(id: number): React.SetStateAction<string> {
    const category = dummyCategories.find((cat) => cat.id === id)
    return category?.name ?? ""
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto mb-4">+ Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className='space-y-2'>
            <Label htmlFor="name">Transaction Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="description">Transaction Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <CalendarTransaction date={date} setDate={setDate} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="category">Transaction Category</Label>
            <SelectCategory categories={dummyCategories} onSelect={(id) => setCategory(findCategoryName(id))} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="amount">Transaction Amount (Rp)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AddTransactionDialog;
