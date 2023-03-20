import React, { ComponentProps } from 'react';

import { CardFullTemplate } from 'components/template/Card';

export type CardType = ComponentProps<typeof CardFullTemplate> & {title: string};

interface OwnProps {
  cardData: CardType[],
  children?: never,
}

type Props = OwnProps;

const SchedulesField: React.FC<Props> = (props) => {
  const { cardData } = props;
  return (
    <ul className='flex flex-wrap'>
      {cardData.map((cardInfo, i) => (
        <li
          key={`card-${cardInfo.start}-${i}`}
          className='w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 py-2 flex justify-center'
        >
          <CardFullTemplate {...cardInfo}>
            {cardInfo.title}
          </CardFullTemplate>
        </li>
      ))}
    </ul>
  );
}

export default SchedulesField;