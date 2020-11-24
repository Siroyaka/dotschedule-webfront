import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

interface OwnProps {
  src: string,
  href: string,
}

type Props = OwnProps;

const Media: React.FC<Props> = (props) => {
  const { src, href } = props;

  return(
    <div className={clsx('overflow-hideen')}>
      <a className={clsx('thumbnail', 'relative', 'block')} href={href} target='_blank' aria-label={'youtube link'} rel='noopener noreferrer'>
        <img alt={`${href}-img`} className={clsx('absolute', 'object-cover', 'h-full', 'w-full')} src={src}/>
        <div className={clsx('absolute', 'h-full', 'w-full', 'bg-opacity-0', 'bg-white', 'bg-hover-opacity-10', 'active:bg-gray-200', 'active:bg-opacity-25')} style={{transition: 'all .15s ease'}}></div>
      </a>
    </div>
  )
}
export default Media;