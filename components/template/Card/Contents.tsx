import React from 'react';

interface OwnProps {
  children?: React.ReactNode
  title?: string
  startTime?: string,
  duration?: string,
}

type Props = OwnProps;

const Contents: React.FC<Props> = (props) => {
  const { children, title, startTime, duration } = props;
  return(
    <div className='my-2 px-2 pt-1'>
      <div>
        {title}
      </div>
      <div className='text-sm pt-3 flex justify-start text-gray-600 absolute bottom-1 right-2'>
        {startTime}
        <span className='ml-2'>{duration}</span>
      </div>
    </div>
  )
}

export default Contents;