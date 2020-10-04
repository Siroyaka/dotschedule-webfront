import React from 'react';
import clsx from 'clsx';

import { MonthCalendar } from 'lib/DateFunctions';
import WeekDay from './WeekDay';
import Monthly from './Monthly';

interface OwnProps {
  monthCalendar: MonthCalendar,
  year: number,
  month: number,
  start: { year: number, month: number, day: number },
  end: { year: number, month: number, day: number },
}

type Props = OwnProps;

const Calendar: React.FC<Props> = (props) => {
  return(
    <section className={clsx('w-full', 'h-full', 'flex', 'flex-col')} id='calendar'>
      <WeekDay />
      <Monthly {...props}/>
    </section>
  )
}

export default Calendar;