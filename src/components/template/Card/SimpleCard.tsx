import React from 'react';
import clsx from 'clsx';

interface OwnProps {
  title: string,
}

type Props = OwnProps;

const SimpleCard: React.FC<Props> = (props) => {
  const { title, children } = props;
  return (
    <div
      className={clsx("max-w-sm", "rounded", "overflow-hidden", "shadow-lg")}
    >
      <div className={clsx("px-6", "py-4")}>
        <div>{title}</div>
        <p className={clsx('text-gray-700', 'text-base')}>{children}</p>
      </div>
    </div>
  );
}

export default SimpleCard;