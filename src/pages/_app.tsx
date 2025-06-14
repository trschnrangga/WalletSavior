// pages/_app.tsx
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import '@/styles/globals.css';
import AuthSidebar from '@/components/AuthSidebar';
import Sidebar from '@/components/GenSidebar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { Toaster } from 'sonner';

// Allow pages to define custom layout
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const session = false; // Replace with real session logic
  const router = useRouter();

  const publicRoutes = ['/login', '/register'];
  const protectedRoutes = ['/dashboard'];

  useEffect(() => {
    const currentPath = router.pathname;

    if (session && publicRoutes.includes(currentPath)) {
      router.replace('/dashboard');
    }

    if (!session && protectedRoutes.includes(currentPath)) {
      router.replace('/login');
    }
  }, [router.pathname, session]);

  // Use the layout defined at the page level, or fall back to default layout
  const getLayout = Component.getLayout ?? ((page) => (
    <div className="flex">
      {session ? <Sidebar /> : <AuthSidebar />}
      <main className="flex-1 p-10 min-h-screen items-center justify-center">
        {page}
      </main>
    </div>
  ));

  return getLayout(
    <>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--primary)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-sans)',
          },
        }}
      />
    </>
  );
}
