import React from 'react';
import clsx from 'clsx';

import Link from 'next/link';

interface OwnProps {
  start: {year: number, month: number},
  end: {year: number, month: number},
  componentName: string,
  closeMenu: () => void,
}

const ymToNumber = (year: number, month: number) => year * 12 + month - 1;
const NumberToym = (n: number) => ({year: Math.floor(n / 12), month: n % 12 + 1});

type Props = OwnProps;

const monthListStartToEnd = (start: {year: number, month: number}, end: {year: number, month: number}) => {
  const startNumber = ymToNumber(start.year, start.month);
  const endNumber = ymToNumber(end.year, end.month);
  const list: {year: number, month: number}[] = [];
  for(let i = startNumber; i <= endNumber; i++) {
    list.push(NumberToym(i));
  }
  return list;
}

const MonthSelectMenuList: React.FC<Props> = (props) => {
  const { start, end, componentName, closeMenu } = props;

  return(
    <ol className={clsx('bg-blue-100', 'h-full', 'overflow-y-auto')} onClick={closeMenu}>
      {monthListStartToEnd(start, end).map(({year, month}) => (
        <li key={`select-month-value-${year}-${month}`}>
          <Link href={`/${componentName}/[year]/[month]`} as={`/${componentName}/${year}/${month}`} prefetch={false}>
            <a className={clsx('text-lg')}>
              <span>{year}年{month}月</span>
            </a>
          </Link>
        </li>
      ))}
    </ol>
  )
}

export default MonthSelectMenuList;