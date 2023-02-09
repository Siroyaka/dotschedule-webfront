import React from 'react';

const MetaData = {
  capable: 'yes',
  statusBarStyle: 'default',
  title: 'どっとスケジュール',
  iconLinkSizeDefault: '/asset/images/dotschedule_icon_ios.png',
  iconLinkSize76: '/asset/images/dotschedule_icon_ios_76.png',
  iconLinkSize120: '/asset/images/dotschedule_icon_ios_120.png',
  iconLinkSize152: '/asset/images/dotschedule_icon_ios_152.png',
  iconLinkSize180: '/asset/images/dotschedule_icon_ios_180.png',
  startupImage: '/asset/images/dotschedule_icon_ios_startup.png'
}

const IosMeta = () => {
  return(
    <React.Fragment>
      <meta name='apple-mobile-web-app-capable' content={MetaData.capable} />
      <meta name='apple-mobile-web-app-status-bar-style' content={MetaData.statusBarStyle} />
      <meta name='apple-mobile-web-app-title' content={MetaData.title} />
      <link rel="apple-touch-icon" href={MetaData.iconLinkSizeDefault} />
      <link rel="apple-touch-icon" sizes="76x76" href={MetaData.iconLinkSize76} />
      <link rel="apple-touch-icon" sizes="120x120" href={MetaData.iconLinkSize120} />
      <link rel="apple-touch-icon" sizes="152x152" href={MetaData.iconLinkSize152} />
      <link rel='apple-touch-icon' sizes='180x180' href={MetaData.iconLinkSize180} />
      <link rel="apple-touch-startup-image" href={MetaData.startupImage} />
    </React.Fragment>
  )
}

export default IosMeta;