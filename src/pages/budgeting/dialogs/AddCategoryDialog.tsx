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
import { supabase } from '@/pages/api/supabaseClient'
import { useSession } from '@/pages/context/SessionContext'
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

  const handleSubmit = async () => {
    
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
