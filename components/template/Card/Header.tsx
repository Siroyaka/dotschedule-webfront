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
    <header className='flex flex-row gap-2 pt-2 px-2 pb-3'>
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
    </header>
  );
}
export default Header;