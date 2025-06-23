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
    onSelect: (cat: Category) => void
}

function SelectCategory({categories, onSelect}: SelectCategoryProps ) {

  const handleSelect = (value: string) => {
    const selectedCategory = categories.find(cat => cat.id.toString() === value);
    if (selectedCategory) {
      onSelect(selectedCategory);
    }
    
  }
  return (
    <div>
        <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="border-border">
            {
              categories?.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>
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