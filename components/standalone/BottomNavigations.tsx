'use client'

import React from 'react';

import Link from 'next/link';
import { usePathname, useSelectedLayoutSegments } from 'next/navigation';

import path from 'path';

import Bottoms from 'components/template/Bottoms';
import { TodaySvg, CalendarSvg, ListSvg, SearchIconSvg } from 'components/parts/svgIcons';
import { getJTCNow } from 'library/DateFunctions';

export interface NavItem {
    title: string
    href: string
    routeMatch?: string
    reuseChild?: {
        getDefaultItem: () => string[]
        reuseLength: number
    }
    icon?: React.ReactNode
}

interface OwnProps {
    items: NavItem[]
}

export type Props = OwnProps;

const LinkTab: React.FC<NavItem & {children?: React.ReactNode}> = (props) => {
    const {
        href,
        routeMatch,
        reuseChild,
        children,
    } = props;

    let tabLink = href;

    const segments = routeMatch !== undefined || reuseChild !== undefined ? useSelectedLayoutSegments() : [];

    let isMatch = false;
    if (routeMatch !== undefined && segments.length > 0) {
        isMatch = segments[0] === routeMatch;
    }
    const linkOption = isMatch ? 'bg-blue-500' : 'hover:bg-blue-200 active:bg-blue-300  duration-150 ease-in transform transition-all';

    if (reuseChild) {
        const childs = segments.slice(1);
        const linkSlag = childs.length >= reuseChild.reuseLength ? childs.slice(0, reuseChild.reuseLength) : reuseChild.getDefaultItem();
        tabLink = path.join(href, ...linkSlag);
    }

    return (
        <React.Fragment>
            <div className={`relative w-full h-full rounded text-xs text-center px-1 py-1 ${linkOption}`}>
                <Link href={{
                    pathname: tabLink,
                }}
                    draggable={false}
                    prefetch={false}
                    className='absolute top-0 left-0 h-full w-full'
                >
                </Link>
                <div className={`${isMatch ? 'text-white' : 'text-black'} text-xs flex flex-col items-center`}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

const TabItems: React.FC<{ href?: string, children?: React.ReactNode }> = (props) => {
    const {
        href,
        children,
    } = props;

    const isLink = href !== undefined;

    const linkOption = isLink ? 'hover:bg-blue-200 active:bg-blue-300  duration-150 ease-in transform transition-all' : 'bg-blue-500';
    return (
        <React.Fragment>
            <div className={`relative w-full h-full rounded text-xs text-center px-1 py-1 ${linkOption}`}>
                {isLink &&
                    <Link href={{
                        pathname: href
                    }}
                        draggable={false}
                        prefetch={false}
                        className='absolute top-0 left-0 h-full w-full'
                    >
                    </Link>
                }
                <div className={`${isLink ? 'text-black' : 'text-white'} text-xs flex flex-col items-center`}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

const BottomNavigations2: React.FC<OwnProps> = ({ items }) => {
    console.log(items.length);
    return (
        <Bottoms>
            <ul className='flex h-full'>
                {items.map((value) => (
                    <li className='flex-1' key={`bottom-tab-link-${value.title}`}>
                        <LinkTab {...value}>
                            {value.icon}
                            <span>{value.title}</span>
                        </LinkTab>
                    </li>
                ))}
            </ul>
        </Bottoms>
    );
}

const BottomNavigations: React.FC = () => {
    const now = getJTCNow();

    const splitPath = usePathname()?.split("/") ?? "";
    const routePath = splitPath[2];
    const year = splitPath.length < 4 ? now.getFullYear() : parseInt(splitPath[3]);
    const month = splitPath.length < 5 ? now.getMonth() + 1 : parseInt(splitPath[4]);
    const linkChild = `/${year}/${month}`;
    const todayPath = `/streaming/day/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;

    return (
        <Bottoms>
            <ul className='flex'>
                <li className="flex-1">
                    <TabItems href={todayPath}>
                        <TodaySvg className='w-6' />
                        <span>Today</span>
                    </TabItems>
                </li>
                <li className="flex-1">
                    <TabItems href={routePath !== 'calendar' ? `/streaming/calendar${linkChild}` : undefined}>
                        <CalendarSvg className='w-6' />
                        <span>Calendar</span>
                    </TabItems>
                </li>
                <li className="flex-1">
                    <TabItems href={routePath !== 'monthlist' ? `/streaming/monthlist${linkChild}` : undefined}>
                        <ListSvg className='w-6' />
                        <span>List</span>
                    </TabItems>
                </li>
                <li className="flex-1">
                    <TabItems href={routePath !== 'search' ? '/streaming/search' : undefined}>
                        <SearchIconSvg className='w-6' />
                        <span>Search</span>
                    </TabItems>
                </li>
            </ul>

        </Bottoms>
    );
}

export default BottomNavigations2;