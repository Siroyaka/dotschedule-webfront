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
      <a className={clsx('thumbnail', 'relative', 'block')} href={href}>
        <img className={clsx('absolute', 'object-cover', 'h-full', 'w-full')} src={src}/>
        <div className={clsx('absolute', 'h-full', 'w-full', 'hover:bg-gray-200', 'hover:bg-opacity-25')}></div>
      </a>
    </div>
  )
}
export default Media;