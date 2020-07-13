import React from 'react';

const IosMeta = () => {
  return(
    <React.Fragment>
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={'どっとスケジュール'} />
      <link rel="apple-touch-icon" href="/asset/dotschedule_icon_ios.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/asset/dotschedule_icon_ios_76.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/asset/dotschedule_icon_ios_120.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/asset/dotschedule_icon_ios_152.png" />
      <link rel='apple-touch-icon' sizes='180x180' href='/asset/dotschedule_icon_ios_180.png' />
      <link rel="apple-touch-startup-image" href="/asset/dotschedule_icon_ios_startup.png" />
    </React.Fragment>
  )
}

export default IosMeta;