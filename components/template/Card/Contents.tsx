import React from 'react';

interface OwnProps {
  children?: React.ReactNode
}

type Props = OwnProps;

const Contents: React.FC<Props> = (props) => {
  const { children } = props;
  return(
    <div className='my-2 px-2 pt-1'>
      {children}
    </div>
  )
}

export default Contents;