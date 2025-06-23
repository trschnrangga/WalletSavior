'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from "react"
import { useSession } from "@/pages/context/SessionContext"
import { toast } from 'sonner'
import fetchTopSectionData from "@/pages/api/dashboard/fetchTopSectionData"
import { Skeleton } from "@/components/ui/skeleton"

interface topSectionData {
  total: number,
  count: number,
}

export function TopSectionCard() {
  const [totalExpense, setTotalExpense] = useState<string>('');
  const [transactionsCount, setTransactionsCount] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
    setIsLoading(false)
  }
  
  useEffect(() => {
    
    console.log("User Id: " + userId)
    if (userId){
      getTopSectionData();
    }

  }, [userId])

  return (
      isLoading ? (
        <>
        <div className="grid gap-4">
          <Skeleton className="w-full h-52 rounded-xl" />
          <Skeleton className="w-full h-52 rounded-xl" />
        </div>
        </>
      ) : (
        <>
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
        </>
      )
  )

}

export default TopSectionCard;
