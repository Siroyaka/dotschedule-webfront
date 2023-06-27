import React from 'react';
import Image from 'next/image'

import { NoImageAvater } from 'components/parts/noimage';

interface OwnProps {
  avaterSrc?: string,
  name: string,
  startTime?: string,
  duration?: string,
}

type Props = OwnProps;

const Header: React.FC<Props> = (props) => {
  const { avaterSrc, name, startTime, duration } = props;

  return (
    <section className='flex flex-row my-1'>
      {avaterSrc && avaterSrc.length > 0 ? 
        <Image
          width={50}
          height={50}
          className='rounded-full h-14 w-14 px-1 py-1 flex-shrink-0'
          alt={`${name}-avater`}
          src={avaterSrc}
          />
      : 
        <NoImageAvater />
      }
      <article className='mx-1 my-1 w-full'>
        <h1 className='text-lg'>{name}</h1>
        <div className='flex flex-row justify-between text-gray-700 text-sm'>
          <span>{startTime}</span>
          <span>{duration}</span>
        </div>
      </article>
    </section>
  );
}
export default Header;