import React from 'react';
import clsx from 'clsx';

interface OwnProps {
  icon: JSX.Element,
  subText?: string,
  onClick?: () => void,
  classes?: {button?: string, icon?: string, text?: string},
  ariaLabel?: string,
}

export type Props = OwnProps;

const VanilaButton: React.FC<Props> = (props) => {
  const { icon, subText, onClick, classes, ariaLabel } = props;
  return(
    <button className={clsx('py-2 px-2 focus:outline-none transition duration-200 rounded-full', classes?.button)} onClick={onClick} aria-label={ariaLabel} style={{transition: 'all .15s ease'}}>
      {icon}
      <span className={clsx(classes?.text)}>{subText}</span>
    </button>
  )
}
export default VanilaButton;