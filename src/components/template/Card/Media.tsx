import React from 'react';
import Image from 'next/image';

interface OwnProps {
  src: string,
  href: string,
}

type Props = OwnProps;

const Media: React.FC<Props> = (props) => {
  const { src, href } = props;

  return(
    <div className='overflow-hideen'>
      <a className='thumbnail relative block' href={href} target='_blank' aria-label={'youtube link'} rel='noopener noreferrer'>
        <Image
          alt={`${href}-img`}
          className='absolute object-cover h-full w-full'
          src={src}
          fill
          />
        <div className='absolute h-full w-full bg-opacity-0 bg-white hover:bg-opacity-20 active:bg-gray-200 active:bg-opacity-40' style={{transition: 'all .15s ease'}}></div>
      </a>
    </div>
  )
}
export default Media;