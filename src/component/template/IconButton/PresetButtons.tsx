import React from 'react';
import { MenuSvg } from 'component/parts/svgIcons';

import Vanila, { Props as VanilaProps } from './Vanila';

type Props = Omit<VanilaProps, 'icon'>;

export const Menu: React.FC<Props> = (props) => {
  return(
    <Vanila icon={<MenuSvg />} {...props} />
  )
}
