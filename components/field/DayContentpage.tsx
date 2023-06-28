'use client'

import { DaySchedule, DotscheduleAPIResponse } from "library/api/DotscheduleApi";

import SchedulesField from 'components/field/Schedules';
import DataFetchError from 'components/standalone/DataFetchError'

import { DayScheduleToCardType } from 'library/Converter';

interface Props {
    schedules: DotscheduleAPIResponse<DaySchedule[]>
    isError: boolean
    mode?: "sm" | "md" | "lg" | "xl"
}

const DayContentPage: React.FC<Props> = ({ schedules, isError, mode }) => {
    if (isError) {
        return (
            <article id='schedules' className='mx-2 my-4 text-center'>
                <DataFetchError />
            </article>
        )
    }

    const cardData = schedules?.response_data?.map(x => DayScheduleToCardType(x, 'datetime')) ?? [];

    return (
        <article id='schedules' className='mx-2 my-4'>
            <SchedulesField cardData={cardData} mode={mode} />
        </article>
    )
}

export default DayContentPage;