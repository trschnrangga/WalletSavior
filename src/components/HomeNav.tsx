import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/router';

function HomeNav() {
  const router = useRouter();

  return (
    <div className='sticky top-0 z-50 w-full'>
        <nav className='flex justify-between items-center h-20 shadow-md text-white px-10'>
            <div className='flex items-center'>
                <Image src='/walletsaviorlogo.svg' alt="WalletSavior Logo" width={30} height={30} quality={100} className="mr-2" />
                <h1 className="text-lg font-bold text-primary text-center">WalletSavior</h1>
            </div>
            <div className='content-end-safe gap-4 flex'>
                <Button variant='ghost' className='text-white'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  About
                </Button>
                <Button variant='outline' className='text-white'
                onClick={() => router.push('/login')}
                >
                  Log in
                </Button>
                <Button variant='outline' className='text-white'
                onClick={() => router.push('/register')}
                >
                  Register
                </Button>
            </div>
        </nav>
    </div>
  )
}

export default HomeNav