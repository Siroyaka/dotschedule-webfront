import React from 'react';

import { Metadata } from 'next';

import CalendarField from 'components/field/Calendar';
import { getMonthCalendar, getJTCNow } from 'library/DateFunctions';
import { DayStreamerDataListToDayIcons } from 'library/Converter';
import { MonthDataRequest } from 'library/api/DotscheduleApi'

import { Slug, SlugCheck } from './slug';

interface Pageprops {
    params: Slug
}

interface MetaProps {
    params: Slug
}

const Fetch = async (year: number, month: number) => {
    const monthCalendar = getMonthCalendar(year, month);

    const request = new MonthDataRequest()
    const { isError, errorMessage, data } = await request.Get(year, month, 60)
    if (isError) {
        console.log(errorMessage);
        return ({
            isError: true,
            props: {
                year,
                month,
                monthCalendar,
                avaters: {}
            }
        })
    }

    const avaters = DayStreamerDataListToDayIcons(data.response_data);

    return {
        isError: false,
        props: {
            year,
            month,
            monthCalendar,
            avaters
        }
    }

}

export async function generateMetadata(props: MetaProps): Promise<Metadata> {
    const year = props.params.year;
    const month = props.params.month;
    const result = SlugCheck(year, month)
    if (!result.result) {
        return { title: "無効なページです" }
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

    return (
        <CalendarField {...fetchResult.props} />
    )
}

export default Page;