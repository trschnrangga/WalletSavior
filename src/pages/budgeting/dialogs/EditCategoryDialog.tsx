'use client'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  category: {
    id: number
    name: string
    budget: number
  } | null
  onSave: (id: number, newName: string, newBudget: number) => void
}

export default function EditCategoryDialog({ open, onClose, category, onSave }: Props) {
  const [name, setName] = useState('')
  const [budget, setBudget] = useState(0)

  useEffect(() => {
    if (category) {
      setName(category.name)
      setBudget(category.budget)
    }
  }, [category])

  if (!category) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className='mb-2'>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Note that editing a category will change the used categories in transactions accordingly.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className='space-y-2'>
            <Label>New Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='space-y-2'>
            <Label>New Budget</Label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {onSave(category.id, name, budget)}}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
