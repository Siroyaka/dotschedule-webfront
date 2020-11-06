import React from 'react';

import { GetStaticProps } from 'next';

import MemberNamesArea from 'components/standalone/MemberNamesArea';

interface OwnProps {
  year?: number,
  month?: number,
  day?: number,
}

type Props = OwnProps;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  // revalidateは翌日の9:00まで
  const now = new Date();
  const next9H = new Date();
  next9H.setDate(next9H.getDate() + 1);
  next9H.setHours(0, 0, 0, 0);
  const s = Math.floor((next9H.getTime() - now.getTime()) / 1000);

  const jtNow = new Date();
  jtNow.setHours(jtNow.getHours() + 9);

  const year = jtNow.getFullYear();
  const month = jtNow.getMonth() + 1;
  const day = jtNow.getDate();
  
  const revalidateTime = s;

  return {
    props: {
      year,
      month,
      day,
    },
    revalidate: revalidateTime
  }
}

const NewItemsPage: React.FC<Props> = (props) => {
  const {
    year,
    month,
    day,
  } = props;
  return(
    <article className='h-full px-4'>
      {year && month && day &&
        <h1 className='text-xl mb-2'>{`${year}年${month}月${day}日 9:00の新着`}</h1>
      }
      <MemberNamesArea />
    </article>
  )
}

export default NewItemsPage;