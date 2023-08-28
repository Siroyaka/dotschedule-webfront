import React, { Suspense } from "react";

import { getJTCNow, dateToIDate } from 'library/DateFunctions';
import StreamingSearchMenu, { SearchMember } from 'components/field/StreamingSearchMenu';

import searchMemberListJson from 'library/data/searchmemberlist.json';

import LoadingField from 'components/field/Loading';

import { Sq } from 'library/api/Const';
import { hashed } from 'library/hardread';

interface LayoutProps {
    children: React.ReactNode
}

const FetchStreamingSearchMenuValues = async () => {
    const rangeStart = dateToIDate(new Date("2017-01-01T00:00:00Z"));
    const rangeEndDate = getJTCNow();
    rangeEndDate.setMonth(rangeEndDate.getMonth() + 1);
    const rangeEnd = dateToIDate(rangeEndDate);

    const apiResponse = searchMemberListJson;

    const now = new Date().getTime();
    const c = now;
    const s = await hashed(now + Sq.searchSalt1);

    const memberList: SearchMember[] = apiResponse.MemberList.map(x => {
        return {
            isSelect: false,
            ...x
        }
    })

    return {
        memberList,
        rangeStart,
        rangeEnd,
        c,s
    };
}

const Layout = async ({children}: LayoutProps) => {
    const menuValues = await FetchStreamingSearchMenuValues()

    return (
        <section
            id={`streaming-search`}
            className='h-full overflow-y-auto'
        >
            <header id='streaming_search_header' className="px-2 pt-2 h-auto">
                <StreamingSearchMenu {...menuValues} memberList={menuValues.memberList} />
            </header>
            <Suspense fallback={<LoadingField />}>
                {children}
            </Suspense>
        </section>
    )
}

export default Layout