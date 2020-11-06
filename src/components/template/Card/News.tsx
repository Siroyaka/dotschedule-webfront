import React from 'react';

import { Card, CardMedia, CardContents } from './index';

interface OwnProps {
  mediaSrc: string,
  mediahref: string,
}

type Props = OwnProps;

const News: React.FC<Props> = (props) => {
  const {
    mediaSrc,
    mediahref,
    children,
  } = props;
  return (
    <Card>
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

export default News;