import React from 'react'

import SchedulesField from 'components/field/Schedules';
import DataFetchError from 'components/standalone/DataFetchError'
import PageSelector from 'components/standalone/PageSelector';
import { DayScheduleToCardType } from 'library/Converter';
import { IDate, iDateToDate } from 'library/DateFunctions';
import { StreamingSearchRequest, StreamingSearchRequestParams } from 'library/api/DotscheduleApi';

interface Props {
    searchParams: {
        page?: string
        members?: string
        from?: string
        to?: string
        title?: string
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

const isSearchParamBlank = ({searchParams}: Props) => {
    const membersBlank = searchParams.members === undefined || searchParams.members.trim() === "";
    const fromBlank = searchParams.from === undefined || searchParams.from.trim() === "";
    const toBlank = searchParams.to === undefined || searchParams.to.trim() === "";
    const titleBlank = searchParams.title === undefined || searchParams.title.trim() === "";
    return membersBlank && fromBlank && toBlank && titleBlank;
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
    const {page, members, from, to, title} = searchParams;

    const memberList = members ? members.replaceAll(';', '').split(',').filter(x => ids.has(x)) : [];

    const ipage = parseInt(page ?? '1');

    const titleQuery = (title ?? '').replaceAll(';', '');

    let fromDate = dateRequestParamToIDate(from);

    let toDate = dateRequestParamToIDate(to);

    if (fromDate !== undefined && toDate !== undefined) {
        if (iDateToDate(fromDate) > iDateToDate(toDate)) {
            const hold = fromDate;
            fromDate = toDate;
            toDate = hold;
        }
    }

    return {
        page: ipage,
        members: memberList,
        from: fromDate,
        to: toDate,
        title: titleQuery,
        maxResult: 20,
        sort: "newer"
    };
}

const fetchData = async(params: StreamingSearchRequestParams) => {
    const req = new StreamingSearchRequest();
    return await req.Get(params, 10);
}

const Page = async ({searchParams}: Props) => {
    if (isSearchParamBlank({searchParams})) {
        return (
            <div></div>
        )
    }

    const apiRequestParams = searchParamsConvert({searchParams});

    const {isError, data} = await fetchData(apiRequestParams);

    if (isError) {
        return (
            <div className='mx-2'>
                <DataFetchError />
            </div>
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

    const searchPageSelector = (
        <PageSelector
            totalLen={Math.ceil(data.length / (apiRequestParams.maxResult ?? 100))}
            viewNum={10}
            nowPage={apiRequestParams.page}
            pageQueryName={'page'}
            pagePath={'/streaming/search'}
            otherQuerys={searchParams}
            parentClassName={'flex flex-wrap'}
            childClassName={'text-ml w-6 text-center'}
            disableLinkClassName={'text-black'}
            enableLinkClassName={'text-blue-400'}
        />
    )

    return (
        <section id='search-result' className='mt-2 pt-4'>
            <header className='mx-2 my-2'>
                <h1>{data.length}件</h1>
                <div id='search-page-selector' className='flex items-center justify-center'>
                    {searchPageSelector}
                </div>
            </header>
            <div>
                <SchedulesField cardData={cardData} />
            </div>
            <footer className='mx-2 my-2'>
                <div id='search-page-selector' className='flex items-center justify-center'>
                    {searchPageSelector}
                </div>
            </footer>
        </section>
    )
}

export default Page