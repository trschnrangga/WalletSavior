import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import deleteCategories from '@/pages/api/budgeting/deleteCategories'
import { toast } from 'sonner'

interface Props {
    categoryId: number
    onDelete: () => void
}

const DeleteCategory = async (catId: number) => {
    
    const { error } = await deleteCategories(catId);
    if (error){
      toast.error("Error deleting category: " + error.message);
    }else {
      toast.success("Sucessfully deleted category");
    }
    
  }

function DeleteConfirmCategory({categoryId, onDelete}: Props) {
  return (
    <div>
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant={'link'} className='text-red-500/80'>
                    Delete
                </Button>
            </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will <span className='font-bold'>permanently delete</span> your category
                and the <span className='font-bold'>associated transactions</span> from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
                DeleteCategory(categoryId);
                onDelete();
              }}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}

export default DeleteConfirmCategory