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
    <header className='flex flex-row gap-1 py-2 px-2'>
      {avaterSrc && avaterSrc.length > 0 ? 
        <Image
          width={50}
          height={50}
          className='rounded-full h-14 w-14 flex-shrink-0'
          alt={`${name}-avater`}
          src={avaterSrc}
          />
      : 
        <div className={`rounded-full bg-gray-200 flex-shrink-0 text-center flex justify-center items-center h-14 w-14 text-2xl` }>
          他
        </div>
      }
      <article className='flex flex-1 truncate justify-between'>
        <div>
          <h1 className='text-xl'>{name}</h1>
        </div>
      </article>
      <div className='flex flex-col text-gray-600 text-xs justify-end items-end gap-1'>
        <div>
          <a>{startTime}</a>
        </div>
        <div>
          <a>{duration}</a>
        </div>
      </div>
    </header>
  );
}
export default Header;