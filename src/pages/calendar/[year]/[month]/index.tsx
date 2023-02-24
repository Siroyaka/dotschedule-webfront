import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { fromTo } from 'src/lib/Constructions';
import MonthSwitch from 'src/components/standalone/MonthSwitch';
import CalendarField from 'src/components/field/Calendar';
import { getMonthCalendar, MonthCalendar } from 'src/lib/DateFunctions';
import LoadingField from 'src/components/field/Loading';

interface OwnProps {
  year: number,
  month: number,
  monthCalendar: MonthCalendar,
  start: {year: number, month: number, day: number},
  end: {year: number, month: number, day: number},
}

type Props = OwnProps;

const CalendarPage: React.FC<Props> = (props) => {
  const loading = props.year === undefined;
  if (loading) return <LoadingField />

  return(
    <React.Fragment>
      <Head>
        <title>{`${props.year}年${props.month}月カレンダー`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-full flex flex-col'>
        <MonthSwitch {...props} componentName='calendar' />
        <CalendarField {...props}/>
      </main>
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fromTo.map(x => ({params: {year: x.year + '', month: x.month + ''}}));
  return {
    paths,
    fallback: true,
  }
}

const calcRevalidateTime = (year: number, month: number) => {
  const yesterday = new Date();
  yesterday.setHours(yesterday.getHours() + 6);
  yesterday.setDate(yesterday.getDate() - 1);
  const yY = yesterday.getFullYear();
  const yM = yesterday.getMonth() + 1;

  // 今日の月と昨日の月(異なる場合もあるから)は1hで更新されるようにする
  if (year > yY || (year === yY && month >= yM)) return 60 * 60;

  // それ以前は1か月で更新されるようにする
  return 60 * 60 * 24 * 31;
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const sYear = Array.isArray(params?.year) ? params?.year[0] : params?.year;
  const sMonth = Array.isArray(params?.month) ? params?.month[0] : params?.month;
  const year = parseInt(sYear ?? '2000');
  const month = parseInt(sMonth ?? '01');
  const monthCalendar = getMonthCalendar(year, month);

  const now = new Date();
  now.setHours(now.getHours() + 6);

  const start = { year: 2017, month: 1, day: 1 };
  const end = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

  const revalidateTime = calcRevalidateTime(year, month);

  return {
    props: {
      year,
      month,
      monthCalendar,
      start,
      end,
    },
    revalidate: revalidateTime
  }
}

export default CalendarPage;