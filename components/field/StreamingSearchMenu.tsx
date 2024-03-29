'use client';
import React from 'react';

import Link from 'next/link';

import { AccordionArrowSvg } from 'components/parts/svgIcons';
import SwitchButton from 'components/parts/switchbutton';
import Stepper from 'components/parts/stepper';

import MiniCalendar from 'components/standalone/MiniCalendar';
import { IDate, iDateToString } from 'library/DateFunctions';

import LinkAlways from 'components/parts/link_always';

interface Props {
    memberList: SearchMember[]
    rangeStart: IDate
    rangeEnd: IDate
    c, s: string
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
    sort: "newer" | "older"
    maxResult: number
    viewmode: 'card' | 'list'
}

const defaultPageValue: PageValue = {
    members: [],
    title: '',
    tags: [],
    sort: "newer",
    maxResult: 20,
    viewmode: 'card'
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

const pageValueToLinkQuery = ({members, from, to, title, tags, sort, maxResult, viewmode}: PageValue, c, s: string) => {
    return {
        'members': members?.join(',') ?? '',
        'from': from !== undefined ? iDateToString(from, '-', true) : '',
        'to': to !== undefined ? iDateToString(to, '-', true) : '',
        'title': title?.replaceAll(';', '') ?? '',
        'page': 1,
        'tags': tags?.join(',') ?? '',
        'sort': sort,
        'maxresult': Math.max(Math.min(maxResult, 200), 1),
        'viewmode': viewmode,
        'c': c,
        's': s
    }
}

type SearchMenuAction = {
    type: 'changeMember',
    id: string,
    isSelect: boolean
} | {
    type: 'setTitle',
    title: string
} | {
    type: 'changeDate',
    calendarType: 'from' | 'to',
    date: IDate,
} | {
    type: 'setMiniCalendarVisible',
    calendarType: 'from' | 'to'
} | {
    type: 'setModalModeOff'
} | {
    type: 'switchSortOrder',
    flg: boolean
} | {
    type: 'setMaxResult',
    value: number
} | {
    type: 'switchSearchResultViewMode',
    flg: boolean
};

const createMemberState = (state: PageState, { id, isSelect }: {id: string, isSelect: boolean}): PageState => {
    const newMemberList = state.memberList.map(y => {
        if (y.ID === id) {
            return { ...y, isSelect: isSelect }
        }
        return { ...y }
    });
    const selectedMemberIDs = newMemberList.filter(x => x.isSelect).map(x => x.ID);
    const newPageValue = {
        ...state.pageValue,
        members: selectedMemberIDs
    }
    return {
        ...state,
        memberList: newMemberList,
        pageValue: newPageValue
    }
};

const createTitle = (state: PageState, { title }: { title: string }): PageState => {
    const newPageValue = {
        ...state.pageValue,
        title: title,
    }
    return {
        ...state,
        pageValue: newPageValue
    }
};

const changeDate = (state: PageState, { calendarType, date }: { calendarType: 'from' | 'to', date: IDate }): PageState => {
    let pageValue = {...state.pageValue };
    switch (calendarType) {
        case 'from': {
            pageValue = {...state.pageValue, from: date}
            break;
        }
        case 'to': {
            pageValue = {...state.pageValue, to: date}
            break;
        };
    }

    return {
        ...state,
        pageValue: pageValue,
        modalMode: 'none',
        calendarState: 'none'
    }
};

const calendarVisible = (state: PageState, { calendarType }: { calendarType: 'from' | 'to' }): PageState => {
    if (state.modalMode === 'none') {
        return {
            ...state,
            modalMode: 'calendar',
            calendarState: calendarType
        }
    }
    return {
        ...state,
        calendarState: 'none',
        modalMode: 'none'
    }
}

const StreamingSearchMenu: React.FC<Props> = ({memberList, rangeStart, rangeEnd, c, s}) => {

    const reducer = (state: PageState, action: SearchMenuAction): PageState => {
        switch (action.type) {
            case 'changeMember': return createMemberState(state, action);
            case 'setTitle': return createTitle(state, action);
            case 'changeDate': return changeDate(state, action);
            case 'setMiniCalendarVisible': return calendarVisible(state, action);
            case 'setModalModeOff': {
                return {
                    ...state,
                    modalMode: 'none'
                }
            }
            case 'switchSortOrder': {
                const sort = action.flg ? 'newer': 'older';
                return {
                    ...state,
                    pageValue: {
                        ...state.pageValue,
                        sort
                    }
                }
            }
            case 'setMaxResult': {
                const newMaxResult = state.pageValue.maxResult + action.value;
                if (newMaxResult > 200 || newMaxResult < 20) {
                    return state;
                }
                return {
                    ...state,
                    pageValue: {
                        ...state.pageValue,
                        maxResult: newMaxResult
                    }
                }
            }
            case 'switchSearchResultViewMode': {
                const newSearchResultViewMode = action.flg ? 'card' : 'list';
                return {
                    ...state,
                    pageValue: {
                        ...state.pageValue,
                        viewmode: newSearchResultViewMode
                    }
                }
            }
        }
    }

    const [state, dispatch] = React.useReducer(reducer, {
        memberList,
        pageValue: defaultPageValue,
        calendarState: 'none',
        modalMode: 'none'
    });

    const [openTitleInput, setOpenTitleInput] = React.useState(true);
    const [openEnrollment, setOpenEnrollment] = React.useState(true);
    const [openUnEnrollment, setOpenUnEnrollment] = React.useState(false);
    const [openDateSelector, setOpenDateSelector] = React.useState(false);
    const [openOptionMenu, setOpenOptionMenu] = React.useState(false);

    return (
        <React.Fragment>
            <div
            id='search-title-input'
            >
                <ListCabinet openCloseFunction={setOpenTitleInput} isOpen={openTitleInput} title='タイトル'>
                    <input className='border-2 mx-4' name='streaming-title' onChange={(e) => dispatch({type: 'setTitle', title: e.target.value})}/>
                </ListCabinet>
            </div>
            <div
            id='search-member-selector-enrollment'
            className='mt-2'
            >
                <ListCabinet openCloseFunction={setOpenEnrollment} isOpen={openEnrollment} title='所属メンバー'>
                    <IconsSelector list={state.memberList.filter(x => x.Enrollment === 1)} setMemberState={(id, isSelect) => dispatch({type: 'changeMember', id, isSelect})}/>
                </ListCabinet>
            </div>
            <div
            id='search-member-selector-unenrollment'
            className='mt-2'
            >
                <ListCabinet openCloseFunction={setOpenUnEnrollment} isOpen={openUnEnrollment} title='卒業したメンバー'>
                    <IconsSelector list={state.memberList.filter(x => x.Enrollment === 0)} setMemberState={(id, isSelect) => dispatch({type: 'changeMember', id, isSelect})}/>
                </ListCabinet>
            </div>
            <div id='search-calendar-area' className='mt-2'>
                <ListCabinet openCloseFunction={setOpenDateSelector} isOpen={openDateSelector} title='日付入力'>
                    <div className='relative flex mx-4 item-right'>
                        <div className='relative px-1 border-b-2 min-w-[130px]'>
                            <button className='absolute inset-y-0 w-full' onClick={() => dispatch({type: 'setMiniCalendarVisible', calendarType: 'from'})} />
                            <h1 className='text-left'>
                                from:
                                <span className='text-lg ml-1'>{state.pageValue.from ? iDateToString(state.pageValue.from, '/') : ''}</span>
                            </h1>
                        </div>
                        <div className='mx-4 text-center'>
                            <span className='text-xl'>〜</span>
                        </div>
                        <div className='relative px-1 border-b-2 min-w-[120px]'>
                            <button className='absolute inset-y-0 w-full ' onClick={() => dispatch({type: 'setMiniCalendarVisible', calendarType: 'to'})}/>
                            <h1 className='text-left'>
                                to:
                                <span className='text-lg ml-1'>{state.pageValue.to ? iDateToString(state.pageValue.to, '/') : ''}</span>
                            </h1>
                        </div>
                        {
                            state.modalMode === 'calendar' ? (
                                <aside
                                    id='calendar'
                                    className={`
                                        fixed z-50 top-20
                                        min-w-[300px] max-w-[350px]
                                        max-h-[550px] 
                                        bg-white
                                        border shadow
                                    `}
                                >
                                    <MiniCalendar
                                        defaultDate={state.calendarState === 'from' ? state.pageValue.from : state.pageValue.to}
                                        setDate={(date) => dispatch({type: 'changeDate', calendarType: (state.calendarState === 'from' ? 'from' : 'to'), date})}
                                        title={state.calendarState}
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
            <div id='search-option-area' className='mt-2'>
                <ListCabinet openCloseFunction={setOpenOptionMenu} isOpen={openOptionMenu} title='Option'>
                    <div className='flex flex-wrap gap-4'>
                        <div className='text-center border-2 py-1 rounded-lg'>
                            <div className='py-1 px-2 border-b h-1/2 flex items-center justify-center'>
                                <h1 className='text-sm sm:text-base'>並び順</h1>
                            </div>
                            <div className='flex gap-2 px-2 pt-1 h-1/2 items-center'>
                                <a className='whitespace-nowrap text-sm sm:text-base'>古い順</a>
                                <SwitchButton
                                    className=''
                                    onClick={(flg) => dispatch({type: 'switchSortOrder', flg})}
                                    isOn={state.pageValue.sort === 'newer'}
                                    offModeColor='blue'
                                />
                                <a className='whitespace-nowrap text-sm sm:text-base'>新しい順</a>
                            </div>
                        </div>
                        <div className='rounded-lg border-2 flex flex-col justify-between'>
                            <div className='py-1 border-b h-1/2 px-12 flex items-center justify-center'>
                                <h1 className='text-sm sm:text-base'>表示数</h1>
                            </div>
                            <Stepper className='h-1/2 text-sm sm:text-base' onClick={(value) => dispatch({type: 'setMaxResult', value})} mode='both' enableStep={state.pageValue.maxResult <= 20 ? 'up' : state.pageValue.maxResult >= 200 ? 'down' : 'both'} stepValue={20} value={state.pageValue.maxResult}>
                                {state.pageValue.maxResult}
                            </Stepper>
                        </div>
                        <div className='rounded-lg border-2 py-1'>
                            <div className='py-1 border-b h-1/2 px-12 flex items-center justify-center'>
                                <h1 className='text-sm sm:text-base'>Mode</h1>
                            </div>
                            <div className='flex gap-2 px-2 pt-1 h-1/2 items-center'>
                                <a className='whitespace-nowrap text-sm sm:text-base'>List</a>
                                <SwitchButton
                                    className=''
                                    onClick={(flg) => dispatch({type: 'switchSearchResultViewMode', flg})}
                                    isOn={state.pageValue.viewmode === 'card'}
                                    offModeColor='blue'
                                />
                                <a className='whitespace-nowrap text-sm sm:text-base'>Card</a>
                            </div>
                        </div>
                    </div>
                </ListCabinet>
            </div>
            <div id='search-button' className='text-right mt-4'>
                <LinkAlways
                    className={`
                        inline-block bg-gray-200 rounded
                        px-4 py-2 mx-4
                        shadow-gray-600/100
                        click-action-item
                        text-xl
                        `}
                    draggable={false}
                    prefetch={false}
                    pathname='/streaming/search'
                    query={pageValueToLinkQuery(state.pageValue, c, s)}
                >
                    検索
                </ LinkAlways>
            </div>
            {
                state.modalMode !== 'none' ? (
                    <aside className='absolute h-full w-full z-[45] bg-black bg-opacity-30 top-0 left-0' onClick={() => dispatch({type: 'setModalModeOff'})}>

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