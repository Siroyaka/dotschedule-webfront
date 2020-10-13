import React from 'react';

import MemberNamesArea from 'component/standalone/MemberNamesArea';

interface OwnProps {

}

type Props = OwnProps;

const NewItemsPage: React.FC<Props> = (props) => {
  return(
    <article className='px-4'>
      <MemberNamesArea />
    </article>
  )
}

export default NewItemsPage;