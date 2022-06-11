import React from 'react';

import { CardOutLine, CardMedia, CardContents, CharactorIcons, CardSimpleHeader } from './index';

interface OwnProps {
  mediaSrc: string,
  mediahref: string,
  charactorIconSources: string[],
  title: string,
  duration: string,
  children?: React.ReactNode
}

type Props = OwnProps;

const News: React.FC<Props> = (props) => {
  const {
    mediaSrc,
    mediahref,
    children,
    charactorIconSources,
    duration,
    title,
  } = props;
  return (
    <CardOutLine>
      <CardSimpleHeader title={title} duration={duration} />
      <CardMedia
        src={mediaSrc}
        href={mediahref}
      />
      <CharactorIcons
        charactorIconSources={charactorIconSources}
      />
      <CardContents>
        {children}
      </CardContents>
    </CardOutLine>
  );
}

export default News;