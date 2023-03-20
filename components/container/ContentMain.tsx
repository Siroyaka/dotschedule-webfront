'use client'

import React from 'react';

import { useSelectedLayoutSegment } from 'next/navigation';

interface Props {
    nonScrolls?: string[],
    children?: React.ReactNode
}

const ContentMain: React.FC<Props> = ({nonScrolls, children}) => {
    const segment = useSelectedLayoutSegment();

    const isNonScrolls = segment !== undefined ? (nonScrolls?.filter(x => x === segment).length ?? 0) > 0 : false;
    return (
        <main className={`
            pt-12
            ${isNonScrolls ? 'h-full pb-16' : 'pb-20'}
        `}>
            {children}
        </main>
    )
}

export default ContentMain;