import React from 'react';
import clsx from 'clsx';

interface OwnProps {

}

type Props = OwnProps;

const Contents: React.FC<Props> = (props) => {
  const { children } = props;
  return(
    <div className={clsx('px-3', 'pt-4', 'pb-6')}>
      {children}
    </div>
  )
}

export default Contents;