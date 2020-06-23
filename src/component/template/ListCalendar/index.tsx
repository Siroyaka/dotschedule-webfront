import React from 'react';
import clsx from 'clsx';

import Link from 'next/link';

import { MonthCalendar } from 'modules/DateFunctions';

interface OwnProps {
  monthCalendar: MonthCalendar,
  year: number,
  month: number,
  start: { year: number, month: number, day: number },
  end: { year: number, month: number, day: number },
  avaters?: { [key: number]: string[] } | null
}

type Props = OwnProps;

const ListCalendar: React.FC<Props> = (props) => {
  const { year, month, monthCalendar, start, end, avaters } = props;

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

  const getAvaters = (day: number) => {
    if(avaters === undefined) return [];
    if(avaters === null) return [];
    if(!(day in avaters)) return [];
    return avaters[day];
  }

  return(
    <section className={clsx('w-full', 'h-full', 'overflow-y-auto')} id='list'>
      <ol className={clsx('w-full', 'mt-1', 'mb-8')}>
        {monthCalendar.map((week) => (
          week.filter((day) => day.year === year && day.month === month).map((day) => (
            check(day) ? (
              <li key={`list-calendar-${day.year}-${day.month}-${day.day}`} className={clsx('flex', 'flex-row', 'border')}>
                <div className={clsx('w-8')}>
                  <span>{day.day}</span>
                </div>
                <Link href={'/schedule/[year]/[month]/[day]'} as={`/schedule/${day.year}/${day.month}/${day.day}`} prefetch={false}>
                  <a className={clsx('w-full', 'flex', 'flex-wrap', 'flex-row', 'mx-1', 'my-1', 'md:h-16', 'h-12')}>
                    {getAvaters(day.day).map((avater, i) => (
                      <img
                        key={`list-calendar-${day.year}-${day.month}-${day.day}-avater-${i}`}
                        className={clsx('md:w-8', 'md:h-8', 'w-5', 'h-5', 'rounded-full')}
                        src={avater}
                      />
                    ))}
                  </a>
                </Link>
              </li>
            ) : (
              null
            )
          ))
        ))}
      </ol>
    </section>
  )
}

export default ListCalendar;