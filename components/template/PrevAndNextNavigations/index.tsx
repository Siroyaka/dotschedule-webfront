import React from 'react';

import {
  NavigationBeforeSvg,
  NavigationNextSvg,
} from 'components/parts/svgIcons';

import Navigation from "./Navigation";

interface OwnProps {
  prevNavigation: Omit<React.ComponentProps<typeof Navigation>, "children">,
  nextNavigation: Omit<React.ComponentProps<typeof Navigation>, "children">,
  iconClassName?: string,
  children?: React.ReactNode
}

type Props = OwnProps;

const PrevAndNextArrow: React.FC<Props> = (props) => {
  const {
    children,
    prevNavigation,
    nextNavigation,
    iconClassName,
  } = props;

  return (
    <React.Fragment>
      <Navigation {...prevNavigation}>
        <NavigationBeforeSvg className={iconClassName}/>
      </Navigation>
      {children}
      <Navigation {...nextNavigation}>
        <NavigationNextSvg className={iconClassName}/>
      </Navigation>
    </React.Fragment>
  );
};

export default PrevAndNextArrow;