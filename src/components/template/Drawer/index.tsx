import React from 'react';
import clsx from 'clsx';

import { CloseSvg } from 'components/parts/svgIcons';

interface OwnProps {
  open: boolean,
  className?: string,
  onClose?: () => void,
}

type Props = OwnProps;

const Drawer: React.FC<Props> = (props) => {
  const { className, children, open, onClose } = props;

  return(
    <React.Fragment>
      {
        open &&
        <div id='drawer-out-field' onClick={onClose} className={clsx('h-full', 'absolute', 'z-50', 'top-0', 'bg-gray-700', 'bg-opacity-25', 'w-full')} />
      }
      <aside className={clsx(className, 'transform', 'duration-300', 'ease-in-out', 'bg-red-300', 'h-full', 'fixed', 'z-50', 'top-0', 'left-0', 'transition-all', 'flex', 'flex-col', 'w-64', `${open ? 'translate-x-0' : '-translate-x-full'}`)}>
        <div id='drawerHeader' className={clsx('h-12', 'bg-yellow-300', 'w-full', 'flex', 'flex-row', 'items-center', 'py-1', 'px-4')}>
          <button aria-label='close-left-drawer' className={clsx('py-2 px-2 focus:outline-none transition duration-200 rounded-full', 'hover:bg-yellow-200', 'active:bg-yellow-100')} style={{transition: 'all .15 ease'}} onClick={onClose}>
            <CloseSvg />
          </button>
        </div>
        {children}
      </aside>
    </React.Fragment>
  )
}

export default Drawer;