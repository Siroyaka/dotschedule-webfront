import React from 'react';
import clsx from 'clsx';

interface OwnProps {
  className?: string,
}

type Props = OwnProps;

const OutLine: React.FC<Props> = (props) => {
  const { children, className } = props;

  return(
    <div className={clsx('w-full relative max-w-md border rounded overflow-hidden shadow-lg', className)}>
      {children}
    </div>
  )
}

export default OutLine;