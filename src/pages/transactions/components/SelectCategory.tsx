import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category } from "@/pages/budgeting"
import React from 'react'

interface SelectCategoryProps {
    categories: Category[],
    onSelect: (id: number) => void
}

function SelectCategory({categories, onSelect}: SelectCategoryProps ) {
  return (
    <div>
        <Select onValueChange={(value) => onSelect(Number(value))}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="border-border">
            {
              categories.map(category => (
                <SelectItem key={category.id} value={category.id.toString()} onClick={() => onSelect(category.id)}>
                  {category.name}   
                </SelectItem>
              ))
            }
        </SelectContent>
        </Select>
    </div>
  )
}

export default SelectCategory