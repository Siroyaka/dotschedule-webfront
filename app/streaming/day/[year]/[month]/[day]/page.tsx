import React from 'react';

import type { Metadata } from 'next';

import SchedulesField from 'components/field/Schedules';
import DataFetchError from 'components/standalone/DataFetchError'

import { DayScheduleToCardType } from 'library/Converter';
import { DayScheduleRequest } from 'library/api/DotscheduleApi'

import { SlugCheck, StreamingScheduleSlug } from './slug'

interface MetaProps {
  params: StreamingScheduleSlug
}

interface PageProps {
  params: StreamingScheduleSlug
}

export const revalidate = 5

export async function generateMetadata(props: MetaProps): Promise<Metadata> {
  const { year, month, day } = props.params;
  const result = SlugCheck(year, month, day)
  if (!result.result) {
    return {title: "無効なページです"}
  }
  const title = `${year}年${month}月${day}日の配信スケジュール`
  return { title: title }
}

const FetchData = async (year: number, month: number, day: number) => {
  const req = new DayScheduleRequest();
  return await req.Get(year, month, day, 5);
}

async function Page(props: PageProps) {
  const { year, month, day } = props.params;
  const result = SlugCheck(year, month, day)
  if (!result.result) {
    // error page
    return (
      <React.Fragment></React.Fragment>
    )
  }

  const {isError, data} = await FetchData(result.year, result.month, result.day)

  if (isError) {
    return (
      <DataFetchError />
    )
  }

  const cardData = data.response_data?.map(x => DayScheduleToCardType(x)) ?? [];

  return (
    <SchedulesField cardData={cardData} />
  )
}

export default Page;