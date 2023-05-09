import React from 'react';

import Image from 'next/image'

import { NoImageAvater } from 'components/parts/noimage';

interface HeaderProps {
    icon?: string
    left?: string
    right?: string
}

interface BodyProps {
    text?: string
    url?: string
}

interface FooterProps {
    children?: React.ReactNode
}

interface ListViewProps {
    icon?: string
    headerLefts?: string
    headerRights?: string
    body?: string
    footerDom?: React.ReactNode
    url?: string
    children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({icon, left, right}) => {
    let avater = (
        <a></a>
    );

    if (icon !== undefined) {
        if (icon.length === 0) {
            avater = (
                <div className='py-1'>
                    <NoImageAvater size='minimum'/>
                </div>
            )
        } else {
            avater = (
                <Image
                    width={20}
                    height={20}
                    className='rounded-full h-7 w-7 px-1 py-1 flex-shrink-0'
                    alt={`${avater}`}
                    src={icon}
                />
            )
        }
    }
    return (
        <header className='flex'>
            <div >
                {avater}
            </div>
            <div className='truncate text-sm w-32'>
                {right}
            </div>
            <div className='truncate'>
                {left}
            </div>
        </header>
    )
}

const Body: React.FC<BodyProps> = ({text, url}) => {
    return (
        <div className='truncate w-full'>
            <a href={url} className='text-xs lg:text-sm text-blue-600'>
                {text}
            </a>
        </div>
    )
}

const ListView: React.FC<ListViewProps> = ({
    icon,
    headerLefts,
    headerRights,
    body,
    children,
    url,
}) => {
    return (
        <div className='border shadow'>
            <div className='mx-2 my-1'>
                <Header icon={icon} left={headerLefts} right={headerRights} />
                <Body text={body} url={url} />
                {children}
            </div>
        </div>
    )
}

export default ListView;