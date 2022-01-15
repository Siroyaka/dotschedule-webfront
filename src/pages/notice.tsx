import React from 'react';

import Head from 'next/head';

import { getHtmlFromMarkdown } from 'lib/IOModules';
import path from 'path';

import { GetStaticProps } from 'next';

interface OwnProps {
  contents: string
}

type Props = OwnProps;

const markdownPath = 'server_data/markdown/notice.md';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const mdPath = path.join(process.cwd(), markdownPath);
  const contents = await getHtmlFromMarkdown(mdPath);
  return {
    props: {
      contents
    },
    revalidate: 60 * 5
  }
}

const NoticePage: React.FC<Props> = (props) => {
  const {
    contents
  } = props;

  return(
    <React.Fragment>
      <Head>
        <title>このサイトについて</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={'overflow-y-auto h-full'}>
        <article className='max-w-4xl mx-8 lg:mx-auto my-8 sm:my-16'>
          <h1 className='text-2xl sm:text-4xl text-center w-full mb-8 sm:mb-16'>このサイトについて</h1>
          <div
            id='notice-contents'
            className='shadow-md border-2 px-8 py-8 '
            dangerouslySetInnerHTML={{__html: contents}}
          >
          </div>

        </article>
      </main>
    </React.Fragment>
  )
}

export default NoticePage;