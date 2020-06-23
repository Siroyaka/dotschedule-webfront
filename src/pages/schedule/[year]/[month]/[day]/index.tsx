import React from 'react';
import clsx from 'clsx';

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { fetchScheduleData } from 'modules/firebase';
import { VideoScheduleToCardType } from 'modules/Converter';
import SchedulesField, { CardType } from 'component/field/Schedules';
import LoadingField from 'component/field/Loading';

interface OwnProps {
  year?: number,
  month?: number,
  day?: number,
  cardData?: CardType[]
}

type Props = OwnProps;

const SchedulePage: React.FC<Props> = (props) => {
  const { year, month, day, cardData } = props;
  const loading = cardData === undefined || year === undefined || day === undefined || month === undefined;
  if (loading) return <LoadingField />;

  return(
    <React.Fragment>
      <Head>
        <title>{`${year}年${month}月${day}日のスケジュール`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx('h-full', 'flex', 'flex-col')}>
        <section className={'mx-2'}>
          <h1 className={clsx('text-xl')}>{year}年{month}月{day}日</h1>
        </section>
        <section
          id={`y-${year}-m-${month}-d-${day}-schedules`}
          className={clsx('h-full', 'overflow-y-auto')}
        >
          <SchedulesField cardData={cardData} />
        </section>
      </main>
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const sYear = Array.isArray(params?.year) ? params?.year[0] : params.year;
  const sMonth = Array.isArray(params?.month) ? params?.month[0] : params.month;
  const sDay = Array.isArray(params?.day) ? params?.day[0] : params.day;
  const year = parseInt(sYear);
  const month = parseInt(sMonth);
  const day = parseInt(sDay);
  const cardData = await fetchScheduleData(year, month, day, VideoScheduleToCardType);
  const d = new Date();
  d.setHours(d.getHours() + 6);
  const revalidateTime = year > d.getFullYear() || (year === d.getFullYear() && (month > d.getMonth() + 1 || (month === d.getMonth() + 1 && day >= (d.getDate() - 1)))) ? 60 * 15 : (24 - d.getHours()) * 3600;

  return {
    props: {
      year,
      month,
      day,
      cardData,
    },
    unstable_revalidate: revalidateTime
  }
}

export default SchedulePage;