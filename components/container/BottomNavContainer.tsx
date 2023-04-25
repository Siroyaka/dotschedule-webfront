import React from 'react';

import { NavItem, LinkTab } from 'components/standalone/BottomNavigations';

import { TodaySvg, CalendarSvg, ListSvg, SearchIconSvg } from 'components/parts/svgIcons';
import { getJTCNow } from 'library/DateFunctions';

interface Props {
    linkClassName?: {
        base: string,
        match?: string,
        unmatch?: string
    }
    childClassName?: {
        base: string,
        match?: string,
        unmatch?: string
    }
}

const BottomNavContainer: React.FC<Props> = ({linkClassName, childClassName}) => {
    const now = getJTCNow();
    const nowYear = now.getFullYear().toString();
    const nowMonth = (now.getMonth() + 1).toString();
    const navItems: NavItem[] = [
        {
            title: 'Today',
            href: '/',
            icon: <TodaySvg className='w-6'/>
        },
        {
            title: 'Calendar',
            href: `/streaming/calendar/${nowYear}/${nowMonth}`,
            icon: <CalendarSvg className='w-6'/>,
            routeMatch: ['streaming', 'calendar']
        },
        {
            title: 'List',
            href: `/streaming/monthlist/${nowYear}/${nowMonth}`,
            icon: <ListSvg className='w-6'/>,
            routeMatch: ['streaming', 'monthlist']
        },
        {
            title: 'Search',
            href: '/streaming/search',
            icon: <SearchIconSvg className='w-6'/>,
            routeMatch: ['streaming', 'search']
        }
    ]
    return (
        <ul className='flex h-full'>
            {navItems.map((value) => (
                <li className='flex-1 rounded-full' key={`bottom-tab-link-${value.title}`}>
                    <LinkTab {...value} linkClassName={linkClassName} childClassName={childClassName}>
                        {value.icon}
                        <span>{value.title}</span>
                    </LinkTab>
                </li>
            ))}
        </ul>
    )
}

export default BottomNavContainer;