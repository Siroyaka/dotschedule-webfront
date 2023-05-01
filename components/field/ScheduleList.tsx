import React, { ComponentProps } from 'react';

import ListView from 'components/template/ListView';

export type ListType = ComponentProps<typeof ListView>;

interface OwnProps {
    listData: ListType[],
    children?: never,
}

type Props = OwnProps;

const SchedulesField: React.FC<Props> = (props) => {
    const { listData } = props;

    return (
        <ul className='flex flex-wrap'>
            {listData.map((info, i) => (
                <li
                    key={`card-listview-${i}`}
                    className={`w-full px-2 py-2`}
                >
                    <ListView {...info}/>
                </li>
            ))}
        </ul>
    );
}

export default SchedulesField;