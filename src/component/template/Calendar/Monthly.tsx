import React from 'react';
import clsx from 'clsx';

import Link from 'component/parts/ExLink';

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
    <ol className={clsx('flex', 'flex-col', 'h-full')}>
      {monthCalendar.map((week, i) => (
        <ol key={`cal-${year}-${month}-week-${i + 1}`} className={clsx('flex', 'flex-row', 'w-full', 'h-full')}>
          {week.map((day) => (
            <li key={`cal-${year}-${month}-week-${i + 1}-wd-${day.weekDay}` } className={clsx('w-full')}>
              {check({...day}) ? (
                <Link href={isToday(day) ? '/' : '/schedule/[year]/[month]/[day]'} as={isToday(day) ? '/' : `/schedule/${day.year}/${day.month}/${day.day}`} linkPrefetch={prefetch}>
                  <a>
                    <div className={clsx('h-full', 'text-center', 'rounded-sm', 'border', 'active:bg-gray-200', 'hover:bg-opacity-25')} >
                      <span className={clsx({['text-gray-400']: day.year !== year || day.month !== month}, 'text-sm')} style={{transition: 'all .15 ease'}}>
                        {day.day}
                      </span>
                    </div>
                  </a>
                </Link>
              ): (
                <div className={clsx('h-full', 'text-center', 'rounded-sm', 'border', 'bg-gray-200')}>
                  <span className={clsx({['text-gray-400']:day.year !== year || day.month !== month}, 'text-sm')}>
                    {day.day}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      ))}
    </ol>
  )
}

export default Monthly;