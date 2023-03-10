import React from 'react';

import Link from 'next/link';

import { getNewsStreamerList } from 'library/Constructions';

interface OwnProps {
  slug?: string
}

type Props = OwnProps;

const newStreamerList = getNewsStreamerList();

const MemberNamesArea: React.FC<Props> = (props) => {
  const {
    slug
  } = props;

  const [dlOpen, setDlOpen] = React.useState(false);

  const isSelected = (x: string) => slug ? slug === x : false;

  return(
    <div className='relative'>
      <div className='hidden md:flex flex-wrap flex-row justify-center'>
        {newStreamerList.map(x => (
          <div
            key={`membernames-area-${x.slug}`}
            className={`mx-2 my-1 py-2 px-4 rounded-full bg-blue-200`}
          >
            {isSelected(x.slug) ?
              <p className='text-blue-600'>
                {x.name}
              </p>
            :
              <Link legacyBehavior href={'/search/[slug]'} as={`/search/${x.slug}`} draggable={false}>
                <a className='text-black'>
                  {x.name}
                </a>
              </Link>
            }
          </div>
        ))}
      </div>
      <div className='block md:hidden w-full'>
        <button
          className='focus:outline-none bg-blue-200 py-2 px-4 text-xl rounded-lg w-full'
          onClick={() => setDlOpen(true)}
        >
          {slug ? newStreamerList.find(x => x.slug === slug)?.name : '表示するメンバーを選択'}
        </button>
        {dlOpen &&
          <React.Fragment>
            <ul className='absolute w-full z-50 border bg-white px-4 h-48 overflow-y-auto' onClick={() => setDlOpen(false)}>
              {newStreamerList.map((x) => (
                <li
                  key={`membernames-area-md-${x.slug}`}
                  className={'relative bg-blue-200 rounded-full mx-2 my-2 px-4 py-2'}
                >
                  <p className={isSelected(x.slug) ? 'text-blue-600' : 'text-black'}>
                    {x.name}
                  </p>
                  {!isSelected(x.slug) && 
                    <Link legacyBehavior href={'/search/[slug]'} as={`/search/${x.slug}`} draggable={false} >
                      <a className='absolute w-full h-full inset-0'>
                      </a>
                    </Link>
                  }
                </li>
              ))}
            </ul>
            <div className='fixed z-40 inset-0 bg-black opacity-25' onClick={() => setDlOpen(false)}>
            </div>
          </React.Fragment>
        }
      </div>
    </div>
  )
}

export default MemberNamesArea;