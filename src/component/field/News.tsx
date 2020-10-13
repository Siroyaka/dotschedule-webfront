import React, { ComponentProps } from 'react';
import clsx from 'clsx';

import { CardNews } from 'component/template/Card';

export type CardType = ComponentProps<typeof CardNews> & {
  title: string,
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
    <ul className={clsx("flex", "flex-wrap", "py-4", "px-2")}>
      {cardData.map((cardInfo, i) => (
        <li
          key={`card-${i}`}
          className={clsx( "w-full", "sm:w-full", "md:w-1/2", "lg:w-1/3",
            "xl:w-1/4", "px-2", "py-2", "flex", "justify-center")}
        >
          <CardNews {...cardInfo}>
            {cardInfo.title}
          </CardNews>
        </li>
      ))}
    </ul>
  );
}

export default NewsCardsField;