import React from 'react';

import NewsCardsField, { CardType } from 'component/field/News';
import MemberNamesArea from 'component/standalone/MemberNamesArea';
import { getNewsStreamerList } from 'lib/Constructions';
import { getNewsScheduleData } from 'lib/firebase';
import { VideoScheduleToNews } from 'lib/Converter';

import {
  GetStaticPaths,
  GetStaticProps,
} from 'next';

interface OwnProps {
  slug?: string,
  data?: CardType[],
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

  const match = getNewsStreamerList().find(x => x.slug === slug);
  const now = new Date();
  if(now.getHours() < 8) {
    now.setDate(now.getDate() - 1);
  }
  now.setHours(8, 0, 0, 0);

  const data = await getNewsScheduleData(VideoScheduleToNews)(match.id, now, 10);
  
  const revalidateTime = 1000000;

  return {
    props: {
      slug,
      data: data
    },
    revalidate: revalidateTime
  }
}

const NewItemsMemberPage: React.FC<Props> = (props) => {
  const {
    slug,
    data,
  } = props;
  return(
    <article className='px-4 pb-16'>
      <MemberNamesArea slug={slug}/>
      <NewsCardsField cardData={data}/>
    </article>
  )
}

export default NewItemsMemberPage;