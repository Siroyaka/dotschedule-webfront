import React from 'react';

import Link from 'next/link';

import { NoticeIconSvg, CommunityIconSvg } from 'components/parts/svgIcons';
import { DISCORD_LINK } from 'library/Constructions';

interface OwnProps {
  closeDrawer: () => void
}

type Props = OwnProps;

const DrawerItems: React.FC<Props> = (props) => {
  const { closeDrawer } = props;
  return(
    <React.Fragment>
      <ul onClick={closeDrawer}>
        <li className={'w-full'}>
          <Link
            href={{
              pathname: '/streaming/notice/siteinfo'
            }}
            className={'block py-2 px-2 text-left hover:bg-blue-100 flex'}
            style={{ transition: 'all .15s ease' }}
            draggable={false}
            prefetch={false}
          >
            <div className={'mr-4 flex items-center'}>
              <NoticeIconSvg className='w-6'/>
            </div>
            <div>
              <span className={'text-lg'}>このサイトについて</span>
            </div>
          </Link>
        </li>
        <li className={'w-full'}>
          <a className={'block py-2 px-2 text-left hover:bg-blue-100 flex'} href={DISCORD_LINK} style={{transition: 'all .15s ease'}} target='_blank' rel='noreferrer noopener'>
            <div className={'mr-4 flex items-center'}>
              <CommunityIconSvg className='w-6'/>
            </div>
            <div>
              <span className={'text-lg'}>Discord</span>
            </div>
          </a>
        </li>
      </ul>
    </React.Fragment>
  )
}

export default DrawerItems;