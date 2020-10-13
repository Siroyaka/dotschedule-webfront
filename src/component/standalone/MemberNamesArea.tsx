import React from 'react';

import Link from 'next/link';

import { getNewsStreamerList } from 'lib/Constructions';

interface OwnProps {
  slug?: string
}

type Props = OwnProps;

const newStreamerList = getNewsStreamerList();

const MemberNamesArea: React.FC<Props> = (props) => {
  const {
    slug
  } = props;

  return(
    <div className='flex flex-wrap flex-row'>
      {newStreamerList.map(x => (
        <div
          key={`membernames-area-${x.slug}`}
          className='mx-2 my-1'
        >
          {(!slug || slug !== x.slug) ?
            <Link href={'/newitems/[slug]'} as={`/newitems/${x.slug}`}>
              <a className='text-black'>
                {x.name}
              </a>
            </Link>
          : 
            <p className='text-blue-600'>
              {x.name}
            </p>
          }
        </div>
      ))}
    </div>
  )
}

export default MemberNamesArea;