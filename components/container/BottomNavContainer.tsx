'use client'

import React from 'react';

import BottomNav, { NavItem } from 'components/standalone/BottomNavigations';

import { TodaySvg, CalendarSvg, ListSvg, SearchIconSvg } from 'components/parts/svgIcons';
import { getJTCNow } from 'library/DateFunctions';

export const revalidate = 5;

const BottomNavContainer: React.FC = () => {
    const now = getJTCNow();
    const navItems: NavItem[] = [
        {
            title: 'Today',
            href: `/streaming/day/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`,
            icon: <TodaySvg className='w-6'/>
        },
        {
            title: 'Calendar',
            href: 'streaming/calendar',
            icon: <CalendarSvg className='w-6'/>,
            routeMatch: 'calendar',
            reuseChild: {
                getDefaultItem: () => ['2022', '1'],
                reuseLength: 2
            }
        },
        {
            title: 'List',
            href: 'streaming/monthlist',
            icon: <ListSvg className='w-6'/>,
            routeMatch: 'monthlist',
            reuseChild: {
                getDefaultItem: () => ['2022', '1'],
                reuseLength: 2
            }
        },
        {
            title: 'Search',
            href: 'streaming/search',
            icon: <SearchIconSvg className='w-6'/>,
            routeMatch: 'search'
        }
    ]
    return (
        <BottomNav items={navItems}/>
    )
}

export default BottomNavContainer;