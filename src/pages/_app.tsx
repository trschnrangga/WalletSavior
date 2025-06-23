// pages/_app.tsx
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import '@/styles/globals.css';
import AuthSidebar from '@/components/AuthSidebar';
import Sidebar from '@/components/GenSidebar';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Toaster } from 'sonner';
import { SessionProvider, SessionContext } from './context/SessionContext';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function AppLayout({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { session, isSessionLoading } = useContext(SessionContext); // Use context instead of supabase directly

  const publicRoutes = ['/login', '/register'];
  const protectedRoutes = ['/dashboard', '/transactions', '/budgeting'];

  useEffect(() => {
    if (isSessionLoading) return

    const currentPath = router.pathname;

    if (session && publicRoutes.includes(currentPath)) {
      router.replace('/dashboard');
    }

    if (!session && protectedRoutes.includes(currentPath)) {
      router.replace('/login');
    }
  }, [router.pathname, session, isSessionLoading]);

  const getLayout = Component.getLayout ?? ((page) => (
    <div className="flex">
      {session ? <Sidebar /> : <AuthSidebar />}
      <main className="flex-1 p-10 min-h-screen items-center justify-center">
        {page}
      </main>
    </div>
  ));

  return getLayout(<Component {...pageProps} />);
}

export default function MyApp(props: AppPropsWithLayout) {
  return (
    <SessionProvider>
      <AppLayout {...props} />
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-sans)',
          },
        }}
      />
    </SessionProvider>
  );
}
