import React from 'react';

import { MonthCalendar } from 'library/DateFunctions';
import Calendar from 'components/template/Calendar';

interface OwnProps {
  year: number,
  month: number,
  monthCalendar: MonthCalendar,
  prefetch: boolean,
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