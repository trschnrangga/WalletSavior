'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import AddCategoryDialog from './dialogs/AddCategoryDialog'
import EditCategoryDialog from './dialogs/EditCategoryDialog'
import dummyData from '@/pages/api/dummy/budgeting'

interface Category {
  id: number
  name: string
  budget: number
  remaining: number
}


function BudgetingPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)


  const DeleteCategory = async (catId: number) => {
    // try {
    // const res = await fetch(`/api/categories/${catId}`, {
    //   method: 'DELETE',
    // });

    // if (!res.ok) throw new Error('Failed to delete');

    // Update state if backend deletion succeeded
    setCategories(prev => prev.filter(category => category.id !== catId));
    // } catch (error) {
    //   console.error(error);
    //   alert('Failed to delete category');
    // }
  }

  const EditCategory = (catId: number) => {
    const category = categories.find(cat => cat.id === catId)
    if (category) {
      setSelectedCategory(category)
      setEditDialogOpen(true)
    }
  }

  const handleSaveCategory = async (id: number, name: string, budget: number) => {
  //  try {
    // const res = await fetch(`/api/categories/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ name, budget }),
    // });

    // if (!res.ok) throw new Error('Failed to update category');

    // You can optionally get the updated category data:
    // const updated = await res.json();

    // Update UI
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, name, budget, remaining: budget } : cat
      )
    );
    setEditDialogOpen(false);
    setSelectedCategory(null);

    // } catch (error) {
    //   console.error(error);
    //   alert('Failed to update category');
    // }
  }

  useEffect(() => {
    // async function fetchCategories() {
    // const res = await fetch('/api/categories');
    // const data = await res.json();
    // setCategories(data);
    
    //dummy json from dummy/budgeting
    setCategories(dummyData)
  }, [])

  return (
    <div>
      <div className='w-full flex-1 sticky bg-background p-5 top-0 z-10'>
        <h1 className='text-center text-2xl mb-5'>Categories</h1>
        <AddCategoryDialog onAdd={(name: string, budget: number) => {
          const newCategory = {
            id: Date.now(),
            name,
            budget,
            remaining: budget 
          }
          //Nambahin category ini nanti harusnya ke database juga
          setCategories(prev => [...prev, newCategory])
        }} />
      </div>
      <div className='grid w-fit justify-self-center md:grid-cols-1 lg:grid-cols-3 justify-items-center'>
        {categories.map((category) => {
          const percent = category.budget === 0 ? 0 : Math.min((category.remaining / category.budget) * 100, 100)

          return (
            <div key={category.id} className='p-5'>
              <Card className="w-85 max-w-md bg-card rounded-2xl text-center text-card-foreground border-border">
                <div className='px-12 pt-5'>
                  <CardTitle className="w-fit mx-auto text-2xl font-semibold mb-6 border-b border-border">
                    {category.name}
                  </CardTitle>
                  <div className="space-y-10">
                    <div className="flex flex-col space-y-1.5">
                      <Label>Remaining</Label>
                      <div className={`text-4xl font-bold ${category.remaining < 100000 ? 'text-red-600' : 'text-primary'}`}>
                        Rp. {category.remaining.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label>Budget</Label>
                      <div className='text-start'>
                        <span className='font-bold'>
                          Rp. {category.budget.toLocaleString('id-ID')}
                        </span>/mo
                      </div>
                    </div>
                    <Progress value={percent}></Progress>
                    <Button className='hover:bg-white/5 hover:text-foreground hover:border-1 hover:border-white/15'>
                      View Details
                    </Button>
                  </div>
                </div>
                <div className='w-full flex justify-between mt-3 px-2 translate-y-2'>
                  <Button onClick={() => EditCategory(category.id)} variant={'link'} className='text-gray-100/80'>Edit</Button>
                  <Button onClick={() => DeleteCategory(category.id)} variant={'link'} className='text-red-500/80'>Delete</Button>
                </div>
              </Card>
            </div>
          )
        })}
        {selectedCategory && (
          <EditCategoryDialog
            open={editDialogOpen}
            category={selectedCategory}
            onSave={handleSaveCategory}
            onClose={() => {
              setEditDialogOpen(false)
              setSelectedCategory(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default BudgetingPage
