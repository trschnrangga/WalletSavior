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

export function TopSectionCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="grid gap-4">
        <Card className="w-full h-full"> 
          <CardHeader>
            <CardTitle>Total Expense</CardTitle>
            <CardDescription>Total spent this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">Rp. 2.900.000</p>
          </CardContent>
        </Card>
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle>Transactions Managed</CardTitle>
            <CardDescription>Transactions this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">340</p>
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
