'use client';
import React from 'react';

import Link from 'next/link';

import {
  NavigationBeforeSvg,
  NavigationNextSvg,
} from 'components/parts/svgIcons';
import { AccordionArrowSvg } from 'components/parts/svgIcons';

import { getMonthCalendar } from 'library/DateFunctions';
import { IDate, iDateToString } from 'library/DateFunctions';

interface Props {
    memberList: SearchMember[]
    rangeStart: IDate
    rangeEnd: IDate
}

interface PageState {
    memberList: SearchMember[]
    pageValue: PageValue
    calendarState: 'none' | 'from' | 'to'
    modalMode: 'none' | 'calendar'
}

interface PageValue {
    members: string[]
    from?: IDate
    to?: IDate
}

const IconsSelector: React.FC<{list: SearchMember[], setMemberState: (id: string, isSelect: boolean) => void}> = ({list, setMemberState}) => {
    return (
        <ul className='w-full flex flex-wrap items-start justify-center transition animation-spin'>
            {list.map((data, i) =>
                <li key={`charactor-icon-${i}`} className={'m-2 min-w-max'}>
                    <button
                        className={`
                            searchmenu-button ${data.isSelect ? 'searchmenu-button-on' : 'searchmenu-button-off'}
                        `}
                        onClick={() => setMemberState(data.ID, !data.isSelect)}
                    >
                        {data.Name}
                    </button>
                </li>
            )}
        </ul>
    )
}

const ListCabinet: React.FC<{openCloseFunction: (boolean) => void, isOpen: boolean, children?: React.ReactNode, title: string}> = ({openCloseFunction, isOpen, children, title}) => {
    return (
        <React.Fragment>
            <div className='relative bg-gray-100'>
                <div className='w-full flex justify-between align-middle items-center'>
                    <h1 className='ml-2 text-md'>
                        ■ {title}
                    </h1>
                    <div className={`${isOpen ? 'rotate-[-180deg]' : ''} duration-300 transition text-gray-400`}>
                        <AccordionArrowSvg size={30}/>
                    </div>
                </div>
                <button onClick={() => openCloseFunction(x => !x)} className='absolute w-full inset-y-0' />
            </div>
            <div className={`${isOpen ? 'py-2' : 'hidden-item'}`}>
                {children}
            </div>
        </React.Fragment>
    )
}

interface MiniCalendarState {
    calendar: Readonly<Required<IDate>>[][],
    year: number,
    month: number
}

