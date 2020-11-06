import React from 'react';

import Link from 'next/link';

import { MessageIconSvg, NoticeIconSvg } from 'components/parts/svgIcons';
import { MESSAGE_FORM_URL } from 'lib/Constructions';

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
          <Link href='/notice'>
            <a className={'block px-4 py-2 text-left hover:bg-red-200 flex active:bg-red-100'} style={{transition: 'all .15s ease'}}>
              <div className={'mr-4'}>
                <NoticeIconSvg />
              </div>
              <div>
                <span className={'text-lg'}>このサイトについて</span>
              </div>
            </a>
          </Link>
        </li>
        <li className={'w-full'}>
          <Link href='/privacypolicy'>
            <a className={'block px-4 py-2 text-left hover:bg-red-200 flex active:bg-red-100'} style={{transition: 'all .15s ease'}}>
              <div className={'mr-4'}>
                <NoticeIconSvg />
              </div>
              <div>
                <span className={'text-lg'}>プライバシーポリシー</span>
              </div>
            </a>
          </Link>
        </li>
        <li className={'w-full'}>
          <a className={'block px-4 py-2 text-left hover:bg-red-200 flex active:bg-red-100'} href={MESSAGE_FORM_URL} style={{transition: 'all .15s ease'}}>
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