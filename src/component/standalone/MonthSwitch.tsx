import React from 'react';
import clsx from 'clsx';

import Link from 'next/link';

import { LeftArrowSvg, RightArrowSvg } from 'component/parts/svgIcons';

import MonthSelectMenuList from 'component/template/MonthSelectMenuList';

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
  prefetch: boolean,
  disabled: boolean,
  href: string,
  as?: string,
}

const LinkComponent: React.FC<LinkComponentProps> = (props) => {
  const { prefetch, disabled, href, as, children } = props;
  return(
    !disabled ? (
      <Link href={href} as={as} prefetch={prefetch}>
        <a className={clsx('py-2', 'px-2', 'focus:outline-none', 'transition', 'duration-200', 'rounded-full', 'hover:bg-gray-200')} >
          {children}
        </a>
      </Link>
    ) : (
      <a className={clsx('py-2', 'px-2', 'focus:outline-none', 'transition', 'duration-200', 'rounded-full')} >
        {children}
      </a>
    )
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
        <LinkComponent href={`/${componentName}/[year]/[month]`} as={`/${componentName}/${before.year}/${before.month}`} prefetch={false} disabled={oldest}>
          <LeftArrowSvg color={oldest ? 'gray' : 'black'}/>
        </LinkComponent>
        <div className={clsx('w-32', 'text-center')}>
          <div className={clsx('cursor-pointer')} onClick={openMenu}>
            <span className={clsx('text-lg')}>{year}年{month}月</span>
          </div>
        </div>
        <LinkComponent href={`/${componentName}/[year]/[month]`} as={`/${componentName}/${after.year}/${after.month}`} prefetch={false} disabled={newest}>
          <RightArrowSvg color={newest ? 'gray' : 'black'} />
        </LinkComponent>
      </section>
      {menuVisible ? (
        <section className={clsx('fixed', 'top-0', 'h-full', 'w-full', 'z-50', 'flex', 'justify-center')}>
          <article id={'closeMonthSelectMenuField'} className={clsx('h-full', 'w-full', 'fixed')} onClick={closeMenu} />
          <article className={clsx('mt-24', 'h-48', 'w-32', 'z-50')}>
            <MonthSelectMenuList start={start} end={end} componentName={componentName} closeMenu={closeMenu} />
          </article>
        </section>
      ) : null}
    </React.Fragment>
  )
}

export default MonthSwitch;