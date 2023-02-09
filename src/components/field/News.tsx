import React, { ComponentProps } from 'react';

import { CardNews } from 'src/components/template/Card';

export type CardType = ComponentProps<typeof CardNews> & {
  content: string,
  year: number,
  month: number,
  day: number
};

interface OwnProps {
  cardData: CardType[],
  children?: never,
}

type Props = OwnProps;

const NewsCardsField: React.FC<Props> = (props) => {
  const { cardData } = props;
  return (
    <ul className='flex flex-wrap pt-4 px-2 pb-16'>
      {cardData.map((cardInfo, i) => (
        <li
          key={`card-${i}`}
          className='w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 py-2 flex justify-center'
        >
          <CardNews {...cardInfo}>
            {cardInfo.content}
          </CardNews>
        </li>
      ))}
    </ul>
  );
}

export default NewsCardsField;