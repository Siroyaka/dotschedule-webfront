import React from 'react';
import Image from 'next/image';

import Link from 'next/link';

import { MonthCalendar } from 'library/DateFunctions';

interface OwnProps {
    monthCalendar: MonthCalendar,
    year: number,
    month: number,
    avaters?: { [key: number]: string[] } | null
}

type Props = OwnProps;

const ListCalendar: React.FC<Props> = (props) => {
    const { year, month, monthCalendar, avaters } = props;

    const getAvaters = (day: number) => {
        if (avaters === undefined) return [];
        if (avaters === null) return [];
        if (!(day in avaters)) return [];
        return avaters[day];
    }

    return (
        <section className='w-full h-full overflow-y-auto' id='list'>
            <ol className='w-full mt-1 mb-8 border-t-2'>
                {monthCalendar.map((week) => (
                    week.filter((day) => day.year === year && day.month === month).map((day) => (
                        <li key={`list-calendar-${day.year}-${day.month}-${day.day}`} className='relative border-b-2 px-2 active:bg-blue-100 ease-in-out transform transition-colors duration-150' style={{ minHeight: '5rem' }}>
                            <Link
                                href={{
                                    pathname: `/streaming/day/${day.year}/${day.month}/${day.day}`
                                }}
                                className='w-full h-full absolute top-0 left-0'
                            >
                            </Link>
                            <div className='flex flex-row'>
                                <div className='w-8'>
                                    <span>{day.day}</span>
                                </div>
                                <div className='w-full grid mx-1 my-1 justify-start gap-1' style={{ gridTemplateColumns: 'repeat(auto-fit, 2rem)' }}>
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
                    )
                    ))
                )}
            </ol>
        </section>
    )
}

export default ListCalendar;