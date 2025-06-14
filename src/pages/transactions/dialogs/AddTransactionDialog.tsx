'use client'
// import dummyTransaction from '@/pages/api/dummy/transactions'
import dummyCategories from '@/pages/api/dummy/budgeting'
import React, { useState, useEffect } from 'react'
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
import { CalendarTransaction } from '../components/CalendarTransaction'
import SelectCategory from '../components/SelectCategory'
import { Transaction } from '../table/columns'
import addCategories from '@/pages/api/budgeting/addCategories'
import { useSession } from '@/pages/context/SessionContext'
import addTransactions from '@/pages/api/transactions/addTransactions'
import fetchCategories from '@/pages/api/budgeting/fetchCategories'
import { Category } from '@/pages/budgeting'

interface AddTransactionsProps {
  onAdd: (transaction: Transaction) => void;
}

function AddTransactionDialog({ onAdd }: AddTransactionsProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [amount, setAmount] = useState('')
  const [open, setOpen] = useState(false)
  
  const { user } = useSession();
  const userId = user?.id;

  const handleSubmit = async () => {
    if (!category){
      return
    }

    const {data, error} = await addTransactions(category.id, userId, name, description, date, amount)
    if (error){
      toast.error("Error adding transaction: " + error.message);
    } else{
      toast.success("Sucessfully added transaction!");
      onAdd(data);
      setName('')
      setDescription('')
      setDate(new Date())
      setCategory(null)
      setAmount('')
      setOpen(false)

    }
  }

  async function getCategories() {
    const { data, error } = await fetchCategories(userId);
    if (error){
      toast.error("Error fetching categories: " + error.message)
    }
    setCategories(data as Category[])
    // Optionally handle error
    
  }

  useEffect(() => { 
      if (userId){
        getCategories();
      }

    }, [open])

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
            <SelectCategory categories={categories || []} onSelect={(cat) => setCategory(cat)} />
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
