import { StreamingSearchRequest, StreamingSearchRequestParams } from 'library/api/DotscheduleApi';

import ContentMain from 'components/container/ContentMain';
import SchedulesNavigation from 'components/standalone/SchedulesNavigation';
import ContentPage from './contentpage';
import { IDate } from 'library/DateFunctions';

export const dynamic = 'force-dynamic';

import { getJTCNow } from 'library/DateFunctions';

const FetchData = async (year: number, month: number, day: number) => {
    const d: IDate = {
        year, month, day
    }
    const requestParams: StreamingSearchRequestParams = {
        page: 1,
        from: d,
        to: d,
        sort: "older",
        reason: "dayschedule"
    }

    const req = new StreamingSearchRequest();
    return await req.Get(requestParams, 10);
}

async function Page() {
    const d = getJTCNow();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    const sectionTitle = `${year}年${month}月${day}日`;

    const { isError, data } = await FetchData(year, month, day)

    return (
        <ContentMain>
            <section
                id={`streaming-schedule`}
                className='h-full overflow-y-auto'
            >
                <header id='streaming_schedule_header' className="flex items-center justify-between py-2 px-2">
                    <SchedulesNavigation year={year} month={month} day={day}>
                        <h1 className='text-xl px-4 text-center'>{sectionTitle}</h1>
                    </SchedulesNavigation>
                </header>
                <ContentPage isError={isError} schedules={data}/>
            </section>
        </ContentMain>
    )

}

export default Page;