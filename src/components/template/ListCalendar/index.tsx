import React from 'react';
import Image from 'next/image';

import Link from 'src/components/parts/ExLink';

import { MonthCalendar } from 'src/lib/DateFunctions';

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

  // 3か月以内はprefetchする。それ以前はしない。
  const prefetch = ((end.year - year) * 12 + end.month - month) <= 3;

  return(
    <section className='w-full h-full overflow-y-auto' id='list'>
      <ol className='w-full mt-1 mb-8 border-t-2'>
        {monthCalendar.map((week) => (
          week.filter((day) => day.year === year && day.month === month).map((day) => (
            check(day) ? (
              <li key={`list-calendar-${day.year}-${day.month}-${day.day}`} className='relative border-b-2 px-2 active:bg-blue-100 ease-in-out transform transition-colors duration-150' style={{minHeight: '5rem'}}>
                <Link legacyBehavior href={'/schedule/[year]/[month]/[day]'} as={`/schedule/${day.year}/${day.month}/${day.day}`} linkPrefetch={prefetch}>
                  <a className='w-full h-full absolute top-0 left-0' />
                </Link>
                <div className='flex flex-row'>
                  <div className='w-8'>
                    <span>{day.day}</span>
                  </div>
                  <div className='w-full grid mx-1 my-1 justify-start gap-1' style={{gridTemplateColumns: 'repeat(auto-fit, 2rem)'}}>
                    {getAvaters(day.day).map((avater, i) => (
                      (avater && avater.length > 0) &&
                      <Image
                        height={50}
                        width={50}
                        key={`list-calendar-${day.year}-${day.month}-${day.day}-avater-${i}`}
                        alt={`list-calendar-${day.year}-${day.month}-${day.day}-avater-${i}`}
                        className='w-8 h-8 rounded-full mr-1 mb-1'
                        src={avater}
                      />
                    ))}
                  </div>
                </div>
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