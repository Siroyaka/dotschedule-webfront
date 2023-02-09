import React from 'react';

import { useRouter } from 'next/router';

import { MenuButton } from 'src/components/template/IconButton';
import { ReloadIconSvg } from 'src/components/parts/svgIcons';

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

  return (
    <header className="w-screen flex fixed top-0 h-12 bg-white border-b px-2 py-1 flex flex-row items-center z-50 justify-between">
      <div className={"flex flex-row items-center"}>
        <MenuButton
          classes={{ button: "hover:bg-blue-100 active:bg-blue-200" }}
          onClick={onMenuClick}
        />
      </div>
      <div>
        <h6 className="font-sans text-2xl text-black">{title}</h6>
      </div>
      <div>
        <button
          className="px-2 py-2 focus:outline-none hover:bg-blue-100 active:bg-blue-200 rounded-full"
          style={{ transition: "all .15s ease" }}
          aria-label="reload-button"
          onClick={reload}
        >
          <ReloadIconSvg />
        </button>
      </div>
    </header>
  );
}

export default Header;