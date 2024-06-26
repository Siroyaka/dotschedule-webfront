import React from 'react';

import { twMetaData, ogpMetaData, iosMetaData, basicMetaData } from 'library/InitialMetaData';

import BottomNavContainer from 'components/container/BottomNavContainer';
import PageHeaderSection from 'components/field/PageHeaderSection';

import 'styles/tailwind.css';

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
    },
    googlebot: 'noindex',
    robots: 'noindex,nofollow',
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <html lang="ja">
            <head />
            <body>
                <PageHeaderSection title="" />
                {children}
                <footer className='fixed inset-x-5 bottom-2 z-10 bg-white h-12 rounded-full border shadow'>
                    <BottomNavContainer
                        linkClassName={{
                            base: 'rounded-full text-xs text-center py-1 tap-no-response focus:outline-none',
                            match: 'bg-blue-500',
                            unmatch: 'active:bg-blue-200'
                        }}
                        childClassName={{
                            base: 'text-xs flex flex-col items-center',
                            match: 'text-white',
                            unmatch: 'text-black'
                        }}
                    />
                </footer>
            </body>
        </html>
    );
}

export default Layout;