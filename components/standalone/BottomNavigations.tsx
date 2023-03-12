'use client'

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Bottoms from 'components/template/Bottoms';
import { TodaySvg, CalendarSvg, ListSvg, SearchIconSvg } from 'components/parts/svgIcons';
import { getJTCNow } from 'library/DateFunctions';

interface OwnProps {
}

export type Props = OwnProps;

const TabItems: React.FC<{href?: string, children?: React.ReactNode}> = (props) => {
  const {
    href,
    children,
  } = props;

  const isLink = href !== undefined;

  const linkOption = isLink ? 'hover:bg-blue-200 active:bg-blue-300  duration-150 ease-in transform transition-all' : 'bg-blue-500';
  return(
    <React.Fragment>
      <div className={`relative w-full h-full rounded text-xs text-center px-1 py-1 ${linkOption}`}>
        {isLink && 
          <Link href={{
            pathname: href
          }}
          draggable={false}
          prefetch={false}
          className='absolute top-0 left-0 h-full w-full'
        >
          </Link>
        }
        <div className={`${isLink ? 'text-black' : 'text-white'} text-xs flex flex-col items-center`}>
          {children}
        </div>
      </div>
    </React.Fragment>
  )
}

const BottomNavigations = () => {
  const now = getJTCNow();

  const splitPath = usePathname()?.split("/") ?? "";
  const routePath = splitPath[2];
  const year = splitPath.length < 4 ? now.getFullYear() : parseInt(splitPath[3]);
  const month = splitPath.length < 5 ? now.getMonth() + 1 : parseInt(splitPath[4]);
  const linkChild = `/${year}/${month}`;
  const todayPath = `/streaming/day/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;

  return (
    <Bottoms>
      <ul className='flex h-full'>
        <li className="flex-1">
          <TabItems href={todayPath}>
            <TodaySvg />
            <span>Today</span> 
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems href={routePath !== 'calendar' ? `/streaming/calendar${linkChild}` : undefined}>
            <CalendarSvg />
            <span>Calendar</span> 
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems href={routePath !== 'monthlist' ? `/streaming/monthlist${linkChild}` : undefined}>
            <ListSvg />
            <span>List</span>
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems href={routePath !== 'search' ? '/streaming/search' : undefined}>
            <SearchIconSvg />
            <span>Search</span>
          </TabItems>
        </li>
      </ul>

    </Bottoms>
  );
}

export default BottomNavigations;