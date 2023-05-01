import React from 'react';

export const NoImageAvater = (props: {size?: 'minimum' | 'small' | 'middle'}) => {
  const { size } = props;
  let textSize = 'text-2xl';
  let avaterSize = 'h-10 w-10';
  switch (size ?? 'middle') {
    case 'small': {
      textSize = 'text-lg';
      avaterSize = 'h-8 w-8';
      break;
    }
    case 'minimum': {
      textSize = 'text-sm';
      avaterSize = 'h-5 w-5';
      break;
    }
  }
  return(
    <div className={`rounded-full bg-gray-200 flex-shrink-0 text-center flex justify-center items-center ${avaterSize}` }>
      <span className={textSize}>他</span>
    </div>
  )
}