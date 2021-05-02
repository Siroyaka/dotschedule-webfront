import React from 'react';

import PrevAndNextNavigations from 'components/template/PrevAndNextNavigations';

interface OwnProps {
  year: number,
  month: number,
  day: number
}

type Props = OwnProps;

const TodaysPrevNavigation: React.FC<Props> = (props) => {
  const {
    year,
    month,
    day
  } = props;

  const prevDate = new Date(year, month - 1, day);
  prevDate.setDate(prevDate.getDate() - 1);
  const link = `/schedule/${prevDate.getFullYear()}/${prevDate.getMonth() + 1}/${prevDate.getDate()}`;

  return (
    <PrevAndNextNavigations 
      prevNavigation={{href: '/schedule/[year]/[month]/[day]', as: link}}
      nextNavigation={{href: '', disabled: true}}
    />
  )
}
export default TodaysPrevNavigation;