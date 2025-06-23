'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import AddCategoryDialog from './dialogs/AddCategoryDialog'
import EditCategoryDialog from './dialogs/EditCategoryDialog'
import fetchCategories from '../api/budgeting/fetchCategories'
import { useSession } from '@/pages/context/SessionContext'
import { toast } from 'sonner'
import editCategory from '../api/budgeting/EditCategories'
import { useRouter } from 'next/navigation'
import DeleteConfirmCategory from './dialogs/DeleteConfirmCategory'
import { motion } from "motion/react"

export interface Category {
  id: number,
  name: string,
  budget: number,
  remaining: number
}


function BudgetingPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  
  const router = useRouter();
  
  const { user } = useSession();
  const userId = user?.id


  const EditCategory = (catId: number) => {
    const category = categories.find(cat => cat.id === catId)
    if (category) {
      setSelectedCategory(category)
      setEditDialogOpen(true)
    }
  }

  const handleSaveCategory = async (id: number, name: string, budget: number) => {

    const { error } = await editCategory(id, name, budget);
    if (error){
      toast.error("Failed to edit category: " + error.message)
    } else{
      toast.success("Sucessfully edited category!")
      router.refresh()
    }

    // Update UI
    // setCategories(prev =>
    //   prev.map(cat =>
    //     cat.id === id
    //       ? { ...cat, name, budget: budget, remaining: budget }
    //       : cat
    //   )
    // );
    setEditDialogOpen(false);
    setSelectedCategory(null);

    // } catch (error) {
    //   console.error(error);
    //   alert('Failed to update category');
    // }
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
    
    // getCategories();
    if (userId) {
      getCategories();
    }
  }, [userId])

  return (
    <div>
      <div className='w-full flex-1 sticky bg-background p-5 top-0 z-10'>
        <h1 className='text-center text-2xl mb-5'>Categories</h1>
        <AddCategoryDialog onAdd={(newCategory) => setCategories((prev) => [...prev, newCategory])}/>
      </div>
      <div className='grid w-fit justify-self-center md:grid-cols-1 lg:grid-cols-3 justify-items-center'>
        {categories.map((category) => {
          const percent = category.budget === 0 ? 0 : Math.min((category.remaining / category.budget) * 100, 100)

          return (
            <motion.div 
            key={category.id} 
            className='p-5'
              initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.1,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.1 },
            }}
            >
              <Card className="w-85 max-w-md bg-card rounded-2xl text-center text-card-foreground border-border">
                <div className='px-12 pt-5'>
                  <CardTitle className="w-full overflow-ellipsis mx-auto text-2xl font-semibold mb-6 border-b border-border">
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
                    <Button 
                      className='hover:bg-white/5 hover:text-foreground hover:border-1 hover:border-white/15'
                      onClick={() => router.push(`/transactions?category=${encodeURIComponent(category.name)}`)}
                      >
                      View Details
                    </Button>
                  </div>
                </div>
                <div className='w-full flex justify-between mt-3 px-2 translate-y-2'>
                  <Button onClick={() => EditCategory(category.id)} variant={'link'} className='text-gray-100/80'>Edit</Button>
                  <DeleteConfirmCategory categoryId={category.id} onDelete={() => setCategories(prev => prev.filter(cat => cat.id !== category.id))}/>

                </div>
              </Card>
            </motion.div>
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
