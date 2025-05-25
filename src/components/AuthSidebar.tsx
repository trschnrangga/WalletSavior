// components/Sidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const links = [
  { href: '/login', label: 'Log In' },
  { href: '/register', label: 'Register' }
];

export default function AuthSidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 border-r h-screen px-4 py-6 border-border sticky top-0">
      <h1 className="text-xl font-bold text-primary text-center mb-6">WalletSavior</h1>
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
    </aside>
  );
}
