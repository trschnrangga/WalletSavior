import React from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { SquarePen } from 'lucide-react'

function BudgetingPage() {
  return (
    <div>
      <div className='flex-1 justify-space-between'>
        <h1 className='text-center text-2xl'>Categories</h1>
        <h1 className='text-end'>Add new category</h1>
      </div>
      <div className='grid w-fit justify-self-center grid-cols-3 justify-items-center '>
        <div className='p-8'>
          <Card className="w-full max-w-md p-8 px-12 bg-card rounded-2xl text-center text-card-foreground border-border">
            <CardTitle className="w-fit mx-auto text-2xl font-semibold mb-6 border-b border-border">Entertainment</CardTitle>
            <div className="space-y-10">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Remaining">Remaining</Label>
                <div className='text-4xl font-bold text-primary'>Rp. 1.250.000</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="budget">Budget</Label>
              <div className='text-start'><span className='font-bold'>Rp. 600.000</span>/mo</div>
            </div>
            <Progress value={33}></Progress>
            <Button className='hover:bg-white/5 hover:text-foreground hover:border-1 hover:border-white/15'>View Details</Button>
            </div>
          </Card>
        </div>
        <div className='p-8'>
          <Card className="w-full max-w-md p-8 px-12 bg-card rounded-2xl text-center text-card-foreground border-border">
            <CardTitle className="w-fit mx-auto text-2xl font-semibold mb-6 border-b border-border">Entertainment</CardTitle>
            <div className="space-y-10">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Remaining">Remaining</Label>
                <div className='text-4xl font-bold text-primary'>Rp. 1.250.000</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="budget">Budget</Label>
              <div className='text-start'><span className='font-bold'>Rp. 600.000</span>/mo</div>
            </div>
            <Progress value={33}></Progress>
            <Button className='hover:bg-white/5 hover:text-foreground hover:border-1 hover:border-white/15'>View Details</Button>
            </div>
          </Card>
        </div>
        <div className='p-8'>
          <Card className="w-full max-w-md p-8 px-12 bg-card rounded-2xl text-center text-card-foreground border-border">
            <CardTitle className="text-2xl font-semibold mb-6">Entertainment</CardTitle>
            <div className="space-y-10">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Remaining">Remaining</Label>
                <div className='text-4xl font-bold text-primary'>Rp. 1.250.000</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="budget">Budget</Label>
              <div className='text-start'><span className='font-bold'>Rp. 600.000</span>/mo</div>
            </div>
            <Progress value={33}></Progress>
            <Button className='hover:bg-white/5 hover:text-foreground hover:border-1 hover:border-white/15'>View Details</Button>
            </div>
          </Card>
        </div>
        <div className='p-8'>
          <Card className="w-full max-w-md p-8 px-12 bg-card rounded-2xl text-center text-card-foreground border-border">
            <CardTitle className="text-2xl font-semibold mb-6">Entertainment</CardTitle>
            <div className="space-y-10">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Remaining">Remaining</Label>
                <div className='text-4xl font-bold text-primary'>Rp. 1.250.000</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="budget">Budget</Label>
              <div className='text-start'><span className='font-bold'>Rp. 600.000</span>/mo</div>
            </div>
            <Progress value={33}></Progress>
            <Button className='hover:bg-white/5 hover:text-foreground hover:border-1 hover:border-white/15'>View Details</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BudgetingPage