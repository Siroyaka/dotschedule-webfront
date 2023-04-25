'use client'

import React from 'react';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

export interface NavItem {
    title: string
    href: string
    routeMatch?: string[]
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
        children,
        linkClassName,
        childClassName,
    } = props;

    let tabLink = href;

    const segments = useSelectedLayoutSegments();

    let isMatch = false;
    if (routeMatch !== undefined && segments.length >= routeMatch.length) {
        isMatch = true;
        for (let i = 0; i < routeMatch.length; i++) {
            if(segments[i] !== routeMatch[i]) {
                isMatch = false;
                break;
            }
        }
    }

    return (
        <nav className={`
            ${linkClassName?.base}
            ${isMatch ? linkClassName?.match : linkClassName?.unmatch}
        `}>
            <Link href={{
                pathname: tabLink,
            }}
                draggable={false}
                prefetch={false}
                className={`
                    ${childClassName?.base}
                    ${isMatch ? childClassName?.match : childClassName?.unmatch}
                `}
            >
                {children}
            </Link>
        </nav>
    )
}
