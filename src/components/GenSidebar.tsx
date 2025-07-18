// components/Sidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label'
import Image from 'next/image';
import { Button } from './ui/button';
import { supabase } from '@/pages/api/supabaseClient';
import { toast } from 'sonner';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/budgeting', label: 'Budgeting'}
];

export default function GenSidebar() {
  const router = useRouter();

  const handleSignout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      toast.error(`Sign out error: ${error.message}`);
    } else {
      router.replace('/login');
      toast.success('Successfully signed out');
    }
  };

  return (
    <aside className="w-64 border-r h-screen px-4 py-6 border-border sticky top-0">
      <div className='flex items-center justify-center mb-6'>
        <Image src='/walletsaviorlogo.svg' alt="WalletSavior Logo" width={30} height={30} quality={100} className="mr-2" />
        <h1 className="text-xl font-bold text-primary text-center">WalletSavior</h1>
      </div>
      <Label className="text-gray-50 text-sm mb-4">Menu</Label>
      <nav className="space-y-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block px-3 py-2 rounded-md text-sm font-medium',
              router.pathname === link.href
                ? 'bg-primary text-black'
                : 'text-gray-600 hover:bg-gray-600/10'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>  
      <div>
        <Button variant="ghost" className="mt-10 w-full justify-start hover:te text-gray-600 hover:bg-gray-600/10" onClick={() => {handleSignout()}}>
          Logout
        </Button>
      </div>
    </aside>
  );
}
