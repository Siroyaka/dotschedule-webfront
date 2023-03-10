import React from 'react'

import SchedulesField from 'components/field/Schedules';
import DataFetchError from 'components/standalone/DataFetchError'
import PageSelector from 'components/standalone/PageSelector';
import { DayScheduleToCardType } from 'library/Converter';
import { IDate } from 'library/DateFunctions';
import { StreamingSearchRequest, StreamingSearchRequestParams } from 'library/api/DotscheduleApi';

interface Props {
    searchParams: {
        page?: string
        members?: string
        from?: string
        to?: string
    }
}

export const dynamic = 'force-dynamic';

const ids: Set<string> = new Set([
    'baatual',
    'carropino',
    'dotlive_official',
    'kagurasuzu',
    'kakyoinchieri',
    'kisoazuki',
    'kitakamifutaba',
    'kongoiroha',
    'merrymilk',
    'mokotamememe',
    'nanahoshimilily',
    'nekonokimochi',
    'rikumu',
    'rurunrururica',
    'siro',
    'ushimakiriko',
    'yaezawanatori',
    'yamatoiori',
    'yozakuratama',
]);

export const metadata = {
    title: "配信スケジュール検索"
}

export const revalidate = 10;

const isSearchParamBlank = ({searchParams}: Props) => {
    const membersBlank = searchParams.members === undefined || searchParams.members.trim() === "";
    const fromBlank = searchParams.from === undefined || searchParams.from.trim() === "";
    const toBlank = searchParams.to === undefined || searchParams.to.trim() === "";
    return membersBlank && fromBlank && toBlank;
}

const dateRequestParamToIDate = (v?: string): IDate | undefined => {
    if (v === undefined) {
        return v;
    }
    const splitValues = v.split('-');
    if (splitValues.length !== 3) {
        return undefined;
    }

    const year = parseInt(splitValues[0]);
    if (isNaN(year)) {
        return undefined;
    }
    const month = parseInt(splitValues[1]);
    if (isNaN(year)) {
        return undefined;
    }
    const day = parseInt(splitValues[2]);
    if (isNaN(year)) {
        return undefined;
    }

    return {
        year,
        month,
        day,
    };
}

const searchParamsConvert = ({searchParams}: Props): StreamingSearchRequestParams => {
    const {page, members, from, to} = searchParams;

    const memberList = members ? members.split(',').filter(x => ids.has(x)) : [];

    const ipage = parseInt(page ?? '1');

    return {
        page: ipage,
        members: memberList,
        from: dateRequestParamToIDate(from),
        to: dateRequestParamToIDate(to),
    };
}

const fetchData = async(params: StreamingSearchRequestParams) => {
    const req = new StreamingSearchRequest();
    return await req.Get(params, 10);
}

const Page = async ({searchParams}: Props) => {
    console.log(searchParams.page, searchParams.from, searchParams.to, searchParams.members);

    if (isSearchParamBlank({searchParams})) {
        return (
            <div></div>
        )
    }

    const apiRequestParams = searchParamsConvert({searchParams});

    const {isError, data, errorMessage} = await fetchData(apiRequestParams);

    console.log(errorMessage)

    if (isError) {
        return (
            <DataFetchError />
        )
    }

    if (data.length === 0) {
        return (
            <div className='mx-2'>
                <h1>検索結果なし</h1>
            </div>
        )
    }

    const cardData = data.response_data?.map(x => DayScheduleToCardType(x, 'datetime')) ?? [];

    return (
        <section id='search-result' className='mt-2'>
            <header className='mx-2 flex'>
                <h1>{data.length}件</h1>
                <div id='search-page-selector' className=''>
                    <PageSelector
                        totalLen={Math.ceil(data.length / 20)}
                        viewNum={10}
                        nowPage={apiRequestParams.page}
                        pageQueryName={'page'}
                        pagePath={'/streaming/search'}
                        otherQuerys={searchParams}
                        parentClassName={'flex'}
                        childClassName={'text-ml px-3'}
                        disableLinkClassName={'text-black'}
                        enableLinkClassName={'text-blue-400'}
                    />
                </div>
            </header>
            <div>
                <SchedulesField cardData={cardData} />
            </div>
        </section>
    )
}

export default Page