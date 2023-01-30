import React from 'react'
import Head from 'next/head'

import { GetStaticProps } from 'next';

import SchedulesField, { CardType } from 'components/field/Schedules';
import TodaysPrevNavigation from 'components/standalone/TodaysPrevNavigation';

import { DayScheduleToCardType } from 'lib/Converter';
import { getNow } from 'lib/DateFunctions';
import { todayTitle } from 'lib/InitialMetaData';

import { DayScheduleRequest } from 'lib/api/DotscheduleApi'

interface OwnProps {
  year: number,
  month: number,
  day: number,
  cardData: CardType[]
}

type Props = OwnProps;

const Home: React.FC<Props> = (props) => {
  const {
    cardData,
  } = props;

  return (
    <React.Fragment>
      <Head>
        <title>{todayTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-full overflow-y-auto'>
        <TodaysPrevNavigation {...props}/>
        <SchedulesField cardData={cardData} />
      </main>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const d = getNow();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  //const {convertData} = await fetchScheduleData(year, month, day, VideoScheduleToCardType, PickupStreamerFromVideoSchedule);

  const req = new DayScheduleRequest();
  const { isError, errorMessage, data } = await req.Get(year, month, day);
  if (isError) {
    console.log(errorMessage);
    return {
      notFound: true
    }
  }

  const cardData = data.response_data.map(x => DayScheduleToCardType(x));

  const revalidateTime = 1;

  return {
    props: {
      year,
      month,
      day,
      cardData
    },
    revalidate: revalidateTime
  }
}

export default Home;