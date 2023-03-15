import React from 'react';

import { Metadata } from 'next';

import CalendarField from 'components/field/Calendar';
import { getMonthCalendar, getJTCNow } from 'library/DateFunctions';

import { Slug, SlugCheck } from './slug';

interface Pageprops {
  params: Slug
}

interface MetaProps {
  params: Slug
}

const Fetch = async(year: number, month: number) => {
  const monthCalendar = getMonthCalendar(year, month);

  const before3Month = getJTCNow();
  before3Month.setMonth(before3Month.getMonth() - 3)
  const prefetch = year > before3Month.getFullYear() || (year === before3Month.getFullYear() && month > before3Month.getMonth() + 1)

  return {
    isError: false,
    props: {
      year,
      month,
      monthCalendar,
      prefetch: prefetch,
    }
  }

}

export async function generateMetadata(props: MetaProps): Promise<Metadata> {
  const { year, month } = props.params;
  const result = SlugCheck(year, month)
  if (!result.result) {
    return {title: "無効なページです"}
  }
  const title = `${year}年${month}月リスト`
  return { title: title, icons: "/favicon.ico" }
}

const Page = async (props: Pageprops) => {

  const checkResult = SlugCheck(props.params.year, props.params.month);
  if (!checkResult.result) {
    return (
      <div>無効なページです</div>
    )
  }

  const fetchResult = await Fetch(checkResult.year, checkResult.month)

  return(
    <CalendarField {...fetchResult.props}/>
  )
}

export default Page;