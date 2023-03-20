'use client'

import React from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

import path from 'path';

export interface NavItem {
    title: string
    href: string
    routeMatch?: string
    reuseChild?: {
        defaultItems: string[]
        reuseLength: number
    }
    icon?: React.ReactNode
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

interface OwnProps {
    items: NavItem[]
}

export type Props = OwnProps;

export const LinkTab: React.FC<NavItem & {children?: React.ReactNode}> = (props) => {
    const {
        href,
        routeMatch,
        reuseChild,
        children,
        linkClassName,
        childClassName,
    } = props;

    let tabLink = href;

    const segments = useSelectedLayoutSegments();

    let isMatch = false;
    if (routeMatch !== undefined && segments.length > 0) {
        isMatch = segments[0] === routeMatch;
    }

    if (reuseChild) {
        const childs = segments.slice(1);
        const linkSlag = childs.length >= reuseChild.reuseLength ? childs.slice(0, reuseChild.reuseLength) : reuseChild.defaultItems;
        tabLink = path.join(href, ...linkSlag);
    }

    return (
        <nav className={`
            ${linkClassName?.base}
            ${isMatch ? linkClassName?.match ?? '' : linkClassName?.unmatch ?? ''}
        `}>
            <Link href={{
                pathname: tabLink,
            }}
                draggable={false}
                prefetch={false}
                className={`
                    ${isMatch ? 'text-white' : 'text-black'} text-xs flex flex-col items-center
                    ${childClassName?.base}
                    ${isMatch ? childClassName?.match ?? '' : childClassName?.unmatch ?? ''}
                `}
            >
                {children}
            </Link>
        </nav>
    )
}
