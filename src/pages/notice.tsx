import React from 'react';

import Head from 'next/head';

import noticeJson from 'modules/Notice.json';
import clsx from 'clsx';

interface Json {
  title: string,
  text: string[],
}

const NoticePage: React.FC = () => {
  const notice: Json[] = noticeJson;
  return(
    <React.Fragment>
      <Head>
        <title>このサイトについて</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx('overflow-y-auto', 'h-full', 'w-full', 'px-2')}>
        <ul>
          {notice.map(({title, text}, i) => (
            <li key={`notice-${i}`} className={'pb-4 mt-2'}>
              <h1 className={i===0 ? 'text-2xl' : 'text-xl'}>{title}</h1>
              <ul className={'px-2 pt-1'}>
                {text.map((r, xi) => (
                  <li key={`notice-${i}-row-${xi}`}>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </React.Fragment>
  )
}

export default NoticePage;