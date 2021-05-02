import React from 'react';

interface OwnProps {
}

type Props = OwnProps;

const BottomNav: React.FC<Props> = (props) => {
  const { children } = props;
  return(
    <section id='bottom-navigation' className='block fixed inset-x-0 bottom-0 z-10 bg-white shadow h-12'>
      {children}
    </section>
  )
}

export default BottomNav;