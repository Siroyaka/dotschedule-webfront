import React from 'react';

import { CardType } from 'components/field/News';
import LoadingField from 'components/field/Loading';
import NewsPage from 'components/page/NewsPage';

import { fetchData } from 'lib/NewsPages';

import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';

interface OwnProps {
  slug?: string,
  data?: CardType[],
  year?: number,
  month?: number,
  day?: number,
  hour?: number,
}

type Props = OwnProps;

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
  if(!props.slug) {
    return(
      <LoadingField />
    )
  }
  return(
    <NewsPage {...props}/>
  )
}

export default NewItemsMemberPage;