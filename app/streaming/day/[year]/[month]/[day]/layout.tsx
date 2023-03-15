import React from "react"

import SchedulesNavigation from 'components/standalone/SchedulesNavigation';
import { SlugCheck, StreamingScheduleSlug } from './slug'

interface LayoutProps {
    children: React.ReactNode
    params: StreamingScheduleSlug
}

const Layout = async ({params, children}: LayoutProps) => {
    const { year, month, day } = params;
    const result = SlugCheck(year, month, day);
    const sectionTitle = result.result ? `${year}年${month}月${day}日`: "無効なページ";
    return (
        <section
            id={`streaming-schedule`}
            className='h-full overflow-y-auto'
        >
            <header id='streaming_schedule_header' className="flex items-center justify-between py-2 px-2">
                <SchedulesNavigation year={result.year} month={result.month} day={result.day}>
                    <h1 className='text-xl px-4 text-center'>{sectionTitle}</h1>
                </SchedulesNavigation>
            </header>
            {children}
        </section>
    )
}

export default Layout