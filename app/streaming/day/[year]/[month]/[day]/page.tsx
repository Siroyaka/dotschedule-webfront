import React, { Suspense } from 'react';

import type { Metadata } from 'next';

import { DayScheduleRequest } from 'library/api/DotscheduleApi'

import { SlugCheck, StreamingScheduleSlug } from './slug'

import Loading from './loading';

import ContentPage from './contentpage';

interface MetaProps {
    params: StreamingScheduleSlug
}

interface PageProps {
    params: StreamingScheduleSlug
}

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: MetaProps): Promise<Metadata> {
    const { year, month, day } = props.params;
    const result = SlugCheck(year, month, day)
    if (!result.result) {
        return { title: "無効なページです" }
    }
    const title = `${year}年${month}月${day}日の配信スケジュール`
    return { title: title }
}

const FetchData = async (year: number, month: number, day: number) => {
    const req = new DayScheduleRequest();
    await new Promise(resolve => setTimeout(resolve, 10000));
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

    const { isError, data } = await FetchData(result.year, result.month, result.day)

    return (
        <ContentPage isError={isError} schedules={data.response_data}/>
    )

}

export default Page;