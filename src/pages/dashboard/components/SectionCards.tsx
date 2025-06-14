'use client'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BudgetSpentChart from "./BudgetSpentChart"
import { useState, useEffect } from "react"
import { useSession } from "@/pages/context/SessionContext"
import { toast } from 'sonner'
import fetchTopSectionData from "@/pages/api/dashboard/fetchTopSectionData"

interface topSectionData {
  total: number,
  count: number,
}

export function TopSectionCard() {
  const [totalExpense, setTotalExpense] = useState<string>('');
  const [transactionsCount, setTransactionsCount] = useState<string>('')
  const { user } = useSession();
  const userId = user?.id; 
  
  const getTopSectionData = async () => {
    const { data, error } = await fetchTopSectionData(userId);
    if (error){
      toast.error("Failed to fetch expense" + error.message)
    } else{
      console.log(data)
      setTotalExpense(
        Number(data.total).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
      );
      setTransactionsCount(data.count)
    }
  }
  
  useEffect(() => {

    if (userId){
      getTopSectionData();
    }

  }, [userId])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="grid gap-4">
        <Card className="w-full h-full"> 
          <CardHeader>
            <CardTitle>Total Expense</CardTitle>
            <CardDescription>Total spent this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{totalExpense}</p>
          </CardContent>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Transactions Managed</CardTitle>
            <CardDescription>Transactions this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{transactionsCount}</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Category Spent</CardTitle>
            <CardDescription>Spending based on each category</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetSpentChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TopSectionCard;
