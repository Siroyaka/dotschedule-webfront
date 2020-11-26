import React from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import NewsPage from 'components/page/NewsPage';
import LoadingField from 'components/field/Loading';

import { fetchData } from 'lib/NewsPages';

interface OwnProps {
  year?: number,
  month?: number,
  day?: number,
  hour?: number,
}

type Props = OwnProps;

const HeadItems: React.FC = (props) => {
  return(
    <Head>
      <title>NewSchedules</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const item = await fetchData();

  return {
    props: {
      ...item
    },
    revalidate: item.secForNextUpdate
  }
}

const NewItemsPage: React.FC<Props> = (props) => {
  return(
    <React.Fragment>
      <HeadItems />
      {props.year ?
        <NewsPage {...props}/>
      :
        <LoadingField />
      }
    </React.Fragment>
  )
}

export default NewItemsPage;