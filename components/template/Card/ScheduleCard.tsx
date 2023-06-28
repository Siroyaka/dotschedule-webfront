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
  title?: string,
  charactorIconSources: string[],
}

type Props = OwnProps;

const ScheduleCard: React.FC<Props> = (props) => {
  const {
    headerAvater,
    name,
    start,
    durationValue,
    mediaSrc,
    mediahref,
    title,
    onLive,
    charactorIconSources,
  } = props;
  return (
    <CardOutLine className='animate-fade-in pb-6'>
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
      <CardContents
        title={title}
        startTime={start}
        duration={durationValue}
      />
      <CharactorIcons
        charactorIconSources={charactorIconSources}
      />
    </CardOutLine>
  );
}

export default ScheduleCard;