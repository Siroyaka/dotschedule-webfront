import React from 'react';
import clsx from 'clsx';

import { NoImageAvater } from 'components/parts/noimage';

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
      {avaterSrc.length > 0 ? 
        <img className={clsx('rounded-full', 'h-12', 'w-12', 'px-1', 'py-1', 'flex-shrink-0')} alt={`${name}-avater`} src={avaterSrc}/>
      : 
        <NoImageAvater />
      }
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