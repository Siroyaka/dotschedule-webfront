import React from 'react';

import { CardOutLine, CardHeader, CardMedia, CardContents, CharactorIcons } from './index';
import { RoundIconSvg } from 'components/parts/svgIcons';

interface OwnProps {
  headerAvater: string,
  name: string,
  start: string,
  durationValue: string,
  mediaSrc: string,
  mediahref: string,
  onLive?: boolean,
  children?: React.ReactNode,
  charactorIconSources: string[],
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
    onLive,
    charactorIconSources,
  } = props;
  return (
    <CardOutLine className='animate-fade-in'>
      {onLive ? (
        <div className='absolute top-0 right-0' style={{color:'red'}}>
          <RoundIconSvg className='w-6'/>
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
      <CharactorIcons
        charactorIconSources={charactorIconSources}
      />
    </CardOutLine>
  );
}

export default Full;