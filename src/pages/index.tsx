/* eslint-disable  @typescript-eslint/no-explicit-any */
import HomeNav from '@/components/HomeNav';
import Image from 'next/image';
import React from 'react';
import { Meteors } from '@/components/magicui/meteors'

const HomePage = () => {
  return (
    <div>
      <Meteors number={30} className='z-10'/>
      <HomeNav />
      <section className='p-8 z-20'>
        <div className='flex flex-col justify-center mt-40 mb-25'>
          <div className='justify-center text-6xl'>
            <div className='space-y-3 font-medium text-center'>
              <h1>Your personal finance manager,</h1>
              <h1>but just <span className='underline'>infinitely</span> better.</h1>
            </div>
          </div>
          <div className='text-center mt-10 text-white/60'>
            <h2>A simple finance manager that is easy to understand.</h2>
            <h2>Seamlessly manage your budgeting and transactions.</h2>
          </div>
        <Image
          src='/dashboardpic.png'
          alt="WalletSavior Logo"
          width={1000}
          height={720}
          quality={100}
          priority={true}
          className="rounded-3xl shadow-primary self-center mt-20 w-auto h-auto"
          />
        </div>
        <div className='flex h-full justify-center item'>
        </div>
      </section>
    </div>
  );
};

//This disables the default layout (sidebar)
HomePage.getLayout = (page: any) => page;

export default HomePage;