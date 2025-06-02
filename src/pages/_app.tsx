// pages/_app.tsx
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import AuthSidebar from '@/components/AuthSidebar';
import Sidebar from '@/components/GenSidebar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { Toaster } from 'sonner';


export default function MyApp({ Component, pageProps }: AppProps) {

  const session = true;
  const router = useRouter();

  const publicRoutes = ['/login', '/register'];
  const protectedRoutes = ['/dashboard']; // add more as needed

  useEffect(() => {
    const currentPath = router.pathname;

    // Logged-in users trying to visit login/register
    if (session && publicRoutes.includes(currentPath)) {
      router.replace('/dashboard'); // or your home page
    }

    // Not logged-in users trying to visit protected routes
    if (!session && protectedRoutes.includes(currentPath)) {
      router.replace('/login');
    }
  }, [router.pathname, session]);

  return (
    <div className="flex">
      {session ? <Sidebar /> : <AuthSidebar />}
      <main className="flex-1 p-10 min-h-screen items-center justify-center">
        <Component {...pageProps} />
      <Toaster position='top-right' toastOptions={{
        style: {
          background: 'var(--card)',
          color: 'var(--primary)',
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-sans)',
        },
      }}/>
      </main>
    </div>
  );
}
