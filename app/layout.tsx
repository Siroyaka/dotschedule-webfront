import React from 'react';

import { twMetaData, ogpMetaData, iosMetaData, basicMetaData } from 'library/InitialMetaData';

import 'styles/tailwind.css';

import BottomNavContainer from 'components/container/BottomNavContainer';
import PageHeaderSection from 'components/field/PageHeaderSection';

interface LayoutProps {
    children: React.ReactNode
}

export const metadata = {
  title: ogpMetaData.title,
  themeColor: basicMetaData.themeColor,
  viewport: basicMetaData.viewPort,
  icons: {
    icon: basicMetaData.icon,
    apple: [iosMetaData.iconLinkSizeDefault, iosMetaData.iconLinkSize76, iosMetaData.iconLinkSize120, iosMetaData.iconLinkSize152, iosMetaData.iconLinkSize180]
  },
  description: ogpMetaData.description,
  openGraph: {
    title: ogpMetaData.title,
    description: ogpMetaData.description,
    url: ogpMetaData.url,
    images: [ogpMetaData.image]
  },
  twitter: {
    card: twMetaData.cardType,
    site: twMetaData.site
  },
  appleWebApp: {
    capable: iosMetaData.capable,
    statusBarStyle: iosMetaData.statusBarStyle,
    title: iosMetaData.title,
  }
}

const Layout = ({children}: LayoutProps) => {
  return (
    <html lang="ja">
      <head />
      <body>
        <PageHeaderSection title=".Schedule" />
        <main className='py-12 h-full'>
          {children}
        </main>
        <footer>
          <BottomNavContainer />
        </footer>
      </body>
    </html>
  );
}

export default Layout;