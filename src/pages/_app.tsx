import React from 'react';
import clsx from 'clsx';

import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/tailwind.css';

import Router from 'next/router';

import Header from 'component/standalone/Header';
import BottomNavContainer from 'container/BottomNavContainer';
import Drawer from 'component/template/Drawer';
import DrawerItems from 'component/standalone/DrawerItems';
import InitialMetaData from 'modules/InitialMetaData';
import { pageview } from 'modules/gtag';

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    }
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [])
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Head>
        <meta name="description" content={InitialMetaData.ogDescription}/>
        <meta name="twitter:card" content={InitialMetaData.twCardType} />
        <meta name="twitter:site" content={InitialMetaData.twSite}/>
        <meta property="og:url" content={InitialMetaData.ogUrl}/>
        <meta property="og:title" content={InitialMetaData.ogTitle}/>
        <meta property="og:description" content={InitialMetaData.ogDescription}/>
        <meta property="og:image" content={InitialMetaData.ogImage} />
      </Head>
      <Header title=".Schedule" onMenuClick={() => setDrawerOpen(true)}/>
      <div className={clsx('py-12', 'h-screen')}>
        <Component {...pageProps} />
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerItems closeDrawer={() => setDrawerOpen(false)} />
      </Drawer>
      <BottomNavContainer />
    </React.Fragment>
  );
};

export default App;