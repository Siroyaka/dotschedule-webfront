import React from 'react';

import { MonthCalendar } from 'library/DateFunctions';
import ListCalendar from 'components/template/ListCalendar';

interface OwnProps {
  year: number,
  month: number,
  monthCalendar: MonthCalendar,
  prefetch: boolean,
  avaters: { [key: number]: string[] } | null,
}

type Props = OwnProps;

const ListField: React.FC<Props> = (props) => {
  return(
    <React.Fragment>
      <ListCalendar {...props} />
    </React.Fragment>
  )
}

export default ListField;