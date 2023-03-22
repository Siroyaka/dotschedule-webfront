import React from 'react';

import { MonthCalendar } from 'library/DateFunctions';
import WeekDay from './WeekDay';
import Monthly from './Monthly';

interface OwnProps {
  monthCalendar: MonthCalendar,
  year: number,
  month: number,
}

type Props = OwnProps;

const Calendar: React.FC<Props> = (props) => {
  return(
    <section className='w-full h-full flex flex-col' id='calendar'>
      <WeekDay />
      <Monthly {...props}/>
    </section>
  )
}

export default Calendar;