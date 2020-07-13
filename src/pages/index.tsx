import React from 'react'
import Head from 'next/head'
import clsx from 'clsx';

import { GetStaticProps } from 'next';

import { fetchScheduleData } from 'modules/firebase';
import SchedulesField, { CardType } from 'component/field/Schedules';
import { VideoScheduleToCardType, PickupStreamerFromVideoSchedule } from 'modules/Converter';


interface OwnProps {
  year: number,
  month: number,
  day: number,
  cardData: CardType[]
}

type Props = OwnProps;

const Home: React.FC<Props> = (props) => {
  const { cardData } = props;
  return (
    <React.Fragment>
      <Head>
        <title>どっとスケジュール</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx('h-full', 'overflow-y-auto')}>
        <SchedulesField cardData={cardData} />
      </main>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const d = new Date();
  d.setHours(d.getHours() + 6);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const {convertData, dayStreamers} = await fetchScheduleData(year, month, day, VideoScheduleToCardType, PickupStreamerFromVideoSchedule);

  const revalidateTime = 60 * 15;

  return {
    props: {
      year,
      month,
      day,
      cardData: convertData
    },
    unstable_revalidate: revalidateTime
  }
}

export default Home;