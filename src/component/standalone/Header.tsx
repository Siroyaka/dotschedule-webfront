import React from 'react';
import clsx from 'clsx';

import { MenuButton } from 'component/template/IconButton';

interface OwnProps {
  title: string,
  onMenuClick?: () => void,
}

type Props = OwnProps;

const Header: React.FC<Props> = (props) => {
  const { title, onMenuClick } = props;

  return(
    <header className={clsx('w-screen', 'flex', 'fixed', 'top-0', 'h-12', 'bg-orange-300', 'border', 'border-orange-300', 'px-4', 'py-1', 'flex', 'flex-row', 'items-center', 'z-50')}>
      <MenuButton classes={{button: 'bg-orange-300 hover:bg-orange-200'}} onClick={onMenuClick} />
      <h6 className={'font-sans font-semibold text-xl text-orange-600 mx-1 '}>{title}</h6>
    </header>
  )
}

export default Header;