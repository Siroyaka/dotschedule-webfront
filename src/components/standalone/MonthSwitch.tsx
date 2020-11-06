import React from 'react';
import clsx from 'clsx';

import Link from 'next/link';

import { LeftArrowSvg, RightArrowSvg } from 'components/parts/svgIcons';

import MonthSelectMenuList from 'components/template/MonthSelectMenuList';

interface OwnProps {
  year: number,
  month: number,
  componentName: string,
  start?: {year: number, month: number}
  end?: {year: number, month: number}
}

type Props = OwnProps;

const f = (year: number, month: number) => {
  const beforeMonth = month === 1 ? 12 : month - 1;
  const beforeYear = year - (beforeMonth === 12 ? 1 : 0);
  const afterMonth = (month % 12) + 1;
  const afterYear = year + (afterMonth === 1 ? 1 : 0);
  return({
    before: {year: beforeYear, month: beforeMonth},
    after: {year: afterYear, month: afterMonth},
  })
}

interface LinkComponentProps {
  disabled: boolean,
  href: string,
  as?: string,
}

const LinkComponent: React.FC<LinkComponentProps> = (props) => {
  const { disabled, href, as, children } = props;
  const linkOption = disabled ? 'text-gray-300' : 'text-black active:bg-gray-300 hover:bg-gray-200 duration-200 ease-in transition';
  return(
    <div className={`relative py-2 px-2 rounded-full ${linkOption}`}>
      {!disabled && 
        <Link href={href} as={as}>
          <a className='absolute h-full w-full top-0 left-0' />
        </Link>
      }
      {children}
    </div>
  );
}

const MonthSwitch: React.FC<Props> = (props) => {
  const { year, month, componentName, start, end } = props;

  const { before, after } = f(year, month);
  const oldest = start ? year < start.year || (year === start.year && month <= start.month) : false;
  const newest = end ? year > end.year || (year === end.year && month >= end.month) : false;
  const [menuVisible, setMenuVisible] = React.useState(false);
  const closeMenu = React.useCallback(() => {
    setMenuVisible(false);
  }, [setMenuVisible])
  const openMenu = React.useCallback(() => {
    setMenuVisible(true);
  }, [setMenuVisible]);

  return(
    <React.Fragment>
      <section id='monthSwitch' className={clsx('flex', 'items-center', 'justify-between', 'py-2', 'px-2')}>
        <LinkComponent href={`/${componentName}/[year]/[month]`} as={`/${componentName}/${before.year}/${before.month}`} disabled={oldest}>
          <LeftArrowSvg />
        </LinkComponent>
        <div className={clsx('w-32', 'text-center')}>
          <div className={clsx('cursor-pointer')} onClick={openMenu}>
            <span className={clsx('text-lg')}>{year}年{month}月</span>
          </div>
        </div>
        <LinkComponent href={`/${componentName}/[year]/[month]`} as={`/${componentName}/${after.year}/${after.month}`} disabled={newest}>
          <RightArrowSvg />
        </LinkComponent>
      </section>
      {menuVisible ? (
        <section className={clsx('fixed', 'top-0', 'h-full', 'w-full', 'z-50', 'flex', 'justify-center')}>
          <article id={'closeMonthSelectMenuField'} className={clsx('h-full', 'w-full', 'fixed')} onClick={closeMenu} />
          <article className={clsx('mt-24', 'h-64', 'z-50')}>
            <MonthSelectMenuList start={start} end={end} componentName={componentName} closeMenu={closeMenu} />
          </article>
        </section>
      ) : null}
    </React.Fragment>
  )
}

export default MonthSwitch;