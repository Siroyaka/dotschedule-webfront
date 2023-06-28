import React, { ComponentProps } from 'react';

import { CardForSchedule } from 'components/template/Card';

export type CardType = ComponentProps<typeof CardForSchedule>;

interface OwnProps {
    cardData: CardType[],
    mode?: "sm" | "md" | "lg" | "xl"
    children?: never,
}

type Props = OwnProps;

const SchedulesField: React.FC<Props> = (props) => {
    const { cardData, mode } = props;

    let cardSizeQuery = "sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
    if (mode !== undefined) {
        switch(mode) {
            case "sm": {
                cardSizeQuery = "w-full"
                break;
            }
            case "md": {
                cardSizeQuery = "lg:w-full xl:w-1/2"
                break;
            }
            case "lg": {
                cardSizeQuery = "md:w-full lg:w-1/2 xl:w-1/3"
                break;
            }
        }
    }

    return (
        <ul className='flex flex-wrap'>
            {cardData.map((cardInfo, i) => (
                <li
                    key={`card-${cardInfo.start}-${i}`}
                    className={`w-full px-2 py-2 flex justify-center ${cardSizeQuery}`}
                >
                    <CardForSchedule {...cardInfo}>
                        {cardInfo.title}
                    </CardForSchedule>
                </li>
            ))}
        </ul>
    );
}

export default SchedulesField;