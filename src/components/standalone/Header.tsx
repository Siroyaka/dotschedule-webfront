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
    <header className='w-screen flex fixed top-0 h-12 bg-white border-b px-4 py-1 flex flex-row items-center z-50 justify-between'>
      <div className={'flex flex-row items-center'}>
        <MenuButton classes={{button: 'hover:bg-blue-100 active:bg-blue-200'}} onClick={onMenuClick} />
        <h6 className='font-sans text-2xl text-black ml-2'>{title}</h6>
      </div>
      <button className={'px-2 py-2 focus:outline-none hover:bg-blue-100 active:bg-blue-200 rounded-full'} style={{ transition: "all .15s ease" }} aria-label='reload-button' onClick={reload}><ReloadIconSvg /></button>
    </header>
  )
}

export default Header;