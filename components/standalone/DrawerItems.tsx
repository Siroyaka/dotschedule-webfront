import React from 'react';

import Link from 'next/link';

import { MessageIconSvg, NoticeIconSvg, CommunityIconSvg } from 'components/parts/svgIcons';
import { DISCORD_LINK, MESSAGE_FORM_URL } from 'library/Constructions';

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
              pathname: '/notice/siteinfo'
            }}
            className={'block py-2 px-2 text-left hover:bg-blue-100 flex'}
            style={{ transition: 'all .15s ease' }}
            draggable={false}
          >
            <div className={'mr-4'}>
              <NoticeIconSvg />
            </div>
            <div>
              <span className={'text-lg'}>このサイトについて</span>
            </div>
          </Link>
        </li>
        <li className={'w-full'}>
          <a className={'block py-2 px-2 text-left hover:bg-blue-100 flex'} href={DISCORD_LINK} style={{transition: 'all .15s ease'}} target='_blank' rel='noreferrer noopener'>
            <div className={'mr-4'}>
              <CommunityIconSvg />
            </div>
            <div>
              <span className={'text-lg'}>Discord</span>
            </div>
          </a>
        </li>
        <li className={'w-full'}>
          <a className={'block py-2 px-2 text-left hover:bg-blue-100 flex'} href={MESSAGE_FORM_URL} style={{transition: 'all .15s ease'}} target='_blank' rel='noreferrer noopener'>
            <div className={'mr-4'}>
              <MessageIconSvg />
            </div>
            <div>
              <span className={'text-lg'}>お問い合わせ</span>
            </div>
          </a>
        </li>
      </ul>
    </React.Fragment>
  )
}

export default DrawerItems;