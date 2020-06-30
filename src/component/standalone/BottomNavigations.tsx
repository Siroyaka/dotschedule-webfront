import React from 'react';
import clsx from 'clsx';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Bottoms from 'component/template/Bottoms';
import { TodaySvg, CalendarSvg, ListSvg } from 'component/parts/svgIcons';

interface OwnProps {
}

export type Props = OwnProps;

const TabItems: React.FC<{value: string, link: string, as?: string, isLink: boolean}> = (props) => {
  const {
    link,
    children,
    isLink,
    as
  } = props;
  return(
    <React.Fragment>
      {isLink ? (
        <div className='flex flex-col border border-blue-500 rounded py-1 px-1 bg-blue-500 items-center text-center text-xs text-gray-200'>
          {children}
        </div>
      ) : (
        <Link href={link} as={as} >
          <a className='flex flex-col border border-white rounded hover:border-blue-200 hover:bg-blue-200 py-1 px-1 items-center text-center text-xs text-gray-600 active:bg-blue-300' style={{transition: 'all .15s ease'}} >
            {children}
          </a>
        </Link>
      )}
    </React.Fragment>
  )
}

const BottomNavigations: React.FC<Props> = (props) => {
  const router = useRouter();
  const splitPath = router.asPath.split("/");
  const routePath = splitPath[1];
  const year = routePath.length < 3 ? null : parseInt(splitPath[2]);
  const month = routePath.length < 4 ? null : parseInt(splitPath[3]);
  const n = new Date();
  n.setHours(n.getHours() + 6);
  const [linkChild, setLinkChild] = React.useState(`/${n.getFullYear()}/${n.getMonth() + 1}`);

  React.useEffect(() => {
    if (routePath !== 'calendar' && routePath !== 'list') return;
    if (year === null || month === null) return;
    if (isNaN(year) || isNaN(month)) return;
    setLinkChild(`/${year}/${month}`);
  }, [year, month])

  const calendarLink = `/calendar${linkChild}`;
  const listLink = `/list${linkChild}`;

  return (
    <Bottoms>
      <ul className={clsx('flex', 'h-full')}>
        <li className="flex-1">
          <TabItems link="/" value={routePath} isLink={routePath === ''}>
            <TodaySvg color={routePath === '' ? 'white' : 'black'}/>
            <span>Today</span> 
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems link={'/calendar/[year]/[month]'} as={calendarLink} value={routePath} isLink={routePath === 'calendar'}>
            <CalendarSvg color={routePath === 'calendar' ? 'white' : 'black'}/>
            <span>Calendar</span> 
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems link={'/list/[year]/[month]'} as={listLink} value={routePath} isLink={routePath === 'list'}>
            <ListSvg color={routePath === 'list' ? 'white' : 'black'}/>
            <span>List</span> 
          </TabItems>
        </li>
      </ul>
    </Bottoms>
  );
}

export default BottomNavigations;