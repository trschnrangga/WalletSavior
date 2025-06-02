import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import React from 'react'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
  { month: "Entertainment", spent: 186, budget: 200 },
  { month: "Food", spent: 305, budget: 350 },
  { month: "Health", spent: 237, budget: 300 },
  { month: "Rent", spent: 100, budget: 180 },
  { month: "Transport", spent: 214, budget: 320 },
]
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

function BudgetSpentChart() {
  return (
    <div>
      <ChartContainer config={chartConfig} className='min-h-[50px] h-80 w-full'>
          <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 12)}
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
    </div>
  )
}

export default BudgetSpentChart