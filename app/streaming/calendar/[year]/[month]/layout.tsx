import React, { Suspense } from "react"

import MonthSwitch from 'components/standalone/MonthSwitch';
import { getJTCNow } from 'library/DateFunctions';
import Loading from './loading';

import { Slug, SlugCheck } from './slug';

interface LayoutProps {
    children: React.ReactNode
    params: Slug
}

const Layout = async ({params, children}: LayoutProps) => {
  const checkResult = SlugCheck(params);

  const nextMonth = getJTCNow();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const start = { year: 2017, month: 1, day: 1 };
  const end = { year: nextMonth.getFullYear(), month: nextMonth.getMonth() + 1, day: nextMonth.getDate()};

  if (!checkResult.result) {
    return (
      <div>無効なページです</div>
    )
  }

  return(
    <section className='h-full flex flex-col'>
      <header>
        <MonthSwitch start={start} end={end} year={checkResult.year} month={checkResult.month} componentName='streaming/calendar' />
      </header>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </section>
  )
}

export default Layout;