'use client'

import { DaySchedule } from "library/api/DotscheduleApi";

import SchedulesField from 'components/field/Schedules';
import DataFetchError from 'components/standalone/DataFetchError'

import { DayScheduleToCardType } from 'library/Converter';

interface Props {
    schedules?: DaySchedule[]
    isError: boolean
}

const ClientViews: React.FC<Props> = ({ schedules, isError }) => {
    if (isError) {
        return (
            <DataFetchError />
        )
    }

    const cardData = schedules?.map(x => DayScheduleToCardType(x)) ?? [];

    return (
        <article id='schedules' className='mx-2 my-4'>
            <SchedulesField cardData={cardData} />
        </article>
    )
}

export default ClientViews;