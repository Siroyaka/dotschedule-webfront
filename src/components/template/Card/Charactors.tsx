import React from 'react';

interface OwnProps {
    charactorIconSources: string[],
    children?: React.ReactNode,
}

type Props = OwnProps;

const Charactors: React.FC<Props> = (props) => {
  const { charactorIconSources } = props;
  return(
    <ul className='w-full flex flex-wrap items-start'>
      {charactorIconSources.map((iconSource, i) => 
        <li key={`charactor-icon-${i}`} className='flex-shrink-0' style={{width: '10%'}}>
          <img className='rounded-full h-full px-1 py-1' alt={`charactor-${i}`} src={iconSource}/>
        </li>

      )}
    </ul>
  )
}

export default Charactors;
