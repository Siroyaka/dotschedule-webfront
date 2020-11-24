import React from 'react';

import NewsCardsField, { CardType } from 'components/field/News';
import MemberNamesArea from 'components/standalone/MemberNamesArea';
import { getNewsStreamerList } from 'lib/Constructions';
import { getSchedulesBeforeData } from 'lib/firebase';
import { VideoScheduleToNews } from 'lib/Converter';
import { getJstTime, getUtc } from 'lib/DateFunctions';

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
  const quantity = 10; // 取得個数
  const endDate = getUtc(new Date());
  endDate.setHours(0, 0, 0, 0); // GMT 0:00 -> JST 9:00
  const data = await getSchedulesBeforeData(VideoScheduleToNews)(match.id, endDate, quantity);

  // revalidateは現在から翌日の9:00までの差分
  const now = getUtc(new Date());
  const revalidateTime = new Date(endDate);
  revalidateTime.setDate(revalidateTime.getDate() + 1);
  const revalidateSec = Math.floor((revalidateTime.getTime() - now.getTime()) / 1000)

  // いつの更新分であるかを示す(endDateを日本時間にする)
  const jstEndDate = getJstTime(endDate);

  return {
    props: {
      slug,
      data,
      year: jstEndDate.year,
      month: jstEndDate.month,
      day: jstEndDate.day,
    },
    revalidate: revalidateSec
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