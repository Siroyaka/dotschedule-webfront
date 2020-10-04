import React from 'react';

import Head from 'next/head';

import noticeJson from 'lib/Notice.json';

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
      <main className={'overflow-y-auto h-full'}>
        <article className='max-w-4xl mx-8 lg:mx-auto my-8 sm:my-16'>
          <h1 className='text-2xl sm:text-4xl text-center w-full mb-8 sm:mb-16'>このサイトについて</h1>
          <ul className='shadow-md border-2 px-8 py-8'>
            {notice.map(({title, text}, i) => (
              <li key={`notice-${i}`} className={'pb-4 mt-2'}>
                <h1 className='text-lg sm:text-2xl'>{title}</h1>
                <ul className={'px-2 pt-1'}>
                  {text.map((r, xi) => (
                    <li key={`notice-${i}-row-${xi}`}>
                      <span className='text-sm sm:text-base'>{r}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

        </article>
      </main>
    </React.Fragment>
  )
}

export default NoticePage;