import React from 'react';
import { MenuSvg } from 'components/parts/svgIcons';

import Vanila, { Props as VanilaProps } from './Vanila';

type Props = Omit<VanilaProps, 'icon'>;

export const Menu: React.FC<Props> = (props) => {
  return(
    <Vanila ariaLabel='menu-button' icon={<MenuSvg className='w-6'/>} {...props} />
  )
}
