import React from 'react';

import logger from 'library/logger'

interface LayoutProps {
    children: React.ReactNode
    modal: React.ReactNode
}

const Layout = ({ children, modal }: LayoutProps) => {
    logger.debug("loading monthlist root layout");
    return (
        <div className='relative h-full'>
            {children}
            {modal}
        </div>
    );
}

export default Layout;