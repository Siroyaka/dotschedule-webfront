import React from 'react';
import clsx from 'clsx';

import { CloseSvg } from 'src/components/parts/svgIcons';

interface OwnProps {
  open: boolean,
  className?: string,
  onClose?: () => void,
  children?: React.ReactNode
}

type Props = OwnProps;

const Drawer: React.FC<Props> = (props) => {
  const { className, children, open, onClose } = props;

  return(
    <React.Fragment>
      {
        open &&
        <div id='drawer-out-field' onClick={onClose} className='h-full absolute z-50 top-0 bg-gray-300 bg-opacity-25 w-full' />
      }
      <aside className={clsx(className, 'bg-white transform duration-300 ease-in-out h-full fixed z-50 top-0 left-0 transition-all flex flex-col w-64 border-r border-gray-200 px-2', `${open ? 'translate-x-0' : '-translate-x-full'}`)}>
        <div id='drawerHeader' className='h-12 bg-white border-b w-full flex flex-row items-center py-1'>
          <button aria-label='close-left-drawer' className='py-2 px-2 focus:outline-none transition duration-200 rounded-full hover:bg-blue-100 active:bg-blue-200' style={{transition: 'all .15 ease'}} onClick={onClose}>
            <CloseSvg />
          </button>
        </div>
        {children}
      </aside>
    </React.Fragment>
  )
}

export default Drawer;