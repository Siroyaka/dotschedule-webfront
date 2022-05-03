import React from 'react';

interface OwnProps {
  children?: React.ReactNode
}

type Props = OwnProps;

const Contents: React.FC<Props> = (props) => {
  const { children } = props;
  return(
    <div className='px-3 pt-4 pb-6'>
      {children}
    </div>
  )
}

export default Contents;