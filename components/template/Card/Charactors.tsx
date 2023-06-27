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
    <ul className='px-2 py-2 w-full flex flex-wrap gap-1.5 items-start'>
      {charactorIconSources.map((iconSource, i) => 
        <li key={`charactor-icon-${i}`} className='flex-shrink-0' >
          <Image
            className='rounded-full h-8 w-8'
            height={30}
            width={30}
            alt={`charactor-${i}`}
            src={iconSource}
            />
        </li>

      )}
    </ul>
  )
}

export default Charactors;
