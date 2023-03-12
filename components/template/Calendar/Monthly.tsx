import React from 'react';
import clsx from 'clsx';

import Link from 'next/link';

import { MonthCalendar } from 'library/DateFunctions';

interface OwnProps {
  year: number,
  month: number,
  monthCalendar: MonthCalendar,
  prefetch: boolean,
}

type Props = OwnProps;

const Monthly: React.FC<Props> = (props) => {
  const { year, month, monthCalendar, prefetch } = props;

  return(
    <div className='w-full h-full'>
      <ol className='grid grid-cols-7 h-full w-full'>
        {monthCalendar.map((week, i) => (
          <React.Fragment key={`cal-${year}-${month}-week-${i + 1}`}>
            {week.map((day) => (
              <li key={`cal-${year}-${month}-week-${i + 1}-wd-${day.weekDay}` } className='w-full active:bg-blue-100 relative'>
                <React.Fragment>
                  <div className='h-full text-center rounded-sm border' >
                    <span className={clsx({['text-gray-400']: day.year !== year || day.month !== month}, 'text-sm')} style={{transition: 'all .15 ease'}}>
                      {day.day}
                    </span>
                  </div>
                  <Link
                    className='absolute top-0 left-0 w-full h-full'
                    href={{
                      pathname: `/streaming/day/${day.year}/${day.month}/${day.day}`
                    }}
                    prefetch={prefetch}
                  >
                  </Link>
                </React.Fragment>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ol>
    </div>
  )
}

export default Monthly;