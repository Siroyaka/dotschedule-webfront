import React from 'react';

import { NavItem, LinkTab } from 'components/standalone/BottomNavigations';

import Bottoms from 'components/template/Bottoms';

import { TodaySvg, CalendarSvg, ListSvg, SearchIconSvg } from 'components/parts/svgIcons';
import { getJTCNow } from 'library/DateFunctions';

const BottomNavContainer: React.FC = () => {
    const now = getJTCNow();
    const nowYear = now.getFullYear().toString();
    const nowMonth = (now.getMonth() + 1).toString();
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
                defaultItems: [nowYear, nowMonth],
                reuseLength: 2
            }
        },
        {
            title: 'List',
            href: 'streaming/monthlist',
            icon: <ListSvg className='w-6'/>,
            routeMatch: 'monthlist',
            reuseChild: {
                defaultItems: [nowYear, nowMonth],
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
        <Bottoms>
            <ul className='flex h-full'>
                {navItems.map((value) => (
                    <li className='flex-1' key={`bottom-tab-link-${value.title}`}>
                        <LinkTab {...value}>
                            {value.icon}
                            <span>{value.title}</span>
                        </LinkTab>
                    </li>
                ))}
            </ul>
        </Bottoms>
    )
}

export default BottomNavContainer;