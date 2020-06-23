import React from 'react';
import clsx from 'clsx';

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { fromTo } from 'modules/Constructions';
import MonthSwitch from 'component/standalone/MonthSwitch';
import ListField from 'component/field/List';
import { getMonthCalendar, MonthCalendar } from 'modules/DateFunctions';
import { MonthDataToImgData } from 'modules/Converter';
import { fetchMonthData } from 'modules/firebase';
import LoadingField from 'component/field/Loading';

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
      <main className={clsx('h-full', 'flex', 'flex-col')}>
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

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const revalidate = (() => {
    if(year === now.getFullYear() && month === (now.getMonth() + 1)) return 60 * 60;
    if(year === yesterday.getFullYear() && month === (yesterday.getMonth() + 1)) return 60 * 60 * 2;
    return (24 - now.getHours()) * 3600;
  })();

  return {
    props: {
      year,
      month,
      monthCalendar,
      start,
      end,
      avaters,
    },
    unstable_revalidate: revalidate
  }
}

export default ListPage;