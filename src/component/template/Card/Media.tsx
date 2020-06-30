import React from 'react';
import clsx from 'clsx';

interface OwnProps {
  src: string,
  href: string,
}

type Props = OwnProps;

const Media: React.FC<Props> = (props) => {
  const { src, href } = props;

  return(
    <div className={clsx('overflow-hideen')}>
      <a className={clsx('thumbnail', 'relative', 'block')} href={href} aria-label={'youtube link'}>
        <img alt={`${href}-img`} className={clsx('absolute', 'object-cover', 'h-full', 'w-full')} src={src}/>
        <div className={clsx('absolute', 'h-full', 'w-full', 'hover:bg-gray-400', 'hover:bg-opacity-25', 'active:bg-gray-200', 'active:bg-opacity-25')} style={{transition: 'all .15s ease'}}></div>
      </a>
    </div>
  )
}
export default Media;