import React from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SpendingChart } from './components/SpendingChart'
import TopSectionCards from './components/SectionCards';

function dashboard() {
  return (
    <div className='space-y-4 p-4'>
      <div>
        November
      </div>
      <div>
        <TopSectionCards />
      </div>
      <div>
        <SpendingChart />
      </div>
    </div>
  )
}

export default dashboard