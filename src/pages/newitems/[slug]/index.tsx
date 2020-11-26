import React from 'react';

import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';
import Head from 'next/head';

import { CardType } from 'components/field/News';
import LoadingField from 'components/field/Loading';
import NewsPage from 'components/page/NewsPage';

import { fetchData } from 'lib/NewsPages';

interface OwnProps {
  slug?: string,
  data?: CardType[],
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const slug = params.slug as string;

  const item = await fetchData(slug);

  return {
    props: {
      ...item,
      slug,
    },
    revalidate: item.secForNextUpdate
  }
}

const NewItemsMemberPage: React.FC<Props> = (props) => {
  return(
    <React.Fragment>
      <HeadItems />
      {props.slug ?
        <NewsPage {...props}/>
      :
        <LoadingField />
      }
    </React.Fragment>
  )
}

export default NewItemsMemberPage;