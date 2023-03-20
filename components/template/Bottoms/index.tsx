import React from 'react';

interface OwnProps {
  children?: React.ReactNode,
}

type Props = OwnProps;

const BottomNav: React.FC<Props> = (props) => {
  const { children } = props;
  return(
    <section id='bottom-navigation' className=''>
      {children}
    </section>
  )
}

export default BottomNav;