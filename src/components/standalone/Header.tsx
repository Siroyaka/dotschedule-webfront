import React from 'react';
import clsx from 'clsx';

import { useRouter } from 'next/router';

import { MenuButton } from 'components/template/IconButton';
import { ReloadIconSvg } from 'components/parts/svgIcons';

interface OwnProps {
  title: string,
  onMenuClick?: () => void,
}

type Props = OwnProps;

const Header: React.FC<Props> = (props) => {
  const { title, onMenuClick } = props;
  const router = useRouter();
  const reload = React.useCallback(() => {
    router.reload();
  }, [router])

  return(
    <header className={clsx('w-screen', 'flex', 'fixed', 'top-0', 'h-12', 'bg-orange-300', 'border', 'border-orange-300', 'px-4', 'py-1', 'flex', 'flex-row', 'items-center', 'z-50', 'justify-between')}>
      <div className={'flex flex-row items-center'}>
        <MenuButton classes={{button: 'bg-orange-300 hover:bg-orange-200 active:bg-orange-100'}} onClick={onMenuClick} />
        <h6 className={'font-sans font-semibold text-xl text-orange-600'}>{title}</h6>
      </div>
      <button className={'px-2 py-2 focus:outline-none hover:bg-orange-200 active:bg-orange-100 rounded-full'} style={{ transition: "all .15s ease" }} aria-label='reload-button' onClick={reload}><ReloadIconSvg /></button>
    </header>
  )
}

export default Header;