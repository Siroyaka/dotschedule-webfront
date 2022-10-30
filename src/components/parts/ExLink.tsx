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
      <Link legacyBehavior href={href} as={as}>
        {children}
      </Link>
    )
  }
  return(
    <Link legacyBehavior href={href} as={as} prefetch={false}>
      {children}
    </Link>
  )
}
export default ExLink;