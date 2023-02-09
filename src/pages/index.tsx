import React, { useEffect } from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'

import { GetStaticProps } from 'next';

import SchedulesField, { CardType } from 'src/components/field/Schedules';

import SchedulesNavigation from 'src/components/standalone/SchedulesNavigation';

import { DayScheduleToCardType } from 'src/lib/Converter';
import { getJTCNow } from 'src/lib/DateFunctions';
import { todayTitle } from 'src/lib/InitialMetaData';

import { DayScheduleRequest } from 'src/lib/api/DotscheduleApi'

interface OwnProps {
  year: number,
  month: number,
  day: number,
  cardData: CardType[]
}

type Props = OwnProps;

const Home: React.FC<Props> = (props) => {
  const {
    year,
    month,
    day,
    cardData,
  } = props;


  const router = useRouter();

  const d = getJTCNow();
  const yyear = d.getFullYear();
  const mmonth = d.getMonth() + 1;
  const dday = d.getDate();

  useEffect(() => {
    router.replace(`/schedule/${yyear}/${mmonth}/${dday}`);
  }, [router])

  return (
    <React.Fragment>
      <Head>
        <title>{todayTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-full overflow-y-auto'>
        <SchedulesNavigation year={year} month={month} day={day}>
          <h1 className='text-xl px-4 text-center'>{year}年{month}月{day}日</h1>
        </SchedulesNavigation>
        <SchedulesField cardData={cardData} />
      </main>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const d = getJTCNow();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  //const {convertData} = await fetchScheduleData(year, month, day, VideoScheduleToCardType, PickupStreamerFromVideoSchedule);

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
      cardData
    },
    revalidate: revalidateTime
  }
}

export default Home;