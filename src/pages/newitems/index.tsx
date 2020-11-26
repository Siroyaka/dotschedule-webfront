import React from 'react';

import { GetStaticProps } from 'next';

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
  if(!props.year) {
    return (
      <LoadingField />
    )
  }
  return(
    <NewsPage {...props}/>
  )
}

export default NewItemsPage;