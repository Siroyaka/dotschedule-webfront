'use client';
import React from 'react';

import HeaderItems from 'components/standalone/HeaderItems';
import Drawer from 'components/template/Drawer';
import DrawerItems from 'components/standalone/DrawerItems';

const PageHeaderSection = ({title}: {title: string}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <React.Fragment>
        <header className='w-screen fixed top-0 h-12 bg-white border-b z-10'>
          <HeaderItems title={title} onMenuClick={() => setDrawerOpen(true)}/>
        </header>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <DrawerItems closeDrawer={() => setDrawerOpen(false)} />
        </Drawer>
    </React.Fragment>
  );
}

export default PageHeaderSection;