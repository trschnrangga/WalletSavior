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

function RegisterPage() {
  return (
    <div className='flex items-center justify-center'>
      <Card className="w-full max-w-md mx-auto mt-20 p-8 bg-card rounded-2xl text-card-foreground border-border">
        <CardTitle className="text-2xl font-semibold mb-6">Sign Up</CardTitle>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter username" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>
          <Button className="w-full">Sign up</Button>
        </div>
      </Card>
    </div>
  )
}

export default RegisterPage