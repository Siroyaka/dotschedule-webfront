import React from 'react';
import clsx from 'clsx';

import { CloseSvg } from 'component/parts/svgIcons';

interface OwnProps {
  open: boolean,
  className?: string,
  onClose?: () => void,
}

type Props = OwnProps;

const Drawer: React.FC<Props> = (props) => {
  const { className, children, open, onClose } = props;
  const width = open ? 'w-64' : 'w-0';
  const closeField = open ? 'w-full' : 'w-0';
  if(!open) return null;

  return(
    <React.Fragment>
      <article id='drawer-out-field' onClick={onClose} className={clsx('h-full', 'absolute', 'z-50', 'top-0', 'bg-gray-700', 'bg-opacity-25', closeField)} />
      <article className={clsx(className, 'duration-500', 'ease-in-out', 'bg-red-300', 'h-full', 'absolute', 'z-50', 'top-0', 'transition', 'flex', 'flex-col', width)}>
        <article id='drawerHeader' className={clsx('h-12', 'bg-orange-300', 'w-full', 'flex', 'flex-row', 'items-center', 'py-1', 'px-4')}>
          <button aria-label='close-left-drawer' className={clsx('py-2 px-2 focus:outline-none transition duration-200 rounded-full', 'hover:bg-orange-200')} onClick={onClose}>
            <CloseSvg />
          </button>
        </article>
        {children}
      </article>
    </React.Fragment>
  )
}

export default Drawer;