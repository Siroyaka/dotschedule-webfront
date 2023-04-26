import React from "react"

import { SlugCheck, StreamingScheduleSlug } from 'library/slugs/DaySlug';
import Modal from 'components/template/Modal'

interface LayoutProps {
    children: React.ReactNode
    params: StreamingScheduleSlug
}

const Layout = async ({params, children}: LayoutProps) => {
    const { year, month, day } = params;
    const result = SlugCheck(year, month, day);
    const sectionTitle = result.result ? `${year}年${month}月${day}日`: "無効なページ";
    return (
        <Modal className="w-4/5 xl:w-3/4">
            <section
                id={`streaming-schedule`}
                className='overflow-y-auto h-5/6 mx-4 bg-white pb-20'
            >
                <header id='streaming_schedule_header' className="flex items-center justify-between pt-4 px-2">
                    <h1 className='text-xl px-4 text-center'>{sectionTitle}</h1>
                </header>
                {children}
            </section>
        </Modal>
    )
}

export default Layout