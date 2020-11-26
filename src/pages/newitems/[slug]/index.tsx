import React from 'react';

import NewsCardsField, { CardType } from 'components/field/News';
import MemberNamesArea from 'components/standalone/MemberNamesArea';
import LoadingField from 'components/field/Loading';
import NewsPage from 'components/page/NewsPage';
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
  hour?: number,
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
  const updateTime = getUtc(new Date());
  updateTime.setHours(0, 0, 0, 0); // GMT 0:00 -> JST 9:00
  const data = await getSchedulesBeforeData(VideoScheduleToNews)(match.id, updateTime, quantity);

  // revalidateは現在から翌日の9:00までの差分
  const now = getUtc(new Date());
  const revalidateTime = new Date(updateTime);
  revalidateTime.setDate(revalidateTime.getDate() + 1);
  const revalidateSec = Math.floor((revalidateTime.getTime() - now.getTime()) / 1000)

  // いつの更新分であるかを示す(endDateを日本時間にする)
  const jstUpdateTime = getJstTime(updateTime);

  return {
    props: {
      slug,
      data,
      year: jstUpdateTime.year,
      month: jstUpdateTime.month,
      day: jstUpdateTime.day,
      hour: 9,
    },
    revalidate: revalidateSec
  }
}

const NewItemsMemberPage: React.FC<Props> = (props) => {
  if(!props.slug) {
    return(
      <LoadingField />
    )
  }
  return(
    <NewsPage {...props}/>
  )
}

export default NewItemsMemberPage;