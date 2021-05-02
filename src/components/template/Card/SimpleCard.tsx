import React from 'react';

interface OwnProps {
  title: string,
}

type Props = OwnProps;

const SimpleCard: React.FC<Props> = (props) => {
  const { title, children } = props;
  return (
    <div
      className='max-w-sm rounded overflow-hidden shadow-lg'
    >
      <div className='px-6 py-4'>
        <div>{title}</div>
        <p className='text-gray-700 text-base'>{children}</p>
      </div>
    </div>
  );
}

export default SimpleCard;