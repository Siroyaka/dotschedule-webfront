import React from 'react';
import Image from 'next/image'

interface OwnProps {
    charactorIconSources: string[],
    children?: React.ReactNode,
}

type Props = OwnProps;

const Charactors: React.FC<Props> = (props) => {
  const { charactorIconSources } = props;
  return(
    <ul className='py-2 w-full flex flex-wrap items-start'>
      {charactorIconSources.map((iconSource, i) => 
        <li key={`charactor-icon-${i}`} className='flex-shrink-0' style={{width: '10%'}}>
          <Image
            className='rounded-full w-full px-1 py-1'
            height={50}
            width={50}
            alt={`charactor-${i}`}
            src={iconSource}
            />
        </li>

      )}
    </ul>
  )
}

export default Charactors;
