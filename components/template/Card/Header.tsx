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
    <header className='flex flex-row gap-2 pt-2 px-2 mb-3'>
      {avaterSrc && avaterSrc.length > 0 ? 
        <Image
          width={50}
          height={50}
          className='rounded-full h-12 w-12 flex-shrink-0'
          alt={`${name}-avater`}
          src={avaterSrc}
          />
      : 
        <div className={`rounded-full bg-gray-200 flex-shrink-0 text-center flex justify-center items-center h-12 w-12 shadow text-xl` }>
          他
        </div>
      }
      <article className='text-lg leading-tight'>
        <h1>{name}</h1>
      </article>
    </header>
  );
}
export default Header;