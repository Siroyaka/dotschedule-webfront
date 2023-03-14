'use client';
import React from 'react';

import Link from 'next/link';

import {
    NavigationBeforeSvg,
    NavigationNextSvg,
    CloseSvg
} from 'components/parts/svgIcons';
import { AccordionArrowSvg } from 'components/parts/svgIcons';

import { getMonthCalendar } from 'library/DateFunctions';
import { IDate, iDateToString, getJTCNow } from 'library/DateFunctions';

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
    members?: string[]
    from?: IDate
    to?: IDate
    title?: string
    tags?: string[]
}

const IconsSelector: React.FC<{list: SearchMember[], setMemberState: (id: string, isSelect: boolean) => void}> = ({list, setMemberState}) => {
    return (
        <ul className='w-full flex flex-wrap items-start justify-center transition animation-spin'>
            {list.map((data, i) =>
                <li key={`charactor-icon-${i}`} className={'m-1 sm:m-2 min-w-max'}>
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
                    <h1 className='ml-2 text-xs sm:text-base'>
                        ■ {title}
                    </h1>
                    <div className={`${isOpen ? 'rotate-[-180deg]' : ''} duration-300 transition text-gray-400`}>
                        <AccordionArrowSvg className='w-6 sm:w-8'/>
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
    month: number,
    enableCalendarShift: {
        nextMonth: boolean,
        prevMonth: boolean,
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
    const [calendarState, setCalendarState] = React.useState<MiniCalendarState>({
        calendar: getMonthCalendar(year, month),
        year,
        month,
        enableCalendarShift
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
        })
    }, [])
    return (
        <section id='minicalendar'>
            <header className='my-4'>
                <div className='ml-4 mb-2'>
                    <h1>{title}</h1>
                </div>
                <div className='flex items-center justify-between mx-4 border-b-2'>
                    <MiniCalendarNavigation onClick={moveCalendarView} value={-12} disable={!calendarState.enableCalendarShift.prevMonth}>
                        <NavigationBeforeSvg />
                    </MiniCalendarNavigation>
                    {calendarState.year}年
                    <MiniCalendarNavigation onClick={moveCalendarView} value={12} disable={!calendarState.enableCalendarShift.nextMonth}>
                        <NavigationNextSvg />
                    </MiniCalendarNavigation>
                </div>
                <div className='flex items-center justify-between mt-2 mx-4'>
                    <MiniCalendarNavigation onClick={moveCalendarView} value={-1} disable={!calendarState.enableCalendarShift.prevMonth}>
                        <NavigationBeforeSvg />
                    </MiniCalendarNavigation>
                    {calendarState.month}月
                    <MiniCalendarNavigation onClick={moveCalendarView} value={1} disable={!calendarState.enableCalendarShift.nextMonth}>
                        <NavigationNextSvg />
                    </MiniCalendarNavigation>
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

const pageValueIsBlank = ({members, title, tags, from, to}: PageValue) => {
    const membersBlank = (members?.length ?? 0) === 0;
    const titleBlank = (title?.length ?? 0) === 0;
    const tagsBlank = (tags?.length ?? 0) === 0;
    const fromBlank = from === undefined;
    const toBlank = to === undefined;
    return membersBlank && titleBlank && tagsBlank && fromBlank && toBlank;
}

const pageValueToLinkQuery = ({members, from, to, title, tags}: PageValue) => {
    return {
        'members': members?.join(',') ?? '',
        'from': from !== undefined ? iDateToString(from, '-', true) : '',
        'to': to !== undefined ? iDateToString(to, '-', true) : '',
        'title': title?.replaceAll(';', '') ?? '',
        'page': 1,
        'tags': tags?.join(',') ?? '',
    }
}

const StreamingSearchMenu: React.FC<Props> = ({memberList, rangeStart, rangeEnd}) => {
    const [pageState, setPageState] = React.useState<PageState>({
        memberList,
        pageValue: {
            members: [],
            title: '',
            tags: []
        },
        calendarState: 'none',
        modalMode: 'none'
    })

    const [openTitleInput, setOpenTitleInput] = React.useState(true);
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

    const setTitle = React.useCallback((title: string) => {
        setPageState(x => {
            const newPageValue = {
                ...x.pageValue,
                title: title,
            }
            return {
                ...x,
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
    }, []);

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
    }, []);

    return (
        <React.Fragment>
            <div
            id='search-title-input'
            >
                <ListCabinet openCloseFunction={setOpenTitleInput} isOpen={openTitleInput} title='タイトル'>
                    <input className='border-2 mx-4' name='streaming-title' onChange={(e) => setTitle(e.target.value)}/>
                </ListCabinet>
            </div>
            <div
            id='search-member-selector-enrollment'
            className='mt-2'
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
                    <div className='relative flex mx-4 item-right'>
                        <div className='relative px-1 border-b-2 min-w-[130px]'>
                            <button className='absolute inset-y-0 w-full' onClick={() => setCalendarVisible('from')} />
                            <h1 className='text-left'>
                                from:
                                <span className='text-lg ml-1'>{pageState.pageValue.from ? iDateToString(pageState.pageValue.from, '/') : ''}</span>
                            </h1>
                        </div>
                        <div className='mx-4 text-center'>
                            <span className='text-xl'>〜</span>
                        </div>
                        <div className='relative px-1 border-b-2 min-w-[120px]'>
                            <button className='absolute inset-y-0 w-full ' onClick={() => setCalendarVisible('to')}/>
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
                                        fixed z-50 top-20
                                        min-w-[300px] max-w-[350px]
                                        max-h-[450px]
                                        bg-white
                                        border shadow
                                    `}
                                >
                                    <MiniCalendar
                                        defaultDate={pageState.calendarState === 'from' ? pageState.pageValue.from : pageState.pageValue.to}
                                        setDate={pageState.calendarState === 'from' ? changeFromDateState : changeToDateState}
                                        title={pageState.calendarState}
                                        allowDateRange={{
                                            from: rangeStart,
                                            to: rangeEnd
                                        }}
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
                {
                    !pageValueIsBlank(pageState.pageValue) ? (
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
                    ) : (
                        <a
                            className={`
                            inline-block bg-gray-200 rounded
                            px-4 py-2 mx-4
                            shadow-gray-600/100
                            text-gray-400
                            click-nonaction-item
                            text-xl
                            `}
                            draggable={false}
                        >
                            検索
                        </a>
                    )
                }
            </div>
            {
                pageState.modalMode !== 'none' ? (
                    <aside className='absolute h-full w-full z-[45] bg-black bg-opacity-30 top-0 left-0' onClick={() => setModalOff()}>

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