import React from 'react';

import Link from 'next/link';

interface OwnProps {
  href: string,
  disabled?: boolean,
  children?: React.ReactNode,
}

type Props = OwnProps;

const Navigation: React.FC<Props> = (props) => {
  const { disabled, href, children } = props;
  const linkOption = disabled ? 'text-gray-300' : 'text-black active:bg-blue-200 hover:bg-blue-100 duration-200 ease-in transition';
  return(
    <div className={`relative rounded-full ${linkOption}`}>
      {!disabled && 
        <Link
          className='absolute h-full w-full top-0 left-0'
          href={{
            pathname: href
          }}
          draggable={false}
          prefetch={false}
        >
        </Link>
      }
      {children}
    </div>
  );
}

export default Navigation;