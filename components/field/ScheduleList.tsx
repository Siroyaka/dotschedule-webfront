import React, { ComponentProps } from 'react';

import Image from 'next/image'

import ListView from 'components/template/ListView';

export type ListType = ComponentProps<typeof ListView> & {participantsIcons: string[]};

interface OwnProps {
    listData: ListType[],
    children?: never,
}

type Props = OwnProps;

const SchedulesField: React.FC<Props> = (props) => {
    const { listData } = props;

    return (
        <ul className='flex flex-wrap gap-4 px-2'>
            {listData.map((info, i) => (
                <li
                    key={`card-listview-${i}`}
                    className={`w-full`}
                >
                    <ListView {...info}>
                        <div className='w-full grid mx-1 justify-start gap-0.5' style={{ gridTemplateColumns: 'repeat(auto-fit, 2rem)' }}>
                            {info.participantsIcons.map((icon, i2) => (
                                (icon && icon.length > 0) &&
                                <Image
                                    height={50}
                                    width={50}
                                    key={`listview-${i}-icon-${i2}`}
                                    alt={`listview-${i}-icon-${i2}`}
                                    className='w-6 h-6 rounded-full'
                                    src={icon}
                                />
                            ))}
                        </div>
                    </ListView>
                </li>
            ))}
        </ul>
    );
}

export default SchedulesField;