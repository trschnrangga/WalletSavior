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
import { supabase } from '@/pages/api/supabaseClient';
import { toast } from 'sonner';
import React from 'react';

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const {error} = await supabase.auth.signInWithPassword({email, password});
    if (error) {
      toast.error(`Login error: ${error.message}`);
      // Optionally, show an error message to the user
    } else {
      // Redirect or show success message
      toast.success('Login successful');
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-20 p-8 bg-card rounded-2xl text-card-foreground border-border">
      <CardTitle className="text-2xl font-semibold mb-6">Sign In</CardTitle>
      <div className="space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full" type="submit">Sign in</Button>
        </form>
      </div>
    </Card>
  );
};

export default LoginPage;
