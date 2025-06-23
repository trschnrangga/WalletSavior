import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import fetchSpentBudgetData from '@/pages/api/dashboard/fetchSpentBudgetingData'
import { Skeleton } from '@/components/ui/skeleton'
import { useSession } from '@/context/SessionContext'

const chartConfig = {
  spent: {
    label: "Spent",
    color: "var(--primary)",
  },

  budget: {
    label: "Budget",
    color: "var(--secondary)",
  }
} satisfies ChartConfig

interface ChartData {
  name: string,
  spent: number,
  budget: number
}

function BudgetSpentChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { user } = useSession()
  const userId = user?.id

  const GetBudgetSpentData = async () => {
    const {data, error } = await fetchSpentBudgetData(userId);

    if (error){
      console.log(error)
    } else{
      console.log(data)
      setChartData(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {

    if (userId){
      GetBudgetSpentData();
    }

  },[userId])

  return (
    <div className=''>
      {isLoading ? (
        <Skeleton className='h-full'/>
      ):(
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>Category Spent</CardTitle>
          <CardDescription>Spending based on each category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className='min-h-[50px] h-80 w-full'>
          <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 12)}
              />
              <YAxis 
              dataKey="budget"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
              if (value >= 1000000) return `${value / 1000000} mil`; // juta (millions)
              if (value >= 1000) return `${value / 1000}k`; // ribu (thousands)
              return value;
              }}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="spent" fill="var(--color-spent)" radius={8} />
              <Bar dataKey="budget" fill="var(--color-budget)" radius={8} />
          </BarChart>
      </ChartContainer>
        </CardContent>
      </Card>

      )}
    </div>
  )
}

export default BudgetSpentChart