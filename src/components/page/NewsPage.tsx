import React from 'react';

import NewsCardsField, { CardType } from 'src/components/field/News';
import MemberNamesArea from 'src/components/standalone/MemberNamesArea';

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
    <article className='h-full overflow-y-scroll px-4 py-2'>
      {year && month && day && hour &&
        <h1 className='text-xl mb-2'>
          Search
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