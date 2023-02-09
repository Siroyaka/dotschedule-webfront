import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/tailwind.css';

import Header from 'src/components/standalone/Header';
import BottomNavContainer from 'src/container/BottomNavContainer';
import Drawer from 'src/components/template/Drawer';
import DrawerItems from 'src/components/standalone/DrawerItems';
import InitialMetaData from 'src/lib/InitialMetaData';

const App = ({ Component, pageProps }: AppProps) => {
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
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Header title=".Schedule" onMenuClick={() => setDrawerOpen(true)}/>
      <div className='py-12 h-full'>
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