const MiniCalendar: React.FC<{
    defaultDate?: IDate
    setDate?: (IDate) => void, title?: string
}> = ({
    defaultDate,
    setDate, title
}) => {
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
    const defaultYear = defaultDate?.year ?? 2024;
    const defaultMonth = defaultDate?.month ?? 1;
    const [calendarState, setCalendarState] = React.useState<MiniCalendarState>({
        calendar: getMonthCalendar(defaultYear, defaultMonth),
        year: defaultYear,
        month: defaultMonth
    });
    const moveCalendarView = React.useCallback((addMonth: number) => {
        setCalendarState((state) => {
            let nextMonth = state.month + addMonth;
            let nextYear = state.year;
            while(nextMonth < 1) {
                nextMonth += 12;
                nextYear -= 1;
            }
            while(nextMonth > 12) {
                nextMonth -= 12;
                nextYear += 1;
            }
            return {
                calendar: getMonthCalendar(nextYear, nextMonth),
                year: nextYear,
                month: nextMonth
            }
        })
    }, [])
    return (
        <section id='minicalendar'>
            <header className='my-4'>
                <div className='ml-4 mb-2'>
                    <h1>{title}</h1>
                </div>
                <div className='flex items-center justify-between mx-4 border-b-2'>
                    <button className='h-8 w-8 rounded-full flex items-center justify-center' onClick={() => moveCalendarView(-12)}>
                        <NavigationBeforeSvg />
                    </button>
                    {calendarState.year}年
                    <button className='h-8 w-8 rounded-full flex items-center justify-center' onClick={() => moveCalendarView(12)}>
                        <NavigationNextSvg />
                    </button>
                </div>
                <div className='flex items-center justify-between mt-2 mx-4'>
                    <button className='h-8 w-8 rounded-full flex items-center justify-center' onClick={() => moveCalendarView(-1)}>
                        <NavigationBeforeSvg />
                    </button>
                    {calendarState.month}月
                    <button className='h-8 w-8 rounded-full flex items-center justify-center' onClick={() => moveCalendarView(1)}>
                        <NavigationNextSvg />
                    </button>
                </div>
            </header>
            <ol className='grid grid-cols-7 m-2'>
                {weekDays.map((weekDay) => (
                    <React.Fragment key={`cal-${calendarState.year}-${calendarState.month}-weekday-${weekDay}`}>
                        <li className='text-center text-ml'>
                            {weekDay}
                        </li>
                    </React.Fragment>
                ))}
                {calendarState.calendar.map((week, i) => (
                <React.Fragment key={`cal-${calendarState.year}-${calendarState.month}-week-${i + 1}`}>
                    {week.map((day) => (
                    <li
                        key={`cal-${calendarState.year}-${calendarState.month}-week-${i + 1}-wd-${day.weekDay}`}
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

const pageValueToLinkQuery = ({members, from, to}: PageValue) => {
    return {
        'members': members.join(','),
        'from': from ? iDateToString(from, '-', true) : '',
        'to': to ? iDateToString(to, '-', true): '',
        'page': 1,
    }
}

const StreamingSearchMenu: React.FC<Props> = ({memberList, rangeStart, rangeEnd}) => {
    const [pageState, setPageState] = React.useState<PageState>({
        memberList,
        pageValue: {
            members: [],
            from: rangeStart,
            to: rangeEnd,
        },
        calendarState: 'none',
        modalMode: 'none'
    })

    const [openEnrollment, setOpenEnrollment] = React.useState(true);
    const [openUnEnrollment, setOpenUnEnrollment] = React.useState(false);
    const [openDateSelector, setOpenDateSelector] = React.useState(false);

    const changeMemberState = React.useCallback((id: string, isSelect: boolean) => {
        setPageState(x => {
            const newMemberList = x.memberList.map(y => {
                if (y.ID === id) {
                    return {...y, isSelect: isSelect}
                }
                return {...y}
            });
            const selectedMemberIDs = newMemberList.filter(x => x.isSelect).map(x => x.ID);
            const newPageValue = {
                ...x.pageValue,
                members: selectedMemberIDs
            }
            return {
                ...x,
                memberList: newMemberList,
                pageValue: newPageValue
            }
        })
    }, []);

    const changeFromDateState = React.useCallback((from: IDate) => {
        setPageState(x => {
            const newPageValue = {
                ...x.pageValue,
                from: from
            }
            return {
                ...x,
                pageValue: newPageValue,
                modalMode: 'none',
                calendarState: 'none'
            }
        })
    }, [])

    const changeToDateState = React.useCallback((to: IDate) => {
        setPageState(x => {
            const newPageValue = {
                ...x.pageValue,
                to: to
            }
            return {
                ...x,
                pageValue: newPageValue,
                modalMode: 'none',
                calendarState: 'none'
            }
        })
    }, []);

    const setCalendarVisible = React.useCallback((calendarType: 'from' | 'to') => {
        setPageState(x => {
            if (x.modalMode === 'none') {
                return {
                    ...x,
                    modalMode: 'calendar',
                    calendarState: calendarType
                }
            }
            return {
                ...x,
                calendarState: 'none',
                modalMode: 'none'
            }
        })
    }, [])

    const setModalOff = React.useCallback(() => {
        setPageState(x => {
            return {
                ...x,
                modalMode: 'none'
            }
        })
    }, [])

    return (
        <React.Fragment>
            <div
            id='search-member-selector-enrollment'
            >
                <ListCabinet openCloseFunction={setOpenEnrollment} isOpen={openEnrollment} title='所属メンバー'>
                    <IconsSelector list={pageState.memberList.filter(x => x.Enrollment === 1)} setMemberState={changeMemberState}/>
                </ListCabinet>
            </div>
            <div
            id='search-member-selector-unenrollment'
            className='mt-2'
            >
                <ListCabinet openCloseFunction={setOpenUnEnrollment} isOpen={openUnEnrollment} title='卒業したメンバー'>
                    <IconsSelector list={pageState.memberList.filter(x => x.Enrollment === 0)} setMemberState={changeMemberState}/>
                </ListCabinet>
            </div>
            <div id='search-calendar-area' className='mt-2'>
                <ListCabinet openCloseFunction={setOpenDateSelector} isOpen={openDateSelector} title='日付入力'>
                    <div className='relative flex mx-4 my-2 item-right'>
                        <div className='relative px-1 border-b-2'>
                            <button className='absolute inset-y-0 w-full' onClick={() => setCalendarVisible('from')} />
                            <h1 className='text-left'>
                                from:
                                <span className='text-lg ml-1'>{pageState.pageValue.from ? iDateToString(pageState.pageValue.from, '/') : ''}</span>
                            </h1>
                        </div>
                        <div className='mx-4 text-center'>
                            <span className='text-xl'>〜</span>
                        </div>
                        <div className='relative px-1 border-b-2'>
                            <button className='absolute inset-y-0 w-full' onClick={() => setCalendarVisible('to')}/>
                            <h1 className='text-left'>
                                to:
                                <span className='text-lg ml-1'>{pageState.pageValue.to ? iDateToString(pageState.pageValue.to, '/') : ''}</span>
                            </h1>
                        </div>
                        {
                            pageState.modalMode === 'calendar' ? (
                                <aside
                                    id='calendar'
                                    className={`
                                        absolute z-50 top-10
                                        min-w-[300px] max-w-[350px]
                                        bg-white
                                        border shadow
                                    `}
                                >
                                    <MiniCalendar
                                        defaultDate={pageState.calendarState === 'from' ? pageState.pageValue.from : pageState.pageValue.to}
                                        setDate={pageState.calendarState === 'from' ? changeFromDateState : changeToDateState}
                                        title={pageState.calendarState}
                                    />
                                </aside>
                            ) : (
                                null
                            )
                        }
                    </div>
                </ListCabinet>
            </div>
            <div id='search-button' className='text-right mt-4'>
                <Link
                    href={{
                        pathname: '/streaming/search',
                        query: pageValueToLinkQuery(pageState.pageValue)
                    }}
                    className={`
                    inline-block bg-gray-200 rounded
                    px-4 py-2 mx-4
                    shadow-gray-600/100
                    click-action-item
                    text-xl
                    `}
                    draggable={false}
                    prefetch={false}
                >
                    検索
                </ Link>
            </div>
            {
                pageState.modalMode !== 'none' ? (
                    <aside className='absolute h-full w-full z-10 bg-black bg-opacity-30 top-0 left-0' onClick={() => setModalOff()}>

                    </aside>
                ) : (
                    null
                )
            }
        </React.Fragment>
    )
}

export interface SearchMember {
    Name: string
    ID: string
    Icon: string
    Enrollment: number
    isSelect: boolean
}


export default StreamingSearchMenu;