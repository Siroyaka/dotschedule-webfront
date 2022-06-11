import React from 'react';

interface OwnProps {
  title: string,
  duration?: string,
}

type Props = OwnProps;

const SimpleHeader: React.FC<Props> = (props) => {
  const { title, duration } = props;

  return (
    <section className='flex flex-row mx-2 my-1'>
      <article className='ml-4 w-full'>
        <h1 className='text-base'>{title}</h1>
        <div className='flex flex-row justify-between text-gray-700 text-sm'>
          <span>{duration}</span>
        </div>
      </article>
    </section>
  );
}
export default SimpleHeader;