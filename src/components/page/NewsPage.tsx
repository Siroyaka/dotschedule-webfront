import React from 'react';

import NewsCardsField, { CardType } from 'components/field/News';
import MemberNamesArea from 'components/standalone/MemberNamesArea';

interface OwnProps {
  slug?: string,
  data?: CardType[],
  year?: number,
  month?: number,
  day?: number,
  hour?: number,
}

type Props = OwnProps;

const NewsPage: React.FC<Props> = (props) => {
  const {
    slug,
    data,
    year,
    month,
    day,
    hour,
  } = props;

  return(
    <article className='h-full overflow-y-auto px-2 py-2'>
      {year && month && day && hour &&
        <h1 className='text-xl'>
          {year}年{month}月{day}日 {hour}:00の新着
        </h1>
      }
      <MemberNamesArea slug={slug} />
      {data &&
        <NewsCardsField cardData={data} />
      }
    </article>
  )
}

export default NewsPage;