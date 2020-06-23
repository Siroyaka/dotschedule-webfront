import React from 'react';
import clsx from 'clsx';

interface OwnProps {
  avaterSrc?: string,
  name: string,
  startTime?: string,
  duration?: string,
}

type Props = OwnProps;

const Header: React.FC<Props> = (props) => {
  const { avaterSrc, name, startTime, duration } = props;

  return (
    <section className={clsx("flex", "flex-row", 'mx-2', 'my-1')}>
      <img className={clsx('rounded-full', 'h-12', 'w-12', 'px-1', 'py-1')} src={avaterSrc}/>
      <article className={clsx('ml-4', 'w-full')}>
        <h1 className={clsx('text-base')}>{name}</h1>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'text-gray-700', 'text-sm')}>
          <span>{startTime}</span>
          <span>{duration}</span>
        </div>
      </article>
    </section>
  );
}
export default Header;