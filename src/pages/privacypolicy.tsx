import React from 'react';

import Head from 'next/head';

const NoticePage: React.FC = () => {
  return(
    <React.Fragment>
      <Head>
        <title>プライバシーポリシー</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={'overflow-y-auto h-full w-full px-2'}>
        <article className='max-w-4xl mx-8 lg:mx-auto my-8 sm:my-16'>
          <h1 className={'text-2xl sm:text-4xl w-full text-center mb-8 sm:mb-16'}>プライバシーポリシー</h1>
          <ul className={'shadow-md border-2 px-8 py-8'}>
            <h1 className='text-xl sm:text-2xl mb-4'>Googleアナリティクスについて</h1>
            <li className={'text-sm sm:text-base'}>
              当サイトでは、利用状況の把握のためGoogleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
            </li>
            <li className={'text-sm sm:text-base'}>
              Googleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
            </li>
            <li className={'text-sm sm:text-base'}>
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
            </li>
            <li className={'text-sm sm:text-base'}>
              Googleアナリティクスに関しての詳細は<a className='text-blue-600 hover:bg-blue-200' href='https://marketingplatform.google.com/about/analytics/terms/jp/'>Googleアナリティクスサービス利用規約</a>のページや<a className='text-blue-600 hover:bg-blue-200' href='https://policies.google.com/technologies/ads?hl=ja'>Googleポリシーと規約</a>ページをご覧ください。
            </li>
          </ul>
        </article>
      </main>
    </React.Fragment>
  )
}

export default NoticePage;