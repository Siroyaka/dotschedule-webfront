import React from 'react';

import Link from 'next/link';

import { MessageIconSvg, NoticeIconSvg } from 'component/parts/svgIcons';

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
            <a className={'block px-4 py-2 text-left hover:bg-red-200 flex'}>
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
            <a className={'block px-4 py-2 text-left hover:bg-red-200 flex'}>
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
          <a className={'block px-4 py-2 text-left hover:bg-red-200 flex'} href={'https://forms.office.com/Pages/ResponsePage.aspx?id=ThwL2RuzK0KlbUGjoK6habx0cw6yroJPt2erS48Y7LVUMlJHOVU4MlhYSU5QSlg1UUtYUU9YSFpKRy4u'}>
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