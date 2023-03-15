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

const BottomNavigations2: React.FC<OwnProps> = ({ items }) => {
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

export default BottomNavigations2;