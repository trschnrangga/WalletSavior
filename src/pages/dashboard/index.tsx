import React from 'react'
import { SpendingChart } from './components/SpendingChart'
import TopSectionCards from './components/SectionCards';
import BudgetSpentChart from './components/BudgetSpentChart';


function dashboard() {

  return (
    <div className='space-y-4 p-4'>
      <div className='grid grid-cols-2 gap-4'>
        <TopSectionCards />
        <BudgetSpentChart />
      </div>
      <div>
        <SpendingChart />
      </div>
    </div>
  )
}

export default dashboard