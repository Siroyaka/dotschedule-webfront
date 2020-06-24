import React from 'react';

import Head from 'next/head';

import clsx from 'clsx';

const NoticePage: React.FC = () => {
  return(
    <React.Fragment>
      <Head>
        <title>プライバシーポリシー</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx('overflow-y-auto', 'h-full', 'w-full', 'px-2')}>
        <h1 className={'text-2xl'}>プライバシーポリシー</h1>
        <ul className={'px-2 pt-1'}>
          <li className={''}>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
          </li>
          <li className={'pb-2'}>
            Googleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
          </li>
          <li>
            この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
          </li>
          <li>
            Googleアナリティクスに関しての詳細は<a className='text-blue-600 hover:bg-blue-200' href='https://marketingplatform.google.com/about/analytics/terms/jp/'>Googleアナリティクスサービス利用規約</a>のページや<a className='text-blue-600 hover:bg-blue-200' href='https://policies.google.com/technologies/ads?hl=ja'>Googleポリシーと規約</a>ページをご覧ください。
          </li>
        </ul>
      </main>
    </React.Fragment>
  )
}

export default NoticePage;