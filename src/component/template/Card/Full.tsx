import React from 'react';
import clsx from 'clsx';

import { Card, CardHeader, CardMedia, CardContents } from './index';
import { RoundIconSvg } from 'component/parts/svgIcons';

interface OwnProps {
  headerAvater: string,
  name: string,
  start: string,
  durationValue: string,
  mediaSrc: string,
  mediahref: string,
  onLive?: boolean,
}

type Props = OwnProps;

const Full: React.FC<Props> = (props) => {
  const {
    headerAvater,
    name,
    start,
    durationValue,
    mediaSrc,
    mediahref,
    children,
    onLive
  } = props;
  return (
    <Card>
      {onLive ? (
        <div className={clsx('absolute', 'top-0', 'right-0 text-red-800')}>
          <RoundIconSvg />
        </div>
      ): (
        null
      )}
      <CardHeader
        avaterSrc={headerAvater}
        name={name}
        startTime={start}
        duration={durationValue}
      />
      <CardMedia
        src={mediaSrc}
        href={mediahref}
      />
      <CardContents>
        {children}
      </CardContents>
    </Card>
  );
}

export default Full;