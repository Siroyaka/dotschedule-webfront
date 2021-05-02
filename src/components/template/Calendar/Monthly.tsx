import React from 'react';
import clsx from 'clsx';

import Link from 'components/parts/ExLink';

import { MonthCalendar } from 'lib/DateFunctions';

interface OwnProps {
  year: number,
  month: number,
  monthCalendar: MonthCalendar,
  start: { year: number, month: number, day: number },
  end: { year: number, month: number, day: number },
}

type Props = OwnProps;

const Monthly: React.FC<Props> = (props) => {
  const { year, month, monthCalendar, start, end } = props;
  const check = (d: { year: number, month: number, day: number }) => {
    const afterStart = d.year > start.year || (
        d.year === start.year && (
          d.month > start.month ||
          d.month === start.month && d.day >= start.day
          )
        );
    const beforeEnd = d.year < end.year || (
        d.year === end.year && (
          d.month < end.month ||
          d.month === end.month && d.day <= end.day
          )
        );
    return afterStart && beforeEnd;
  }

  // 3か月以内はprefetchする。それ以前はしない。
  const prefetch = ((end.year - year) * 12 + end.month - month) <= 3;

  const isToday = (d: {year: number, month: number, day: number}) => {
    return d.year === end.year && d.month === end.month && d.day === end.day;
  }

  return(
    <div className='w-full h-full'>
      <ol className='grid grid-cols-7 h-full w-full'>
        {monthCalendar.map((week, i) => (
          <React.Fragment key={`cal-${year}-${month}-week-${i + 1}`}>
            {week.map((day) => (
              <li key={`cal-${year}-${month}-week-${i + 1}-wd-${day.weekDay}` } className='w-full active:bg-blue-100 relative'>
                {check({...day}) ? (
                  <React.Fragment>
                    <div className='h-full text-center rounded-sm border' >
                      <span className={clsx({['text-gray-400']: day.year !== year || day.month !== month}, 'text-sm')} style={{transition: 'all .15 ease'}}>
                        {day.day}
                      </span>
                    </div>
                    <Link href={isToday(day) ? '/' : '/schedule/[year]/[month]/[day]'} as={isToday(day) ? '/' : `/schedule/${day.year}/${day.month}/${day.day}`} linkPrefetch={prefetch}>
                      <a className='absolute top-0 left-0 w-full h-full' />
                    </Link>
                  </React.Fragment>
                ): (
                  <div className='h-full text-center rounded-sm border bg-gray-200'>
                    <span className={clsx({['text-gray-400']:day.year !== year || day.month !== month}, 'text-sm')}>
                      {day.day}
                    </span>
                  </div>
                )}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ol>
    </div>
  )
}

export default Monthly;