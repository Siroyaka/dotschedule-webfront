import React, { ComponentProps } from 'react';

import Link from 'next/link';

interface OwnProps {
  linkPrefetch: boolean
}

type Props = OwnProps & ComponentProps<typeof Link>;

const ExLink: React.FC<Props> = (props) => {
  const {href, as, linkPrefetch, children} = props;
  if(linkPrefetch) {
    return(
      <Link legacyBehavior href={href} as={as} draggable={false}>
        {children}
      </Link>
    )
  }
  return(
    <Link legacyBehavior href={href} as={as} prefetch={false} draggable={false}>
      {children}
    </Link>
  )
}
export default ExLink;