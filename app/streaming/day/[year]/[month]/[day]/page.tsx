import React from 'react';

import type { Metadata } from 'next';

import { StreamingSearchRequest, StreamingSearchRequestParams } from 'library/api/DotscheduleApi';

import { SlugCheck, StreamingScheduleSlug } from './slug'

import ContentPage from './contentpage';
import { IDate } from 'library/DateFunctions';

const revalidate = 10;

interface MetaProps {
    params: StreamingScheduleSlug
}

interface PageProps {
    params: StreamingScheduleSlug
}

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
    const d: IDate = {
        year, month, day
    }
    const requestParams: StreamingSearchRequestParams = {
        page: 1,
        from: d,
        to: d,
        sort: "older"
    }

    const req = new StreamingSearchRequest();
    return await req.Get(requestParams, 10);
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