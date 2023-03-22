'use client'
import React from 'react';

import { MenuButton } from 'components/template/IconButton';
import { ReloadIconSvg } from 'components/parts/svgIcons';

interface OwnProps {
    title: string
    onMenuClick?: () => void
}

type Props = OwnProps;

const HeaderItems: React.FC<Props> = ({ title, onMenuClick }) => {
    return (
        <section className='flex h-full justify-between'>
            <div className='h-full flex items-center ml-8'>
                <h6 className="font-sans text-2xl text-black">{title}</h6>
            </div>
            <div className='h-full flex mr-2'>
                <div className={"ml-2 my-1"}>
                    <MenuButton
                        classes={{ button: "hover:bg-blue-400 focus:outline-none hover:bg-opacity-20 active:bg-blue-200 active:bg-opacity-40" }}
                        onClick={onMenuClick}
                    />
                </div>
            </div>
        </section>
    );
}

export default HeaderItems;