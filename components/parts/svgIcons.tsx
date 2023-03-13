import React from 'react';

interface OwnProps {
  size?: number,
  children?: React.ReactNode
}

type Props = OwnProps;

export const OutModule: React.FC<Props> = (props) => {
  const { children, size } = props;
  const s = size ?? 24;
  return(
    <svg xmlns="http://www.w3.org/2000/svg" height={s} viewBox={`0 0 24 24`} width={s} style={{fill:'currentcolor'}}>
      {children}
    </svg>
  )
}

export const CloseSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </OutModule>
  );
}

export const MenuSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </OutModule>
  );
}

export const TodaySvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </OutModule>
  );
}

export const CalendarSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </OutModule>
  );
}

export const ListSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
    </OutModule>
  );
}

export const LeftArrowSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
    </OutModule>
  );
}

export const RightArrowSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" />
    </OutModule>
  );
}

export const AccordionArrowSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M24 24H0V0h24v24z" fill="none" />
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>
    </OutModule>
  );
}

export const NavigationBeforeSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h6v6H0z" fill="none"/>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </OutModule>
  );
}

export const NavigationNextSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h6v6H0z" fill="none"/>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </OutModule>
  );
}

export const RoundIconSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M24 24H0V0h24v24z" fill="none" />
      <circle cx="12" cy="12" r="8" />
    </OutModule>
  );
}

export const NoticeIconSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </OutModule>
  );
}

export const SearchIconSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </OutModule>
  );
}

export const MessageIconSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </OutModule>
  );
}

export const CommunityIconSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"/>
    </OutModule>
  );
}

export const ReloadIconSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </OutModule>
  );
}

export const NewsIconSvg: React.FC<Props> = (props) => {
  return (
    <OutModule {...props}>
      <g>
        <rect fill="none" height="24" width="24" x="0" />
      </g>
      <g>
        <g>
          <g>
            <path d="M20,4H4C2.89,4,2.01,4.89,2.01,6L2,18c0,1.11,0.89,2,2,2h16c1.11,0,2-0.89,2-2V6C22,4.89,21.11,4,20,4z M8.5,15H7.3 l-2.55-3.5V15H3.5V9h1.25l2.5,3.5V9H8.5V15z M13.5,10.26H11v1.12h2.5v1.26H11v1.11h2.5V15h-4V9h4V10.26z M20.5,14 c0,0.55-0.45,1-1,1h-4c-0.55,0-1-0.45-1-1V9h1.25v4.51h1.13V9.99h1.25v3.51h1.12V9h1.25V14z" />
          </g>
        </g>
      </g>
    </OutModule>
  );
}