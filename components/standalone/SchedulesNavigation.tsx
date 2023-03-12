import React from 'react';

import PrevAndNextNavigations from 'components/template/PrevAndNextNavigations';

interface OwnProps {
  year: number,
  month: number,
  day: number,
  children?: React.ReactNode,
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
  const prevLink = `/streaming/day/${prevDate.getFullYear()}/${prevDate.getMonth() + 1}/${prevDate.getDate()}`;

  const nextDate = new Date(year, month - 1, day);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextLink = `/streaming/day/${nextDate.getFullYear()}/${nextDate.getMonth() + 1}/${nextDate.getDate()}`;

  return (
    <PrevAndNextNavigations 
      prevNavigation={{href: prevLink}}
      nextNavigation={{href: nextLink}}
    >
      {children}
    </PrevAndNextNavigations>
  )
}
export default SchedulesNavigation;