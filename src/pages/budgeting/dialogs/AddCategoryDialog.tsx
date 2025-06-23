'use client'

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
import { useSession } from '@/context/SessionContext'
import addCategories from '@/pages/api/budgeting/addCategories'
import { Category } from '..'

interface AddCategoryDialogProps {
  onAdd: (category: Category) => void;
}

function AddCategoryDialog({ onAdd }: AddCategoryDialogProps) {
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const [open, setOpen] = useState(false)
  
  const { user } = useSession();
  const userId = user?.id

  function isCorrectInput():boolean {
    if (!name){
      toast.error("Name must be filled!");
      return false;
    }

    if (name.length > 30){
      toast.error("Name length can't be more than 30 characters!");
      return false;
    }

    if (!budget){
      toast.error("Budget cannot be empty!");
      return false;
    }

    if (parseInt(budget) <= 0){
      toast.error("Budget cannot be less than or equal to zero!");
      return false;
    }

    return true;
  }

  const handleSubmit = async () => {
    
    if (!isCorrectInput()){
      return
    }

    const { data, error } = await addCategories(userId, name, budget);
    
    if (error) {
      toast.error('Failed to add category: ' + error.message)
    } else {
      toast.success('Category added successfully')
      onAdd(data)
      setName('')
      setBudget('')
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto mb-4">+ Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className='space-y-2'>
            <Label htmlFor="name">Category Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="budget">Monthly Budget (Rp)</Label>
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget((e.target.value))}
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
export default AddCategoryDialog;
