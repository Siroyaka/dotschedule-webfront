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

const TabItems: React.FC<{value: string, link: string, as?: string, isLink: boolean, children?: React.ReactNode}> = (props) => {
  const {
    link,
    children,
    isLink,
    as
  } = props;

  const linkOption = isLink ? 'bg-blue-500' : 'hover:bg-blue-200 active:bg-blue-300  duration-150 ease-in transform transition-all';
  return(
    <React.Fragment>
      <div className={`relative w-full h-full rounded text-xs text-center px-1 py-1 ${linkOption}`}>
        {!isLink && 
          <Link legacyBehavior href={link} as={as} draggable={false}>
            <a className='absolute top-0 left-0 h-full w-full'/>
          </Link>
        }
        <div className={`${isLink ? 'text-white' : 'text-black'} text-xs flex flex-col items-center`}>
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

  return (
    <Bottoms>
      <ul className='flex h-full'>
        <li className="flex-1">
          <TabItems link="/" value={routePath} isLink={routePath === ''}>
            <TodaySvg />
            <span>Today</span> 
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems
            link={'/streaming/calendar/[year]/[month]'}
            as={`/streaming/calendar${linkChild}`}
            value={routePath} isLink={routePath === 'calendar'}
          >
            <CalendarSvg />
            <span>Calendar</span> 
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems
            link={'/streaming/monthlist/[year]/[month]'}
            as={`/streaming/monthlist${linkChild}`}
            value={routePath}
            isLink={routePath === 'monthlist'}
          >
            <ListSvg />
            <span>List</span>
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems
            link={'/streaming/search'}
            as={'/streaming/search'}
            value={routePath}
            isLink={routePath === 'search'}
          >
            <SearchIconSvg />
            <span>Search</span>
          </TabItems>
        </li>
      </ul>

    </Bottoms>
  );
}

export default BottomNavigations;