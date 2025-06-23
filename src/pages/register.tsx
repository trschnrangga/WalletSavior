import React from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import { supabase } from '@/pages/api/supabaseClient';
import { toast } from 'sonner';
import { useRouter } from 'next/router';


function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
      const {error} = await supabase.auth.signUp({email, password})
      if (error) {
        toast.error(error.message);
      } else{
        toast.success('Registration successful! Please check your email for confirmation.');
        // Optionally redirect or show a success message
        router.push('/login');
        setEmail('');
        setPassword('');
      }
  }

  return (
    <div className='flex items-center justify-center'>
      <Card className="w-full max-w-md mx-auto mt-20 p-8 bg-card rounded-2xl text-card-foreground border-border">
        <CardTitle className="text-2xl font-semibold mb-6">Sign Up</CardTitle>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit">Sign up</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default RegisterPage