import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Bottoms from 'components/template/Bottoms';
import { TodaySvg, CalendarSvg, ListSvg, NewsIconSvg } from 'components/parts/svgIcons';

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

  const linkOption = isLink ? 'bg-blue-500' : 'hover:bg-blue-200 active:bg-blue-300  duration-150 ease-in transform transition-all';
  return(
    <React.Fragment>
      <div className={`relative w-full h-full rounded text-xs text-center px-1 py-1 ${linkOption}`}>
        {!isLink && 
          <Link href={link} as={as} >
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

const BottomNavigations: React.FC<Props> = (props) => {
  const router = useRouter();
  const splitPath = router.asPath.split("/");
  const routePath = splitPath[1];
  const year = routePath.length < 3 ? null : parseInt(splitPath[2]);
  const month = routePath.length < 4 ? null : parseInt(splitPath[3]);
  const n = new Date();
  n.setHours(n.getHours());
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
      <ul className='flex h-full'>
        <li className="flex-1">
          <TabItems link="/" value={routePath} isLink={routePath === ''}>
            <TodaySvg />
            <span>Today</span> 
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems link={'/calendar/[year]/[month]'} as={calendarLink} value={routePath} isLink={routePath === 'calendar'}>
            <CalendarSvg />
            <span>Calendar</span> 
          </TabItems>
        </li>
        <li className="flex-1">
          <TabItems link={'/list/[year]/[month]'} as={listLink} value={routePath} isLink={routePath === 'list'}>
            <ListSvg />
            <span>List</span>
          </TabItems>
        </li>
      </ul>

    </Bottoms>
  );
}

export default BottomNavigations;