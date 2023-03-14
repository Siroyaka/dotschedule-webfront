'use client';
import React from 'react';

import Link from 'next/link';

import { NavigationBeforeSvg, NavigationNextSvg } from 'components/parts/svgIcons';

import MonthSelectMenuList from 'components/template/MonthSelectMenuList';

interface OwnProps {
  year: number,
  month: number,
  componentName: string,
  start: {year: number, month: number},
  end: {year: number, month: number},
  children?: React.ReactNode,
}

type Props = OwnProps;

const makePrevAndNextMonth = (year: number, month: number) => {
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = year - (prevMonth === 12 ? 1 : 0);
  const nextMonth = (month % 12) + 1;
  const nextYear = year + (nextMonth === 1 ? 1 : 0);
  return({
    prevMonth: {year: prevYear, month: prevMonth},
    nextMonth: {year: nextYear, month: nextMonth},
  })
}

interface LinkComponentProps {
  disabled: boolean,
  href: string,
  children?: React.ReactNode,
}

const LinkComponent: React.FC<LinkComponentProps> = (props) => {
  const { disabled, href, children } = props;
  const linkOption = disabled ? 'text-gray-300' : 'text-black active:bg-blue-200 hover:bg-blue-100 duration-200 ease-in transition';
  return(
    <div className={`relative rounded-full ${linkOption}`}>
      {!disabled && 
        <Link
          href={{
            pathname: href
          }}
          draggable={false}
          className='absolute h-full w-full top-0 left-0'
        >
        </Link>
      }
      {children}
    </div>
  );
}

const MonthSwitch: React.FC<Props> = (props) => {
  const { year, month, componentName, start, end } = props;

  const { prevMonth, nextMonth } = makePrevAndNextMonth(year, month);
  const oldest = start ? year < start.year || (year === start.year && month <= start.month) : false;

  const [menuVisible, setMenuVisible] = React.useState(false);
  const closeMenu = React.useCallback(() => {
    setMenuVisible(false);
  }, [setMenuVisible])
  const openMenu = React.useCallback(() => {
    setMenuVisible(true);
  }, [setMenuVisible]);

  return(
    <React.Fragment>
      <section id='monthSwitch' className='flex items-center justify-between py-2 px-2'>
        <LinkComponent href={`/${componentName}/${prevMonth.year}/${prevMonth.month}`} disabled={oldest}>
          <NavigationBeforeSvg className='w-8'/>
        </LinkComponent>
        <h2 className='text-xl cursor-pointer' onClick={openMenu}>{year}年{month}月</h2>
        <LinkComponent href={`/${componentName}/${nextMonth.year}/${nextMonth.month}`} disabled={false}>
          <NavigationNextSvg className='w-8'/>
        </LinkComponent>
      </section>
      {menuVisible ? (
        <section className='fixed top-0 h-full w-full z-50 flex justify-center'>
          <article id={'closeMonthSelectMenuField'} className='h-full w-full fixed' onClick={closeMenu} />
          <article className='mt-24 h-64 z-50'>
            <MonthSelectMenuList start={start} end={end} componentName={componentName} closeMenu={closeMenu} />
          </article>
        </section>
      ) : null}
    </React.Fragment>
  )
}

export default MonthSwitch;