import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { fromTo } from 'lib/Constructions';
import MonthSwitch from 'components/standalone/MonthSwitch';
import ListField from 'components/field/List';
import { getMonthCalendar, MonthCalendar } from 'lib/DateFunctions';
import { MonthDataToImgData } from 'lib/Converter';
import { fetchMonthData } from 'lib/DataInterface';
import LoadingField from 'components/field/Loading';

interface OwnProps {
  year: number,
  month: number,
  monthCalendar: MonthCalendar,
  start: {year: number, month: number, day: number},
  end: {year: number, month: number, day: number},
  avaters: { [key: number]: string[] },
}

type Props = OwnProps;

const ListPage: React.FC<Props> = (props) => {
  const loading = props.year === undefined;
  if (loading) return <LoadingField />;

  return(
    <React.Fragment>
      <Head>
        <title>{`${props.year}年${props.month}月リスト`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-full flex flex-col'>
        <MonthSwitch {...props} componentName='list' />
        <ListField {...props}/>
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
  const sYear = Array.isArray(params?.year) ? params?.year[0] : params.year;
  const sMonth = Array.isArray(params?.month) ? params?.month[0] : params.month;
  const year = parseInt(sYear);
  const month = parseInt(sMonth);
  const monthCalendar = getMonthCalendar(year, month);

  const avaters = await fetchMonthData(year, month, MonthDataToImgData);

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
      avaters,
    },
    revalidate: revalidateTime
  }
}

export default ListPage;