import React from 'react';

import { MonthCalendar } from 'lib/DateFunctions';
import MonthSwitch from 'component/standalone/MonthSwitch';
import Calendar from 'component/template/Calendar';

interface OwnProps {
  year: number,
  month: number,
  monthCalendar: MonthCalendar,
  start: { year: number, month: number, day: number },
  end: { year: number, month: number, day: number },
}

type Props = OwnProps;

const CalendarField: React.FC<Props> = (props) => {
  return(
    <React.Fragment>
      <Calendar {...props} />
    </React.Fragment>
  )
}

export default CalendarField;