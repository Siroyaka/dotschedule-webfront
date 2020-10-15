import React from 'react';

import NewsCardsField, { CardType } from 'component/field/News';
import MemberNamesArea from 'component/standalone/MemberNamesArea';
import { getNewsStreamerList } from 'lib/Constructions';
import { getNewsScheduleData } from 'lib/firebase';
import { VideoScheduleToNews } from 'lib/Converter';

import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';

interface OwnProps {
  slug?: string,
  data?: CardType[],
  year?: number,
  month?: number,
  day?: number,
}

type Props = OwnProps;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const slug = params.slug as string;

  const match = getNewsStreamerList().find(x => x.slug === slug);
  const endDate = new Date();
  endDate.setHours(0);
  const data = await getNewsScheduleData(VideoScheduleToNews)(match.id, endDate, 10);

  // revalidateは翌日の9:00まで
  const now = new Date();
  const next9H = new Date();
  next9H.setDate(next9H.getDate() + 1);
  next9H.setHours(0, 0, 0, 0);
  const s = Math.floor((next9H.getTime() - now.getTime()) / 1000);
  console.log(slug, now, next9H);

  const jtNow = new Date();
  jtNow.setHours(jtNow.getHours() + 9);

  const year = jtNow.getFullYear();
  const month = jtNow.getMonth() + 1;
  const day = jtNow.getDate();
  
  const revalidateTime = s;

  return {
    props: {
      slug,
      data,
      year,
      month,
      day,
    },
    revalidate: revalidateTime
  }
}

const NewItemsMemberPage: React.FC<Props> = (props) => {
  const {
    slug,
    data,
    year,
    month,
    day,
  } = props;
  return(
    <article className='h-full'>
      <div className='h-full overflow-y-auto px-4'>
        {year && month && day &&
          <h1 className='text-xl mb-2'>{`${year}年${month}月${day}日 9:00の新着`}</h1>
        }
        <MemberNamesArea slug={slug}/>
        {data && 
          <NewsCardsField cardData={data}/>
        }
      </div>
    </article>
  )
}

export default NewItemsMemberPage;