import React from 'react';

import { NavigationBeforeSvg, NavigationNextSvg } from 'components/parts/svgIcons';
import { IDate, getMonthCalendar, getJTCNow } from 'library/DateFunctions';

interface MiniCalendarState {
    calendar: Readonly<Required<IDate>>[][],
    year: number,
    month: number,
    enableCalendarShift: {
        nextMonth: boolean,
        prevMonth: boolean,
    }
}

const createEnableCalendarShift = (year: number, month: number, allowDateRange?: {from: IDate, to: IDate}) => {
    if (allowDateRange === undefined) {
        return {
            nextMonth: true,
            prevMonth: true,
        }
    }
    return {
        nextMonth: allowDateRange.to.year > year || (allowDateRange.to.year === year && allowDateRange.to.month > month),
        prevMonth: allowDateRange.from.year < year || (allowDateRange.from.year === year && allowDateRange.from.month < month),
    }

}

const MiniCalendarNavigation: React.FC<{
    children?: React.ReactNode,
    onClick: (number) => void,
    value: number,
    disable: boolean
}> = ({
    children,
    onClick,
    value,
    disable
}) => {
    if (disable) {
        return (
            <div className='h-8 w-8 rounded-full flex items-center justify-center text-gray-200'>
                {children}
            </div>
        )
    }
    return (
    <button className='h-8 w-8 rounded-full flex items-center justify-center' onClick={() => onClick(value)}>
        {children}
    </button>
    )
}

const MiniCalendar: React.FC<{
    defaultDate?: IDate
    setDate?: (IDate) => void, title?: string,
    allowDateRange?: {
        from: IDate,
        to: IDate
    }
}> = ({
    defaultDate,
    setDate, title,
    allowDateRange,
}) => {
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
    const now = getJTCNow();
    const year = defaultDate?.year ?? now.getFullYear();
    const month = defaultDate?.month ?? now.getMonth() + 1;
    const enableCalendarShift = createEnableCalendarShift(year, month, allowDateRange);

    const [state, dispatch] = React.useReducer((state, addMonth: number) => {
        let nextMonth = state.month + addMonth;
        let nextYear = state.year;
        while (nextMonth < 1) {
            nextMonth += 12;
            nextYear -= 1;
        }
        while (nextMonth > 12) {
            nextMonth -= 12;
            nextYear += 1;
        }

        if (allowDateRange !== undefined) {
            if (allowDateRange.from.year > nextYear || (allowDateRange.from.year === nextYear && allowDateRange.from.month > nextMonth)) {
                nextYear = allowDateRange.from.year;
                nextMonth = allowDateRange.from.month;
            }

            if (allowDateRange.to.year < nextYear || (allowDateRange.to.year === nextYear && allowDateRange.to.month < nextMonth)) {
                nextYear = allowDateRange.to.year;
                nextMonth = allowDateRange.to.month;
            }
        }

        const enableCalendarShift = createEnableCalendarShift(nextYear, nextMonth, allowDateRange);

        return {
            ...state,
            calendar: getMonthCalendar(nextYear, nextMonth),
            year: nextYear,
            month: nextMonth,
            enableCalendarShift
        }
    }, {
        calendar: getMonthCalendar(year, month),
        year,
        month,
        enableCalendarShift
    });


    return (
        <section id='minicalendar'>
            <header className='my-4'>
                <div className='ml-4 mb-2'>
                    <h1>{title}</h1>
                </div>
                <div className='flex items-center justify-between mx-4 border-b-2'>
                    <MiniCalendarNavigation onClick={dispatch} value={-12} disable={!state.enableCalendarShift.prevMonth}>
                        <NavigationBeforeSvg className='w-8 h-8'/>
                    </MiniCalendarNavigation>
                    {state.year}年
                    <MiniCalendarNavigation onClick={dispatch} value={12} disable={!state.enableCalendarShift.nextMonth}>
                        <NavigationNextSvg className='w-8 h-8'/>
                    </MiniCalendarNavigation>
                </div>
                <div className='flex items-center justify-between mt-2 mx-4'>
                    <MiniCalendarNavigation onClick={dispatch} value={-1} disable={!state.enableCalendarShift.prevMonth}>
                        <NavigationBeforeSvg className='w-8 h-8'/>
                    </MiniCalendarNavigation>
                    {state.month}月
                    <MiniCalendarNavigation onClick={dispatch} value={1} disable={!state.enableCalendarShift.nextMonth}>
                        <NavigationNextSvg className='w-8 h-8'/>
                    </MiniCalendarNavigation>
                </div>
            </header>
            <ol className='grid grid-cols-7 m-2'>
                {weekDays.map((weekDay) => (
                    <React.Fragment key={`cal-${state.year}-${state.month}-weekday-${weekDay}`}>
                        <li className='text-center text-ml'>
                            {weekDay}
                        </li>
                    </React.Fragment>
                ))}
                {state.calendar.map((week, i) => (
                <React.Fragment key={`cal-${state.year}-${state.month}-week-${i + 1}`}>
                    {week.map((day) => (
                    <li
                        key={`cal-${state.year}-${state.month}-week-${i + 1}-wd-${day.weekDay}`}
                        className='flex text-center min-h-[50px] justify-center items-center'
                    >
                        {
                            !day.otherMonth ? (
                                <button className='bg-green-200 rounded-full h-8 w-8' onClick={() => setDate ? setDate(day) : null}>
                                    <span className={'text-ml'}>
                                        {day.otherMonth ? '' : day.day}
                                    </span>
                                </button>
                            ) : (
                                <span></span>
                            )
                        }
                    </li>
                    ))}
                </React.Fragment>
                ))}
            </ol>
        </section>
    )
}


export default MiniCalendar;