import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import SchedulesField, { CardType } from 'src/components/field/Schedules';
import LoadingField from 'src/components/field/Loading';
import SchedulesNavigation from 'src/components/standalone/SchedulesNavigation';

import { DayScheduleToCardType } from 'src/lib/Converter';
import { DayScheduleRequest } from 'src/lib/api/DotscheduleApi'

interface OwnProps {
  year?: number,
  month?: number,
  day?: number,
  cardData?: CardType[],
  dayStreamers: string[],
}

type Props = OwnProps;

const HeadItems: React.FC<Omit<Props, 'cardData'>> = (props) => {
  const {year, month, day} = props;
  return(
    <Head>
      <title>{`${year}年${month}月${day}日のスケジュール`}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

const SchedulePage: React.FC<Props> = (props) => {
  const { year, month, day, cardData } = props;
  const loading = cardData === undefined || year === undefined || day === undefined || month === undefined;
  if (loading) return <LoadingField />;

  return(
    <React.Fragment>
      <HeadItems {...props}/>
      <main className='h-full flex flex-col'>
        <section
          id={`y-${year}-m-${month}-d-${day}-schedules`}
          className='h-full overflow-y-auto'
        >
          <SchedulesNavigation year={year} month={month} day={day}>
            <h1 className='text-xl px-4 text-center'>{year}年{month}月{day}日</h1>
          </SchedulesNavigation>
          <SchedulesField cardData={cardData} />
        </section>
      </main>
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

const calcRevalidateTime = (year: number, month: number, day: number) => {
  const time = (new Date(year, month - 1, day)).getTime();

  // 午前3時を日付変更点とするため、現在日時から3を引く。加えて、デプロイ先がutcなのでそれを考慮する。
  const nd = new Date();
  nd.setHours(nd.getHours() + 6);

  // 本日と1日前は15分とする
  const ld = new Date(nd);
  ld.setDate(ld.getDate() - 2);
  if (time > ld.getTime()) return 60 * 15;

  // 直近1か月は1日とする
  const lmd = new Date(nd);
  lmd.setMonth(lmd.getMonth() - 1);
  if (time > lmd.getTime()) return 60 * 60 * 24;

  // それ以外は1か月とする
  return 60 * 60 * 24 * 31;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const sYear = Array.isArray(params?.year) ? params?.year[0] : params.year;
  const sMonth = Array.isArray(params?.month) ? params?.month[0] : params.month;
  const sDay = Array.isArray(params?.day) ? params?.day[0] : params.day;
  const year = parseInt(sYear);
  const month = parseInt(sMonth);
  const day = parseInt(sDay);
  
  const req = new DayScheduleRequest();
  const { isError, errorMessage, data } = await req.Get(year, month, day);
  if (isError) {
    console.log(errorMessage);
    return {
      notFound: true,
      revalidate: 1
    }
  }

  const cardData = data.response_data?.map(x => DayScheduleToCardType(x)) ?? [];

  const revalidateTime = 5;

  return {
    props: {
      year,
      month,
      day,
      cardData: cardData,
    },
    revalidate: revalidateTime
  }
}

export default SchedulePage;