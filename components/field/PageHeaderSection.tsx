'use client';
import React from 'react';

import Header from 'components/standalone/Header';
import Drawer from 'components/template/Drawer';
import DrawerItems from 'components/standalone/DrawerItems';

const PageHeaderSection = ({title}: {title: string}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <React.Fragment>
        <Header title={title} onMenuClick={() => setDrawerOpen(true)}/>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <DrawerItems closeDrawer={() => setDrawerOpen(false)} />
        </Drawer>
    </React.Fragment>
  );
}

export default PageHeaderSection;