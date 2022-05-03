import React from 'react';

import { CardOutLine, CardMedia, CardContents } from './index';

interface OwnProps {
  mediaSrc: string,
  mediahref: string,
  children?: React.ReactNode
}

type Props = OwnProps;

const News: React.FC<Props> = (props) => {
  const {
    mediaSrc,
    mediahref,
    children,
  } = props;
  return (
    <CardOutLine>
      <CardMedia
        src={mediaSrc}
        href={mediahref}
      />
      <CardContents>
        {children}
      </CardContents>
    </CardOutLine>
  );
}

export default News;