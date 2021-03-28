import React from 'react';

import { getNow } from 'lib/DateFunctions';
import PrevAndNextNavigations from 'components/template/PrevAndNextNavigations';

interface OwnProps {
  year: number,
  month: number,
  day: number
}

type Props = OwnProps;

const SchedulesNavigation: React.FC<Props> = (props) => {
  const {
    year,
    month,
    day,
    children,
  } = props;

  const prevDate = new Date(year, month - 1, day);
  prevDate.setDate(prevDate.getDate() - 1);
  const prevLink = `/schedule/${prevDate.getFullYear()}/${prevDate.getMonth() + 1}/${prevDate.getDate()}`;

  const nextDate = new Date(year, month - 1, day);
  nextDate.setDate(nextDate.getDate() + 1);
  const today = getNow();
  const nextIsToday = today.getFullYear() === nextDate.getFullYear()
    && today.getMonth() === nextDate.getMonth()
    && today.getDate() === nextDate.getDate();
  
  const nextNavigation = nextIsToday ? {href: '/'} :
    {href: '/schedule/[year]/[month]/[day]', as: `/schedule/${nextDate.getFullYear()}/${nextDate.getMonth() + 1}/${nextDate.getDate()}`};

  return (
    <PrevAndNextNavigations 
      prevNavigation={{href: '/schedule/[year]/[month]/[day]', as: prevLink}}
      nextNavigation={nextNavigation}
    >
      {children}
    </PrevAndNextNavigations>
  )
}
export default SchedulesNavigation;